<?php
class StiMySqlAdapter {
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
			$code = $this->link->errno;
			if ($this->link->error) $message = $this->link->error;
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
		
		$this->link = new mysqli($this->info->host, $this->info->userId, $this->info->password, $this->info->database, $this->info->port);
		
		if ($this->link->connect_error)
			return StiResult::error("[{$this->link->connect_errno}] {$this->link->connect_error}");
		
		if (!$this->link->set_charset($this->info->charset))
			return $this->getLastErrorResult();
			
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		if (!$this->info->isPdo) $this->link->close();
		$this->link = null;
	}
	
	public function parse($connectionString) {
		$connectionString = trim($connectionString);
		
		$info = new stdClass();
		$info->isPdo = mb_strpos($connectionString, 'mysql:') !== false;
		$info->dsn = '';
		$info->host = '';
		$info->port = 3306;
		$info->database = '';
		$info->userId = '';
		$info->password = '';
		$info->charset = 'utf8';
		
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
				case 'server':
				case 'host':
				case 'location':
					$info->host = $value;
					if ($info->isPdo) $info->dsn .= $parameter.';';
					break;
						
				case 'port':
					$info->port = $value;
					if ($info->isPdo) $info->dsn .= $parameter.';';
					break;
						
				case 'database':
				case 'data source':
				case 'dbname':
					$info->database = $value;
					if ($info->isPdo) $info->dsn .= $parameter.';';
					break;
						
				case 'uid':
				case 'user':
				case 'username':
				case 'userid':
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
			case 1:
				return 'tiny';
			
			case 2:
			case 3:
			case 8:
			case 9:
				return 'int';
			
			case 16:
				return 'bit';
			
			case 4:
			case 5:
			case 246:
				return 'decimal';
			
			case 7:
			case 10:
			case 11:
			case 12:
			case 13:
				return 'datetime';
			
			case 252:
			case 253:
				return 'string';
				
			case 254:
			case 255:
				return 'blob';
		}
		
		return 'string';
	}
	
	private function parseType($meta) {
		$type = 'string';
		$binary = false;
		$length = 0;
		
		if ($this->info->isPdo) {
			foreach ($meta['flags'] as $value) {
				if ($value == 'blob')
					$binary = true;
			}
			$type = $meta['native_type'];
			$length = $meta['len'];
		}
		else {
			if ($meta->flags & 128) $binary = true;
			$type = $this->getStringType($meta->type);
			$length = $meta->length;
		}
		
		$type = strtolower($type);
		switch ($type) {
			case 'short':
			case 'int':
			case 'int24':
			case 'long':
			case 'longlong':
			case 'bit':
				return 'int';
				
			case 'newdecimal':
			case 'float':
			case 'double':
				return 'number';
				
			case 'tiny':
				if ($length == 1) return 'boolean';
				return 'int';
			
			case 'string':
			case 'var_string':
				if ($binary) return 'array';
				return 'string';
			
			case 'date':
			case 'datetime':
			case 'timestamp':
			case 'time':
			case 'year':
				return 'datetime';
			
			case 'blob':
			case 'geometry':
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
			$query = $this->link->query($queryString);
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
				$result->count = $query->field_count;
				
				while ($meta = $query->fetch_field()) {
					$result->columns[] = $meta->name;
					$result->types[] = $this->parseType($meta);
				}
				
				if ($query->num_rows > 0) {
					$isColumnsEmpty = count($result->columns) == 0;
					while ($rowItem = $query->fetch_assoc()) {
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
			}
			
			$this->disconnect();
		}
		
		return $result;
	}
}