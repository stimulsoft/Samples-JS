<?php
# Stimulsoft.Reports.JS
# Version: 2022.2.1
# Build date: 2022.03.21
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php
class StiMySqlAdapter {
	public $version = '2022.2.1';
	public $checkVersion = true;
	
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
	
	private function getStringType($meta) {
		switch ($meta->type) {
			case MYSQLI_TYPE_TINY:   // Byte
				return 'tiny';
			
			case MYSQLI_TYPE_SHORT:   // Int16
			case MYSQLI_TYPE_LONG:   // Int32
			case MYSQLI_TYPE_LONGLONG:   // Int64
			case MYSQLI_TYPE_INT24:   // Int24
			case MYSQLI_TYPE_YEAR:  // Year
				return 'int';
			
			case MYSQLI_TYPE_BIT:
				return 'bit';
			
			case MYSQLI_TYPE_DECIMAL:   // Decimal
			case MYSQLI_TYPE_FLOAT:   // Float
			case MYSQLI_TYPE_DOUBLE:   // Double
			case MYSQLI_TYPE_NEWDECIMAL: // NewDecimal
				return 'decimal';
			
			case MYSQLI_TYPE_TIMESTAMP:   // Timestamp
			case MYSQLI_TYPE_DATE:  // Date
			case MYSQLI_TYPE_DATETIME:  // DateTime
			case MYSQLI_TYPE_NEWDATE:  // Newdate
				return 'datetime';
			
			case MYSQLI_TYPE_TIME:  // Time
				return 'time';
			
			#case 252:
            case MYSQLI_TYPE_STRING:
                return $this->isBinaryStringType($meta) ? 'blob' : 'string';

			case MYSQLI_TYPE_VAR_STRING: // VarChar
                return $this->isBinaryStringType($meta) ? 'blob' : 'string';

            case MYSQLI_TYPE_TINY_BLOB:
            case MYSQLI_TYPE_MEDIUM_BLOB:
            case MYSQLI_TYPE_LONG_BLOB:
            case MYSQLI_TYPE_BLOB:
			#case 254:
			case MYSQLI_TYPE_GEOMETRY:
				return 'blob';
		}
		
		return 'string';
	}

    private function isBinaryStringType($meta) {
        /*
        BINARY_ENCODING = 63
        see https://github.com/sidorares/node-mysql2/blob/ef283413607a5ee6643c238245f3ad4b533f5689/lib/constants/charsets.js#L64
        */
        return ($meta->flags & MYSQLI_BINARY_FLAG) && ($meta->charsetnr == 63);
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
			$type = $this->getStringType($meta);
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
			case 'year':
				return 'datetime';
				
			case 'time':
				return 'time';
			
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
	
	public function getValue($type, $value) {
		if (is_null($value) || strlen($value) == 0)
			return null;
		
		switch ($type) {
			case 'array':
				return base64_encode($value);
			
			case 'datetime':
				$timestamp = strtotime($value);
				$format = date("Y-m-d\TH:i:s.v", $timestamp);
				if (strpos($format, '.v') > 0) $format = date("Y-m-d\TH:i:s.000", $timestamp);
				return $format;
			
			case 'time':
				$hours = intval($value);
				if ($hours < 0 || $hours > 23) return $value;
				
				$timestamp = strtotime($value);
				$format = date("H:i:s.v", $timestamp);
				if (strpos($format, '.v') > 0) $format = date("H:i:s.000", $timestamp);
				return $format;
		}
		
		return $value;
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
						$row[] = $this->getValue($type, $rowItem[$i]);
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
					while ($rowItem = $isColumnsEmpty ? $query->fetch_assoc() : $query->fetch_row()) {
						$row = array();
						foreach ($rowItem as $key => $value) {
							if ($isColumnsEmpty && count($result->columns) < count($rowItem)) $result->columns[] = $key;
							$type = count($result->types) >= count($row) + 1 ? $result->types[count($row)] : 'string';
							$row[] = $this->getValue($type, $value);
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