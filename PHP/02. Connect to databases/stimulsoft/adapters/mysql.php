<?php
class StiMySqlAdapter {
	private $connectionString = null;
	private $connectionInfo = null;
	private $link = null;
	
	private function getLastErrorResult() {
		if ($this->link->errno == 0) return StiResult::error("Unknown");
		return StiResult::error("[".$this->link->errno."] ".$this->link->error);
	}
	
	private function connect() {
		$this->link = new mysqli($this->connectionInfo->host, $this->connectionInfo->userId, $this->connectionInfo->password, $this->connectionInfo->database, $this->connectionInfo->port);
		if ($this->link->connect_error) return StiResult::error("[".$this->link->connect_errno."] ".$this->link->connect_error);
		if (!$this->link->set_charset($this->connectionInfo->charset)) return $this->getLastErrorResult();
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		$this->link->close();
	}
	
	public function parse($connectionString) {
		$info = new stdClass();
		$info->host = "";
		$info->port = 3306;
		$info->database = "";
		$info->userId = "";
		$info->password = "";
		$info->charset = "utf8";
		
		$parameters = explode(";", $connectionString);
		foreach($parameters as $parameter)
		{
			if (strpos($parameter, "=") < 1) continue;
				
			$parts = explode("=", $parameter);
			$name = strtolower(trim($parts[0]));
			if (count($parts) > 1) $value = $parts[1];
				
			if (isset($value))
			{
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
					case "username":
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
			$query = $this->link->query($queryString);
			if (!$query) return $this->getLastErrorResult();
			
			$result->columns = array();
			$result->rows = array();
			while ($rowItem = $query->fetch_assoc()) {
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