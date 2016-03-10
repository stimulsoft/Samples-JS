<?php
class StiMySqlAdapter {
	public $connectionInfo = null;
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