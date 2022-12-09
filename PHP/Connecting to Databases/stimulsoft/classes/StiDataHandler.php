<?php

namespace Stimulsoft;

use ReflectionClass;
use Stimulsoft\Adapters\StiDataAdapter;
use Stimulsoft\Enums\StiDataCommand;

class StiDataHandler
{
    public $version = '2023.1.1';

    private function stiErrorHandler($errNo, $errStr, $errFile, $errLine)
    {
        $result = StiResult::error("[$errNo] $errStr ($errFile, Line $errLine)");
        StiResponse::json($result);
    }

    private function stiShutdownFunction()
    {
        $err = error_get_last();
        if ($err != null && (($err['type'] & E_COMPILE_ERROR) || ($err['type'] & E_ERROR) || ($err['type'] & E_CORE_ERROR) || ($err['type'] & E_RECOVERABLE_ERROR))) {
            $result = StiResult::error("[{$err['type']}] {$err['message']} ({$err['file']}, Line {$err['line']})");
            StiResponse::json($result);
        }
    }

    private function registerErrorHandlers()
    {
        set_error_handler(array($this, 'stiErrorHandler'));
        register_shutdown_function(array($this, 'stiShutdownFunction'));
        error_reporting(0);
    }

    /** Start processing the request from the client side. */
    public function process($response = true)
    {
        $request = new StiDataRequest();
        $result = $request->parse();
        if ($result->success) {
            if ($result->object->command == StiDataCommand::GetSupportedAdapters) {
                $reflectionClass = new ReflectionClass('\Stimulsoft\Enums\StiDatabaseType');
                $databases = $reflectionClass->getConstants();
                $result = array(
                    'success' => true,
                    'types' => array_values($databases)
                );
            }
            else {
                $result = StiDataAdapter::getDataAdapterResult($request);

                /** @var StiDataAdapter $dataAdapter */
                $dataAdapter = $result->object;
                $result = $request->command == StiDataCommand::TestConnection
                    ? $dataAdapter->test()
                    : $dataAdapter->execute($request->queryString);
                $result->handlerVersion = $this->version;
                $result->adapterVersion = $dataAdapter->version;
                $result->checkVersion = $dataAdapter->checkVersion;
            }
        }

        if ($response)
            StiResponse::json($result, $request->encode);

        return $result;
    }

    public function __construct($registerErrorHandlers = true)
    {
        if ($registerErrorHandlers)
            $this->registerErrorHandlers();
    }
}
