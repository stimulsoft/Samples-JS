<?php
# Stimulsoft.Reports.JS
# Version: 2023.2.4
# Build date: 2023.05.17
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

namespace Stimulsoft;

use Stimulsoft\Adapters\StiDataAdapter;

class StiDataHandler
{
    public $version = '2023.2.4';

    public function stiErrorHandler($errNo, $errStr, $errFile, $errLine)
    {
        $result = StiResult::error("[$errNo] $errStr ($errFile, Line $errLine)");
        $result->handlerVersion = $this->version;
        StiResponse::json($result);
        exit();
    }

    public function stiShutdownFunction()
    {
        $err = error_get_last();
        if ($err != null && (($err['type'] & E_COMPILE_ERROR) || ($err['type'] & E_ERROR) || ($err['type'] & E_CORE_ERROR) || ($err['type'] & E_RECOVERABLE_ERROR))) {
            $result = StiResult::error("[{$err['type']}] {$err['message']} ({$err['file']}, Line {$err['line']})");
            StiResponse::json($result);
            exit();
        }
    }

    public function registerErrorHandlers()
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
                $reflectionClass = new \ReflectionClass('\Stimulsoft\StiDatabaseType');
                $databases = $reflectionClass->getConstants();
                $result = array(
                    'success' => true,
                    'types' => array_values($databases)
                );
            }
            else {
                $dataAdapter = StiDataAdapter::getDataAdapter($request->database);
                if ($dataAdapter == null)
                    $result = StiResult::error("Unknown database type [$request->database]");
                else {
                    $request->parameters = $this->getParameters($request);
                    $result = $this->getDataAdapterResult($dataAdapter, $request);
                    $result->adapterVersion = $dataAdapter->version;
                    $result->checkVersion = $dataAdapter->checkVersion;
                }

                $result->handlerVersion = $this->version;
            }
        }

        if ($response)
            StiResponse::json($result, $request->encode);

        return $result;
    }

    protected function getParameters($request)
    {
        $parameters = array();
        if (isset($request->queryString) && isset($request->parameters)) {
            foreach ($request->parameters as $item) {
                $name = mb_strpos($item->name, '@') === 0 || mb_strpos($item->name, ':') === 0 ? mb_substr($item->name, 1) : $item->name;
                $parameters[$name] = $item;
                unset($item->name);
            }
        }

        return $parameters;
    }

    protected function getDataAdapterResult($dataAdapter, $request)
    {
        $dataAdapter->parse($request->connectionString);

        if ($request->command == StiDataCommand::TestConnection)
            return $dataAdapter->test();

        if ($request->command == StiDataCommand::Execute || $request->command == StiDataCommand::ExecuteQuery)
        {
            if ($request->command == StiDataCommand::Execute)
                $request->queryString = $dataAdapter->makeQuery($request->queryString, $request->parameters);

            if (count($request->parameters) > 0) {
                $escapeQueryParameters = isset($request->escapeQueryParameters) ? $request->escapeQueryParameters : true;
                $request->queryString = StiDataAdapter::applyQueryParameters($request->queryString, $request->parameters, $escapeQueryParameters);
            }

            return $dataAdapter->executeQuery($request->queryString);
        }

        return StiResult::error("Unknown command [$request->command]");
    }

    public function __construct($registerErrorHandlers = true)
    {
        if ($registerErrorHandlers)
            $this->registerErrorHandlers();
    }
}
