<?php
class StiMsSqlAdapter {
	public $connectionInfo = null;
	private $link = null;
	private $isMicrosoftDriver = false;
	
	private function getLastErrorResult() {
		$error = null;
		if ($this->isMicrosoftDriver) {
			if (($errors = sqlsrv_errors()) != null) {
				$error = $errors[count($errors) - 1];
				return StiResult::error("[".$error['code']."] ".$error['message']);
			}
		}
		else $error = mssql_get_last_message();
		
		if ($error) return StiResult::error($error);
		return StiResult::error("Unknown");
	}
	
	private function connect() {
		if ($this->isMicrosoftDriver) {
			$this->link = sqlsrv_connect(
					$this->connectionInfo->host, 
					array("UID" => $this->connectionInfo->userId, "PWD" => $this->connectionInfo->password, "Database" => $this->connectionInfo->database, "LoginTimeout" => 10, "ReturnDatesAsStrings" => true));
			if (!$this->link) return $this->getLastErrorResult();
		}
		else {
			$this->link = mssql_connect($this->connectionInfo->host, $this->connectionInfo->userId, $this->connectionInfo->password);
			if (!$this->link) return $this->getLastErrorResult();
			$db = mssql_select_db($this->connectionInfo->database, $this->link);
			mssql_close($this->link);
			if (!$db) return $this->getLastErrorResult();
		}
		
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		$this->isMicrosoftDriver ? sqlsrv_close($this->link) : mssql_close($this->link);
	}
	
	public function test() {
		$result = $this->connect();
		if ($result->success) $this->disconnect();
		return $result;
	}
	
	public function execute($queryString) {
		$result = $this->connect();
		if ($result->success) {
			$query = $this->isMicrosoftDriver ? sqlsrv_query($this->link, $queryString) : mssql_query($queryString, $this->link);
			if (!$query) return $this->getLastErrorResult();
			
			while ($rowItem = $this->isMicrosoftDriver ? sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC) : mssql_fetch_assoc($query)) {
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
	
	function __construct() {
		$this->isMicrosoftDriver = !function_exists("mssql_connect");
	}
}