<?php
class StiOracleAdapter {
	private $info = null;
	private $link = null;
	
	private function getLastErrorResult() {
		$code = 0;
		$message = 'Unknown';
		
		if ($this->info->isPdo) {
			$info = $this->link->errorInfo();
			$code = $info[0];
			if (count($info) >= 3) $message = $info[2];
		}
		else {
			$error = oci_error();
			if ($error !== false) {
				$code = $error['code'];
				$error = $error['message'];
			}
			
			$code = ibase_errcode();
			$error = ibase_errmsg();
			if ($error) $message = $error;
		}
		
		if ($code == 0) return StiResult::error($message);
		return StiResult::error("[$code] $message");
	}
	
	private function connect() {
		if ($this->info->isPdo) {
			try {
				$this->link = new PDO($this->info->dsn, $this->info->userId, $this->info->password);
			}
			catch (PDOException $e) {
				$code = $e->getCode();
				$message = $e->getMessage();
				return StiResult::error("[$code] $message");
			}
			
			return StiResult::success();
		}
		
		if (!function_exists('oci_connect'))
			return StiResult::error('Oracle driver not found. Please configure your PHP server to work with Oracle.');
		
		if ($this->info->privilege == '') $this->link = oci_connect($this->info->userId, $this->info->password, $this->info->database, $this->info->charset);
		else $this->link = oci_pconnect($this->info->userId, $this->info->password, $this->info->database, $this->info->charset, $this->info->privilege);
		
		if (!$this->link)
			return $this->getLastErrorResult();
		
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		if (!$this->info->isPdo) oci_close($this->link);
		$this->link = null;
	}
	
	public function parse($connectionString) {
		$connectionString = trim($connectionString);
		
		$info = new stdClass();
		$info->isPdo = mb_strpos($connectionString, 'oci:') !== false;
		$info->dsn = '';
		$info->database = '';
		$info->userId = '';
		$info->password = '';
		$info->charset = 'AL32UTF8';
		$info->privilege = '';
		
		$parameters = explode(';', $connectionString);
		foreach ($parameters as $parameter) {
			if (mb_strpos($parameter, '=') < 1) {
				if ($info->isPdo) $info->dsn .= $parameter.';';
				continue;
			}
			
			$pos = mb_strpos($parameter, '=');
			$name = mb_strtolower(trim(mb_substr($parameter, 0, $pos)));
			$value = trim(mb_substr($parameter, $pos + 1));
			
			switch ($name)
			{
				case 'database':
				case 'data source':
				case 'dbname':
					$info->database = $value;
					if ($info->isPdo) $info->dsn .= $parameter.';';
					break;
				
				case 'uid':
				case 'user':
				case 'user id':
					$info->userId = $value;
					break;
					
				case 'pwd':
				case 'password':
					$info->password = $value;
					break;
					
				case 'charset':
					$info->charset = $value;
					if ($info->isPdo) $info->dsn .= $parameter.';';
					break;
					
				case 'dba privilege':
				case 'privilege':
					$value = strtolower($value);
					$info->privilege = OCI_DEFAULT;
					if ($value == 'sysoper' || $value == 'oci_sysoper') $info->privilege = OCI_SYSOPER;
					if ($value == 'sysdba' || $value == 'oci_sysdba') $info->privilege = OCI_SYSDBA;
					break;
				
				default:
					if ($info->isPdo && mb_strlen($parameter) > 0) $info->dsn .= $parameter.';';
					break;
			}
		}
		
		if (mb_strlen($info->dsn) > 0 && mb_substr($info->dsn, mb_strlen($info->dsn) - 1) == ';')
			$info->dsn = mb_substr($info->dsn, 0, mb_strlen($info->dsn) - 1);
		
		$this->info = $info;
	}
	
	public function test() {
		$result = $this->connect();
		if ($result->success) $this->disconnect();
		return $result;
	}
	
	private function detectType($value) {
		if (preg_match('~[^\x20-\x7E\t\r\n]~', $value) > 0)
			return 'array';
		
		if (is_numeric($value)) {
			if (strpos($value, '.') !== false) return 'number';
			return 'int';
		}
		
		if (DateTime::createFromFormat('Y-M-d', $value) !== false)
			return 'datetime';
		
		if (is_string($value))
			return 'string';
		
		return 'array';
	}
	
	private function parseType($type) {
		switch ($type) {
			case 'SMALLINT':
			case 'INTEGER':
			case 'BIGINT':
				return 'int';
			
			case 'NUMBER':
				return 'number';
			
			case 'DATE':
			case 'TIMESTAMP':
				return 'datetime';
			
			case 'CHAR':
			case 'VARCHAR2':
			case 'INTERVAL DAY TO SECOND':
			case 'INTERVAL YEAR TO MONTH':
			case 'ROWID':
				return 'string';
			
			case 'BFILE':
			case 'BLOB':
			case 'LONG':
			case 'CLOB':
			case 'RAW':
			case 100:
			case 101:
				return 'array';
		}
		
		return 'string';
	}
	
	public function execute($queryString) {
		$result = $this->connect();
		if ($result->success) {
			$query = $this->info->isPdo ? $this->link->query($queryString) : oci_parse($this->link, $queryString);
			if (!$query || !$this->info->isPdo && !oci_execute($query))
				return $this->getLastErrorResult();
			
			$result->types = array();
			$result->columns = array();
			$result->rows = array();
			
			if ($this->info->isPdo) {
				$result->count = $query->columnCount();
				
				// PDO Oracle driver does not support getColumnMeta()
				// The type is determined by the first value
				
				while ($rowItem = $query->fetch()) {
					$index = 0;
					$row = array();
					
					foreach ($rowItem as $key => $value) {
						if (is_string($key)) {
							$index++;
							if (count($result->columns) < $index) $result->columns[] = $key;
							if (count($result->types) < $index) $result->types[] = $this->detectType($value);
							$type = $result->types[$index - 1];
							
							if ($type == 'array') $row[] = base64_encode($value);
							else if ($type == 'datetime') $row[] = gmdate("Y-m-d\TH:i:s.v\Z", strtotime($value));
							else $row[] = $value;
						}
					}
					
					$result->rows[] = $row;
				}
			}
			else {
				$result->count = oci_num_fields($query);
				
				for ($i = 1; $i <= $result->count; $i++) {
					$name = oci_field_name($query, $i);
					$result->columns[] = $name;
					
					$type = oci_field_type($query, $i);
					$result->types[] = $this->parseType($type);
				}
				
				while ($rowItem = oci_fetch_assoc($query)) {
					$row = array();
					foreach ($rowItem as $key => $value) {
						if (count($result->columns) < count($rowItem)) $result->columns[] = $key;
						$type = $result->types[count($row)];
						
						if ($type == 'array') $row[] = base64_encode($value);
						else if ($type == 'datetime') $row[] = gmdate("Y-m-d\TH:i:s.v\Z", strtotime($value));
						else $row[] = $value;
					}
					$result->rows[] = $row;
				}
			}
			
			$this->disconnect();
		}
	
		return $result;
	}
}