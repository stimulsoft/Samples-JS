<?php

namespace Stimulsoft;

use Stimulsoft\Enums\StiDataCommand;

class StiDataRequest
{
    public $encode = false;
    public $command;
    public $connectionString;
    public $queryString;
    public $database;
    public $dataSource;
    public $connection;
    public $timeout;

    private function populateVars($obj)
    {
        $className = get_class($this);
        $vars = get_class_vars($className);
        foreach ($vars as $name => $value) {
            if (isset($obj->{$name}))
                $this->{$name} = $obj->{$name};
        }
    }

    public function parse()
    {
        $input = file_get_contents('php://input');

        if (strlen($input) > 0 && mb_substr($input, 0, 1) != '{') {
            $input = base64_decode(str_rot13($input));
            $this->encode = true;
        }

        $obj = json_decode($input);
        if ($obj == null) {
            $message = 'JSON parser error #' . json_last_error();
            if (function_exists('json_last_error_msg'))
                $message .= ' (' . json_last_error_msg() . ')';

            return StiResult::error($message);
        }

        $this->populateVars($obj);

        return $this->checkRequestParams($obj);
    }

    protected function checkRequestParams($obj)
    {
        if (isset($obj->command))
            $this->command = $obj->command;

        if ($this->command == StiDataCommand::GetSupportedAdapters)
            return StiResult::success(null, $this);

        if ($this->command != StiDataCommand::TestConnection && $this->command != StiDataCommand::ExecuteQuery)
            return StiResult::error('Unknown command [' . $this->command . ']');

        return StiResult::success(null, $this);
    }
}