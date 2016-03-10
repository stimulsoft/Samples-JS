<?php
class StiFirebirdAdapter {
	public $connectionInfo = null;
	private $link = null;
	
	private function getLastErrorResult() {
		$errcode = ibase_errcode();
		if ($errcode == 0) return StiResult::error("Unknown");
		return StiResult::error("[".$errcode."] ".ibase_errmsg());
	}
	
	private function connect() {
		$this->link = ibase_connect($this->connectionInfo->host."/".$this->connectionInfo->port.":".$this->connectionInfo->database, $this->connectionInfo->userId, $this->connectionInfo->password);
		if (!$this->link) return $this->getLastErrorResult();
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		ibase_close($this->link);
	}
	
	public function test() {
		$result = $this->connect();
		if ($result->success) $this->disconnect();
		return $result;
	}
	
	public function execute($queryString) {
		$result = $this->connect();
		if ($result->success) {
			$query = ibase_query($this->link, $queryString);
			if (!$query) return $this->getLastErrorResult();
			
			while ($rowItem = ibase_fetch_assoc($query)) {
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