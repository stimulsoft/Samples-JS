<?php
class StiOracleAdapter {
	private $connectionString = null;
	private $connectionInfo = null;
	private $link = null;
	
	private function getLastErrorResult() {
		$error = oci_error();
		if ($error === false) return StiResult::error("Unknown");
		return StiResult::error("[".$error['code']."] ".$error['message']);
	}
	
	private function connect() {
		if (!function_exists("oci_connect")) return StiResult::error("Oracle driver not found. Please configure your PHP server to work with Oracle.");
		if ($this->connectionInfo->privilege == "") $this->link = oci_connect($this->connectionInfo->userId, $this->connectionInfo->password, $this->connectionInfo->database, $this->connectionInfo->charset);
		else $this->link = oci_pconnect($this->connectionInfo->userId, $this->connectionInfo->password, $this->connectionInfo->database, $this->connectionInfo->charset, $this->connectionInfo->privilege);
		if (!$this->link) return $this->getLastErrorResult();
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		oci_close($this->link);
	}
	
	public function parse($connectionString) {
		$info = new stdClass();
		$info->database = "";
		$info->userId = "";
		$info->password = "";
		$info->charset = "AL32UTF8";
		$info->privilege = "";
		
		$parameters = explode(";", $connectionString);
		foreach($parameters as $parameter)
		{
			if (strpos($parameter, "=") < 1) continue;
			
			$spos = strpos($parameter, "=");
			$name = strtolower(trim(substr($parameter, 0, $spos)));
			$value = trim(substr($parameter, $spos + 1));
			
			switch ($name)
			{
				case "database":
				case "data source":
					$info->database = $value;
					break;
					
				case "uid":
				case "user":
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
					
				case "dba privilege":
				case "privilege":
					$value = strtolower($value);
					$info->privilege = OCI_DEFAULT;
					if ($value == "sysoper" || $value == "oci_sysoper") $info->privilege = OCI_SYSOPER;
					if ($value == "sysdba" || $value == "oci_sysdba") $info->privilege = OCI_SYSDBA;
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
			$query = oci_parse($this->link, $queryString);
			if (!$query || !oci_execute($query)) return $this->getLastErrorResult();
			
			$result->columns = array();
			$result->rows = array();
			while ($rowItem = oci_fetch_assoc($query)) {
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