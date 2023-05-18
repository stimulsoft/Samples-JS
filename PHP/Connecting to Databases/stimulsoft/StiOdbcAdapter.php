<?php
# Stimulsoft.Reports.JS
# Version: 2023.2.4
# Build date: 2023.05.17
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

namespace Stimulsoft\Adapters;

use Stimulsoft\StiDataResult;
use Stimulsoft\StiResult;

class StiOdbcAdapter extends StiDataAdapter
{
    public $version = '2023.2.4';
    public $checkVersion = true;

    protected function getLastErrorResult()
    {
        $message = 'Unknown';
        $code = odbc_error();
        $error = odbc_errormsg();
        if ($error) $message = $error;

        return $code == 0 ? StiResult::error($message) : StiResult::error("[$code] $message");
    }

    protected function connect()
    {
        $this->link = odbc_connect($this->info->dsn, $this->info->userId, $this->info->password);

        if (!$this->link)
            return $this->getLastErrorResult();

        return StiDataResult::success();
    }

    protected function disconnect()
    {
        if ($this->link) {
            odbc_close($this->link);
            $this->link = null;
        }
    }

    public function parse($connectionString)
    {
        $parameterNames = array(
            'userId' => ['uid', 'user', 'username', 'userid', 'user id'],
            'password' => ['pwd', 'password']
        );

        return $this->parseParameters($connectionString, $parameterNames);
    }

    protected function parseType($meta)
    {
        $type = strtolower($meta);
        switch ($type) {
            case 'short':
            case 'int':
            case 'int2':
            case 'int4':
            case 'int8':
            case 'int24':
            case 'integer':
            case 'long':
            case 'longlong':
            case 'smallint':
            case 'bigint':
            case 'tinyint':
            case 'byte':
            case 'counter':
            case 'year':
                return 'int';

            case 'bit':
                return 'boolean';

            case 'float':
            case 'float4':
            case 'float8':
            case 'double':
            case 'decimal':
            case 'newdecimal':
            case 'money':
            case 'numeric':
            case 'real':
            case 'smallmoney':
            case 'currency':
                return 'number';

            case 'string':
            case 'var_string':
            case 'char':
            case 'nchar':
            case 'ntext':
            case 'varchar':
            case 'nvarchar':
            case 'text':
            case 'uniqueidentifier':
            case 'xml':
                return 'string';

            case 'date':
            case 'datetime':
            case 'datetime2':
            case 'datetimeoffset':
            case 'smalldatetime':
                return 'datetime';

            case 'time':
            case 'timestamp':
                return 'time';

            case 'blob':
            case 'geometry':
            case 'binary':
            case 'image':
            case 'sql_variant':
            case 'varbinary':
            case 'longbinary':
            case 'cursor':
            case 'bytea':
                return 'array';
        }

        return 'string';
    }

    protected function getValue($type, $value)
    {
        if (is_null($value) || strlen($value) == 0)
            return null;

        switch ($type) {
            case 'array':
                return base64_encode($value);

            case 'datetime':
                $timestamp = strtotime($value);
                $format = date("Y-m-d\TH:i:s.v", $timestamp);
                if (strpos($format, '.v') > 0) $format = date("Y-m-d\TH:i:s.000", $timestamp);
                return $format;

            case 'time':
                $timestamp = strtotime($value);
                $format = date("H:i:s.v", $timestamp);
                if (strpos($format, '.v') > 0) $format = date("H:i:s.000", $timestamp);
                return $format;
        }

        return $value;
    }

    public function executeQuery($queryString)
    {
        $result = $this->connect();
        if ($result->success) {
            $query = odbc_exec($this->link, $queryString);
            if (!$query)
                return $this->getLastErrorResult();

            $result->types = array();
            $result->columns = array();
            $result->rows = array();

            $result->count = odbc_num_fields($query);

            for ($i = 1; $i <= $result->count; $i++) {
                $type = odbc_field_type($query, $i);
                $result->types[] = $this->parseType($type);
                $result->columns[] = odbc_field_name($query, $i);
            }

            while (odbc_fetch_row($query)) {
                $row = array();
                for ($i = 1; $i <= $result->count; $i++) {
                    $type = $result->types[$i - 1];
                    $value = odbc_result($query, $i);
                    $row[] = $this->getValue($type, $value);
                }

                $result->rows[] = $row;
            }

            odbc_free_result($query);
            $this->disconnect();
        }

        return $result;
    }
}