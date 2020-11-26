<?php
class StiPostgreSqlAdapter {
	private $connectionString = null;
	private $connectionInfo = null;
	private $link = null;

	private function getLastErrorResult() {
		$error = pg_last_error();
		if ($error) return StiResult::error($error);
		return StiResult::error("Unknown");
	}

	private function connect() {
		if (!function_exists("pg_connect")) return StiResult::error("PostgreSQL driver not found. Please configure your PHP server to work with PostgreSQL.");
		$this->link = pg_connect("host='".$this->connectionInfo->host."' port='".$this->connectionInfo->port."' dbname='".$this->connectionInfo->database.
				"' user='".$this->connectionInfo->userId."' password='".$this->connectionInfo->password."' options='--client_encoding=".$this->connectionInfo->charset."'");
		if (!$this->link) return $this->getLastErrorResult();
		return StiResult::success();
	}

	private function disconnect() {
		if (!$this->link) return;
		pg_close($this->link);
	}

	public function parse($connectionString) {
		$info = new stdClass();
		$info->host = "";
		$info->port = 5432;
		$info->database = "";
		$info->userId = "";
		$info->password = "";
		$info->charset = "utf8";

		$parameters = explode(";", $connectionString);
		foreach($parameters as $parameter)
		{
			if (strpos($parameter, "=") < 1) continue;

			$spos = strpos($parameter, "=");
			$name = strtolower(trim(substr($parameter, 0, $spos)));
			$value = trim(substr($parameter, $spos + 1));

			switch ($name)
			{
				case "server":
				case "host":
				case "location":
					$info->host = $value;
					break;

				case "port":
					$info->port = $value;
					break;
						
				case "database":
				case "data source":
					$info->database = $value;
					break;
						
				case "uid":
				case "user":
				case "userid":
				case "user id":
					$info->userId = $value;
					break;
						
				case "pwd":
				case "password":
					$info->password = $value;
					break;
					
				case "charset":
					$info->charset = $value;
					break;
			}
		}

		$this->connectionString = $connectionString;
		$this->connectionInfo = $info;
	}

	private function parseType($typeId) {
		switch ($typeId) {
			case 16: // BOOL
				return 'boolean';

			case 17: // BYTEA
			case 18: // CHAR
			case 19:
				return 'string';

			case 20: // INT8
			case 21: // INT2
			case 23: // INT4
				return 'int';

			case 24: // REGPROC
			case 25: // TEXT
			case 26: // OID
			case 27: // TID
			case 28: // XID
			case 29: // CID
			case 114: // JSON
			case 142: // XML
			case 194: // PG_NODE_TREE
			case 210: // SMGR
			case 602: // PATH
			case 604: // POLYGON
			case 650: // CIDR
				return 'string';

			case 700: // FLOAT4
			case 701: // FLOAT8
				return 'number';

			case 702: // ABSTIME
			case 703: // RELTIME
			case 704: // TINTERVAL
			case 718: // CIRCLE
			case 774: // MACADDR8
				return 'string';

			case 790: // MONEY
				return 'number';

			case 829: // MACADDR
			case 869: // INET
			case 1033: // ACLITEM
			case 1042: // BPCHAR
			case 1043: // VARCHAR
				return 'string';

			case 1082: // DATE
			case 1083: // TIME
				return 'datetime';

			case 1114: // TIMESTAMP
			case 1184: // TIMESTAMPTZ
			case 1186: // INTERVAL
			case 1266: // TIMETZ
			case 1560: // BIT
			case 1562: // VARBIT
			case 1700: // NUMERIC
			case 1790: // REFCURSOR
			case 2202: // REGPROCEDURE
			case 2203: // REGOPER
			case 2204: // REGOPERATOR
			case 2205: // REGCLASS
			case 2206: // REGTYPE
			case 2950: // UUID
			case 2970: // TXID_SNAPSHOT
			case 3220: // PG_LSN
			case 3361: // PG_NDISTINCT
			case 3402: // PG_DEPENDENCIES
			case 3614: // TSVECTOR
			case 3615: // TSQUERY
			case 3642: // GTSVECTOR
			case 3734: // REGCONFIG
			case 3769: // REGDICTIONARY
			case 3802: // JSONB
			case 4089: // REGNAMESPACE
			case 4096: // REGROLE
				return 'string';
		}
		
		// base64 array for others
		return 'array';
	}

	public function test() {
		$result = $this->connect();
		if ($result->success) $this->disconnect();
		return $result;
	}

	public function execute($queryString) {
		$result = $this->connect();
		if ($result->success) {
			$query = pg_query($this->link, $queryString);
			if (!$query) return $this->getLastErrorResult();
				
			$result->columns = array();
			$result->types = array();
			$count = pg_num_fields($query);
			for ($i = 0; $i < $count; $i++) {
				$result->columns[] = pg_field_name($query, $i);
				
				$typeId = pg_field_type_oid($query, $i);
				$result->types[] = $this->parseType($typeId);
			}
			
			$result->rows = array();
			while ($rowItem = pg_fetch_assoc($query)) {
				$row = array();
				foreach ($rowItem as $key => $value) {
					$type = $result->types[count($row)];
					$row[] = ($type == 'array') ? base64_encode($value) : $value;
				}
				$result->rows[] = $row;
			}
			$this->disconnect();
		}

		return $result;
	}
}