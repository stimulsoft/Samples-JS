<?php
require_once 'adapters/mysql.php';
require_once 'adapters/mssql.php';
require_once 'adapters/firebird.php';
//require_once 'email/class.phpmailer.php';
//require_once 'email/class.pop3.php';
//require_once 'email/class.smtp.php';
//require_once 'email/PHPMailerAutoload.php';


//---------- Classes ----------//


class StiConnectionInfo {
	public $host = "";
	public $port = "";
	public $database = "";
	public $userId = "";
	public $password = "";
	public $charset = "";
	public $dsn = "";
	public $privilege = "";
	public $dataPath = "";
	public $schemaPath = "";
	
	public function parse($obj) {
		if (isset($obj->host)) $this->host = $obj->host;
		if (isset($obj->port)) $this->port = $obj->port;
		if (isset($obj->database)) $this->database = $obj->database;
		if (isset($obj->userId)) $this->userId = $obj->userId;
		if (isset($obj->password)) $this->password = $obj->password;
		if (isset($obj->charset)) $this->charset = $obj->charset;
		if (isset($obj->dsn)) $this->dsn = $obj->dsn;
		if (isset($obj->privilege)) $this->privilege = $obj->privilege;
		if (isset($obj->dataPath)) $this->dataPath = $obj->dataPath;
		if (isset($obj->schemaPath)) $this->schemaPath = $obj->schemaPath;
	}
}

class StiDatabaseType {
	const MySQL = "MySQL";
	const MSSQL = "MS SQL";
	const Firebird = "Firebird";
}

class StiCommandType {
	const TestConnection = "TestConnection";
	const ExecuteQuery = "ExecuteQuery";
	const SaveReport = "SaveReport";
	const ExportReport = "ExportReport";
	const SendEmail = "SendEmail";
}

class StiRequest {
	public $command = null;
	public $connectionInfo = null;
	public $queryString = null;
	public $database = null;
	public $report = null;
	public $reportFile = null;
	public $exportFormat = null;
	public $email = null;
	public $emailSubject = null;
	public $emailMessage = null;
	
	public function parse() {
		$data = null;
		if (isset($HTTP_RAW_POST_DATA)) $data = $HTTP_RAW_POST_DATA;
		if ($data == null) $data = file_get_contents("php://input");
		
		$obj = json_decode($data);
		if ($obj == null) return StiResult::error("JSON parser error");

		if (isset($obj->command)) $this->command = $obj->command;
		if (isset($obj->queryString)) $this->queryString = $obj->queryString;
		if (isset($obj->database)) $this->database = $obj->database;
		if (isset($obj->connectionStringInfo)) {
			$this->connectionInfo = new StiConnectionInfo();
			$this->connectionInfo->parse($obj->connectionStringInfo);
		}
		if (isset($obj->report)) $this->report = $obj->report;
		if (isset($obj->reportFile)) $this->reportFile = $obj->reportFile;
		if (isset($obj->exportFormat)) $this->exportFormat = $obj->exportFormat;
		if (isset($obj->email)) $this->email = $obj->email;
		if (isset($obj->emailSubject)) $this->emailSubject = $obj->emailSubject;
		if (isset($obj->emailMessage)) $this->emailMessage = $obj->emailMessage;
		
		return StiResult::success($this);
	}
}

class StiResponse {
	public static function json($result, $exit = true) {
		echo json_encode($result);
		if ($exit) exit;
	}
}

class StiResult {
	public $success = true;
	public $notice = null;
	public $object = null;
	public $columns = null;
	public $rows = null;
	
	public static function success($object = null, $notice = null) {
		$result = new StiResult();
		$result->success = true;
		$result->object = $object;
		$result->notice = $notice;
		return $result;
	}
	
	public static function error($notice = null) {
		$result = new StiResult();
		$result->success = false;
		$result->notice = $notice;
		return $result;
	}
}

class StiEmailOptions {
	/** Email address of the sender */
	public $from = null;
	
	/** Name and surname of the sender */
	public $name = "John Smith";
	
	/** Email address of the recipient */
	public $to = null;
	
	/** Email Subject */
	public $subject = null;
	
	/** Text of the Email */
	public $message = null;
	
	/** Text of the Email */
	public $attachmentFile = null;
	
	/** Charset for the message */
	public $charset = "UTF-8";
	
	/** Set to true if authentication is required */
	public $auth = false;
	
	/** Address of the SMTP server */
	public $host = "smtp.gmail.com";
	
	/** Port of the SMTP server */
	public $port = 465;
	
	/** The secure connection prefix - ssl or tls */
	public $secure = "ssl";
	
	/** Login (Username or Email) */
	public $login = null;
	
	/** Password */
	public $password = null;
	
	/** Show a message when Email is successfully sent */
	public $successfully = true;
}


//---------- Handler ----------//


class StiHandler {

//--- Events

	private function checkEventResult($result) {
		if (isset($result)) {
			if ($result === true) return StiResult::success();
			if ($result === false) return StiResult::error();
			if (gettype($result) == "string") return StiResult::error($result);
			return $result;
		}
		return StiResult::success();
	}
	
	public $onConnect = null;
	private function invokeConnect($connection) {
		$event = $this->onConnect;
		if ($event != null) {
			$result = $event($connection);
			return $this->checkEventResult($result);
		}
		return StiResult::success($connection);
	}
	
	public $onExecuteQuery = null;
	private function invokeExecuteQuery($queryString) {
		$event = $this->onExecuteQuery;
		if ($event != null) {
			$result = $event($queryString);
			return $this->checkEventResult($result);
		}
		return StiResult::success($queryString);
	}
	
	public $onSaveReport = null;
	private function invokeSaveReport($report, $reportFile) {
		$event = $this->onSaveReport;
		if ($event != null) {
			$result = $event($report, $reportFile);
			return $this->checkEventResult($result);
		}
		return StiResult::success();
	}
	
	public $onExportReport = null;
	private function invokeExportReport($report, $reportFile, $exportFormat) {
		$event = $this->onExportReport;
		if ($event != null) {
			$result = $event($report, $reportFile, $exportFormat);
			return $this->checkEventResult($result);
		}
		return StiResult::success();
	}
	
	public $onSendEmail = null;
	private function invokeSendEmail($report, $reportFile, $exportFormat, $email, $emailSubject, $emailMessage) {
		$event = $this->onExportReport;
		if ($event != null) {
			$options = new StiEmailOptions();
			$options->to = $email;
			$options->subject = $emailSubject;
			$options->message = $emailMessage;
			$options->attachmentFile = $reportFile;
			
			$result = $event($report, $exportFormat, $options);
			$result = $this->checkEventResult($result);
			
			if ($result->object != null) {
				$options = $result->object;
				
				$guid = substr(md5(uniqid().mt_rand()), 0, 12);
				if (!file_exists('tmp')) mkdir('tmp');
				file_put_contents('tmp/'.$guid.'.'.$options->attachmentFile, $report);
				
				$mail = new PHPMailer(true);
				if ($options->auth) $mail->IsSMTP();
				try {
					$mail->CharSet = $options->charset;
					$mail->IsHTML(false);
					$mail->From = $options->from;
					$mail->FromName = $options->name;
						
					// Add Emails list
					$emails = preg_split('/,|;/', $options->to);
					foreach ($emails as $email) {
						$mail->AddAddress(trim($email));
					}
						
					$mail->Subject = htmlspecialchars($options->subject);
					$mail->Body = $options->message;
					$mail->AddAttachment('tmp/'.$guid.'.'.$options->attachmentFile, $options->attachmentFile);
						
					if ($options->auth) {
						$mail->Host = $options->host;
						$mail->Port = $options->port;
						$mail->SMTPAuth = $options->auth;
						$mail->SMTPSecure = $options->secure;
						$mail->Username = $options->login;
						$mail->Password = $options->password;
					}
						
					$mail->Send();
					$error = $_options['successfully'] ? '0' : '-1';
				}
				catch (phpmailerException $e) {
					$error = strip_tags($e->errorMessage());
					return StiResult::error($error);
				}
				catch (Exception $e) {
					$error = strip_tags($e->getMessage());
					
				}
				
				unlink('tmp/'.$guid.'.'.$options->attachmentFile);
				
				if (isset($error)) return StiResult::error($error);
				StiResult::success(null, $options->successfully ? "0" : "-1");
			}
		}
		return StiResult::success();
	}
	
//--- Methods
	
	public function registerErrorHandlers() {
		set_error_handler(function ($errNo, $errStr, $errFile, $errLine) {
			$result = StiResult::error("[".$errNo."] ".$errStr." (".$errFile.", Line ".$errLine.")");
			StiResponse::json($result);
		});
		
		register_shutdown_function(function () {
			$err = error_get_last();
			if (($err["type"] & E_COMPILE_ERROR) || ($err["type"] & E_ERROR) || ($err["type"] & E_CORE_ERROR) || ($err["type"] & E_RECOVERABLE_ERROR)) {
				$result = StiResult::error("[".$err["type"]."] ".$err["message"]." (".$err["file"].", Line ".$err["line"].")");
				StiResponse::json($result);
			}
		});
	}
	
	public function process($response = true) {
		$result = $this->innerProcess();
		if ($response) StiResponse::json($result);
		return $result;
	}
	
	
//--- Private methods
	
	private function createConnection($database, $connectionInfo) {
		switch ($database) {
			case StiDatabaseType::MySQL:
				$connection = new StiMySqlAdapter();
				break;
				
			case StiDatabaseType::MSSQL:
				$connection = new StiMsSqlAdapter();
				break;
				
			case StiDatabaseType::Firebird:
				$connection = new StiFirebirdAdapter();
				break;
		}
		
		if (isset($connection)) {
			$connection->connectionInfo = $connectionInfo;
			return $this->invokeConnect($connection);
		}
		
		return StiResult::error("Unknown database type [".$database."]");
	}
	
	private function innerProcess() {
		$request = new StiRequest();
		$result = $request->parse();
		if ($result->success) {
			switch ($request->command) {
				case StiCommandType::TestConnection:
					$result = $this->createConnection($request->database, $request->connectionInfo);
					if (!$result->success) return $result;
					return $result->object->test();
			
				case StiCommandType::ExecuteQuery:
					$result = $this->createConnection($request->database, $request->connectionInfo);
					if (!$result->success) return $result;
					$connection = $result->object;
					$result = $this->invokeExecuteQuery($request->queryString);
					if (!$result->success) return $result;
					return $connection->execute($result->object);
			
				case StiCommandType::SaveReport:
					return $this->invokeSaveReport($request->report, $request->reportFile);
					
				case StiCommandType::ExportReport:
					return $this->invokeExportReport($request->report, $request->reportFile, $request->exportFormat);
						
				case StiCommandType::SendEmail:
					return $this->invokeSaveReport($request->report, $request->reportFile, $request->exportFormat, $request->email, $request->emailSubject, $request->emailMessage);
			}
			
			$result->success = false;
			$result->notice = "Unknown command [".$request->command."]";
		}
		
		return $result;
	}
}