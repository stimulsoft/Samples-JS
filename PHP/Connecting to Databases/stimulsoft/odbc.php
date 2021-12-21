<?php
class StiOdbcAdapter {
	public $version = '2022.1.2';
	public $checkVersion = true;
	
	private $info = null;
	private $link = null;
	
	private function getLastErrorResult($result) {
		$code = odbc_error($result);
		$message = odbc_errormsg($result);
		
		if ($code == 0) return StiResult::error($message);
		return StiResult::error("[$code] $message");
	}
	
	private function connect() {
		$this->link = odbc_connect($this->info->dsn, $this->info->userId, $this->info->password);
		
		if (!$this->link)
			return $this->getLastErrorResult(null);
			
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		odbc_close($this->link);
		$this->link = null;
	}
	
	public function parse($connectionString) {
		$connectionString = trim($connectionString);
		
		$info = new stdClass();
		$info->dsn = '';
		$info->userId = '';
		$info->password = '';
		
		$parameters = explode(';', $connectionString);
		foreach ($parameters as $parameter) {
			
			$pos = mb_strpos($parameter, '=');
			$name = mb_strtolower(trim(mb_substr($parameter, 0, $pos)));
			$value = trim(mb_substr($parameter, $pos + 1));
			
			switch ($name)
			{
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
					
				default:
					$info->dsn .= $parameter.';';
					break;
			}
		}
		
		if (mb_strlen($info->dsn) > 0 && mb_substr($info->dsn, mb_strlen($info->dsn) - 1) == ';')
			$info->dsn = mb_substr($info->dsn, 0, mb_strlen($info->dsn) - 1);
		
		$this->info = $info;
	}
	
	private function parseType($type) {
		$type = strtolower($type);
		switch ($type) {
			case 'short':
			case 'int':
			case 'int2':
			case 'int4':
			case 'int8':
			case 'int24':
			case 'integer':
			case 'long':
			case 'longlong':
			case 'smallint':
			case 'bigint':
			case 'tinyint':
			case 'byte':
			case 'counter':
			case 'year':
				return 'int';
				
			case 'bit':
				return 'boolean';
				
			case 'float':
			case 'float4':
			case 'float8':
			case 'double':
			case 'decimal':
			case 'newdecimal':
			case 'money':
			case 'numeric':
			case 'real':
			case 'smallmoney':
			case 'currency':
				return 'number';
			
			case 'string':
			case 'var_string':
			case 'char':
			case 'nchar':
			case 'ntext':
			case 'varchar':
			case 'nvarchar':
			case 'text':
			case 'uniqueidentifier':
			case 'xml':
				return 'string';
			
			case 'date':
			case 'datetime':
			case 'datetime2':
			case 'datetimeoffset':
			case 'smalldatetime':
				return 'datetime';
				
			case 'time':
			case 'timestamp':
				return 'time';
			
			case 'blob':
			case 'geometry':
			case 'binary':
			case 'image':
			case 'sql_variant':
			case 'varbinary':
			case 'longbinary':
			case 'cursor':
			case 'bytea':
				return 'array';
		}
		
		return 'string';
	}
	
	public function test() {
		$result = $this->connect();
		if ($result->success) $this->disconnect();
		return $result;
	}
	
	public function getValue($type, $value) {
		switch ($type) {
			case 'array':
				return base64_encode($value);
			
			case 'datetime':
				if (strlen($value) == 0) return null;
				return date("Y-m-d\TH:i:s.v", strtotime($value));
			
			case 'time':
				if (strlen($value) == 0) return null;
				return date("H:i:s.v", strtotime($value));
		}
		
		return $value;
	}
	
	public function execute($queryString) {
		$result = $this->connect();
		if ($result->success) {
			$query = odbc_exec($this->link, $queryString);
			if (!$query)
				return $this->getLastErrorResult();
			
			$result->types = array();
			$result->columns = array();
			$result->rows = array();
			
			$result->count = odbc_num_fields($query);
				
			for ($i = 1; $i <= $result->count; $i++) {
				$type = odbc_field_type($query, $i);
				$result->types[] = $this->parseType($type);
				$result->columns[] = odbc_field_name($query, $i);
			}
			
			while (odbc_fetch_row($query)) {
				$row = array();
				for ($i = 1; $i <= $result->count; $i++) {
					$type = $result->types[$i - 1];
					$value = odbc_result($query, $i);
					$row[] = $this->getValue($type, $value);
				}
				
				$result->rows[] = $row;
			}
			
			odbc_free_result($query);
			$this->disconnect();
		}
		
		return $result;
	}
}