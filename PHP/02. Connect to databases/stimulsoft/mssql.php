<?php
class StiMsSqlAdapter {
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
		else if ($this->info->isMicrosoft) {
			if (($errors = sqlsrv_errors()) != null) {
				$error = $errors[count($errors) - 1];
				$code = $error['code'];
				$message = $error['message'];
			}
		}
		else {
			$error = mssql_get_last_message();
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
		
		if ($this->info->isMicrosoft) {
			if (!function_exists('sqlsrv_connect'))
				return StiResult::error('MS SQL driver not found. Please configure your PHP server to work with MS SQL.');
				
			$this->link = sqlsrv_connect(
					$this->info->host, 
					array(
						'UID' => $this->info->userId,
						'PWD' => $this->info->password,
						'Database' => $this->info->database,
						'LoginTimeout' => 10,
						'ReturnDatesAsStrings' => true,
						'CharacterSet' => $this->info->charset
					));
			if (!$this->link)
				return $this->getLastErrorResult();
				
			return StiResult::success();
		}
		
		$this->link = mssql_connect($this->info->host, $this->info->userId, $this->info->password);
		if (!$this->link)
			return $this->getLastErrorResult();
		
		if (!mssql_select_db($this->info->database, $this->link))
			return $this->getLastErrorResult();
		
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		if (!$this->info->isPdo) $this->info->isMicrosoft ? sqlsrv_close($this->link) : mssql_close($this->link);
		$this->link = null;
	}
	
	public function parse($connectionString) {
		$connectionString = trim($connectionString);
		
		$info = new stdClass();
		$info->isMicrosoft = !function_exists('mssql_connect');
		$info->isPdo = mb_strpos($connectionString, 'sqlsrv:') !== false;
		$info->dsn = '';
		$info->host = '';
		$info->database = '';
		$info->userId = '';
		$info->password = '';
		$info->charset = 'UTF-8';
		
		$parameters = explode(';', $connectionString);
		foreach ($parameters as $parameter) {
			if (mb_strpos($parameter, '=') < 1) {
				if ($info->isPdo) $info->dsn .= $parameter.';';
				continue;
			}
		
			$pos = mb_strpos($parameter, '=');
			$name = mb_strtolower(trim(mb_substr($parameter, 0, $pos)));
			$value = trim(mb_substr($parameter, $pos + 1));
			
			switch ($name) {
				case 'server':
				case 'data source':
					$info->host = $value;
					if ($info->isPdo) $info->dsn .= $parameter.';';
					break;
						
				case 'database':
				case 'initial catalog':
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
					
				default:
					if ($info->isPdo && mb_strlen($parameter) > 0) $info->dsn .= $parameter.';';
					break;
			}
		}
		
		if (mb_strlen($info->dsn) > 0 && mb_substr($info->dsn, mb_strlen($info->dsn) - 1) == ';')
			$info->dsn = mb_substr($info->dsn, 0, mb_strlen($info->dsn) - 1);
		
		$this->info = $info;
	}
	
	private function getStringType($type) {
		switch ($type) {
			case -6:
			case -5:
			case 4:
			case 5:
				return 'int';
			
			case 2:
			case 3:
			case 6:
			case 7:
				return 'decimal';
				
			case -7:
				return 'bit';
			
			case -155:
			case -154:
			case 91:
			case 93:
				return 'datetime';
			
			case -152:
			case -11:
			case -10:
			case -9:
			case -8:
			case -2:
			case -1:
			case 1:
			case 12:
				return 'string';
			
			case -151:
				return 'geometry'; // 'udt'
			
			case -150:
			case -4:
			case -3:
			case -2:
				return 'binary';
		}
		
		return 'string';
	}
	
	private function parseType($meta) {
		$type = 'string';
		$length = 0;
		
		if ($this->info->isPdo) {
			$type = $meta['sqlsrv:decl_type'];
			$length = $meta['len'];
		}
		else {
			$type = $this->getStringType($meta['Type']);
			$length = $meta['Size'];
		}
		
		switch ($type) {
			case 'bigint':
			case 'int':
			case 'smallint':
			case 'tinyint':
				return 'int';
			
			case 'decimal':
			case 'float':
			case 'money':
			case 'numeric':
			case 'real':
			case 'smallmoney':
				return 'number';
			
			case 'bit':
				return 'boolean';
			
			case 'char':
			case 'nchar':
			case 'ntext':
			case 'nvarchar':
			case 'text':
			case 'timestamp':
			case 'uniqueidentifier':
			case 'varchar':
			case 'xml':
				return 'string';
			
			case 'date':
			case 'datetime':
			case 'datetime2':
			case 'datetimeoffset':
			case 'smalldatetime':
			case 'time':
				return 'datetime';
			
			case 'binary':
			case 'image':
			case 'sql_variant':
			case 'varbinary':
			case 'cursor':
				return 'array';
		}
		
		return 'string';
	}
	
	public function test() {
		$result = $this->connect();
		if ($result->success) $this->disconnect();
		return $result;
	}
	
	public function execute($queryString) {
		$result = $this->connect();
		if ($result->success) {
			$query = $this->info->isPdo 
				? $this->link->query($queryString) 
				: ($this->info->isMicrosoft 
					? sqlsrv_query($this->link, $queryString) 
					: mssql_query($queryString, $this->link)
				);
			
			if (!$query)
				return $this->getLastErrorResult();
			
			$result->types = array();
			$result->columns = array();
			$result->rows = array();
			
			if ($this->info->isPdo) {
				$result->count = $query->columnCount();
				
				for ($i = 0; $i < $result->count; $i++) {
					$meta = $query->getColumnMeta($i);
					$result->columns[] = $meta['name'];
					$result->types[] = $this->parseType($meta);
				}
				
				while ($rowItem = $query->fetch()) {
					$row = array();
					for ($i = 0; $i < $result->count; $i++) {
						$type = count($result->types) >= $i + 1 ? $result->types[$i] : 'string';
						
						if ($type == 'array') $row[] = base64_encode($rowItem[$i]);
						else if ($type == 'datetime') $row[] = gmdate("Y-m-d\TH:i:s.v\Z", strtotime($rowItem[$i]));
						else $row[] = $rowItem[$i];
					}
					$result->rows[] = $row;
				}
			}
			else {
				if ($this->info->isMicrosoft) {
					foreach (sqlsrv_field_metadata($query) as $meta) {
						$result->columns[] = $meta['Name'];
						$result->types[] = $this->parseType($meta);
					}
				}
				
				$isColumnsEmpty = count($result->columns) == 0;
				while ($rowItem = $this->info->isMicrosoft ? sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC) : mssql_fetch_assoc($query)) {
					$row = array();
					foreach ($rowItem as $key => $value) {
						if ($isColumnsEmpty && count($result->columns) < count($rowItem)) $result->columns[] = $key;
						$type = count($result->types) >= count($row) + 1 ? $result->types[count($row)] : 'string';
						
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