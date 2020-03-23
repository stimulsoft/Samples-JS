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
			$result->rows = array();
			while ($rowItem = pg_fetch_assoc($query)) {
				$row = array();
				foreach ($rowItem as $key => $value) {
					if (count($result->columns) < count($rowItem)) $result->columns[] = $key;
					$row[] = $value;
				}
				$result->rows[] = $row;
			}
			$this->disconnect();
		}

		return $result;
	}
}