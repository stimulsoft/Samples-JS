<?php
# Stimulsoft.Reports.JS
# Version: 2023.1.2
# Build date: 2022.12.15
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

namespace Stimulsoft\Adapters;

use Stimulsoft\StiDataResult;
use Stimulsoft\StiResult;

class StiPostgreSqlAdapter extends StiDataAdapter
{
    public $version = '2023.1.2';
    public $checkVersion = true;

    protected $driverName = 'pgsql';

    protected function getLastErrorResult()
    {
        if ($this->driverType == 'PDO')
            return parent::getLastErrorResult();

        $message = 'Unknown';
        $error = pg_last_error();
        if ($error) $message = $error;

        return StiResult::error($message);
    }

    protected function connect()
    {
        if ($this->driverType == 'PDO')
            return parent::connect();

        if (!function_exists('pg_connect'))
            return StiResult::error('PostgreSQL driver not found. Please configure your PHP server to work with PostgreSQL.');

        $connectionString = "host='" . $this->info->host . "' port='" . $this->info->port . "' dbname='" . $this->info->database . "' user='" . $this->info->userId . "' password='" . $this->info->password . "' options='--client_encoding=" . $this->info->charset . "'";
        $this->link = pg_connect($connectionString);
        if (!$this->link)
            return $this->getLastErrorResult();

        return StiDataResult::success();
    }

    protected function disconnect()
    {
        if ($this->driverType == 'PDO')
            parent::disconnect();
        else if ($this->link) {
            pg_close($this->link);
            $this->link = null;
        }
    }

    public function parse($connectionString)
    {
        if (parent::parse($connectionString))
            return true;

        $this->info->port = 5432;
        $this->info->charset = 'utf8';

        $parameterNames = array(
            'host' => ['server', 'host', 'location'],
            'port' => ['port'],
            'database' => ['database', 'data source', 'dbname'],
            'userId' => ['uid', 'user', 'username', 'userid', 'user id'],
            'password' => ['pwd', 'password'],
            'charset' => ['charset']
        );

        return $this->parseParameters($connectionString, $parameterNames);
    }

    protected function parseType($meta)
    {
        $type = strtolower($this->driverType == 'PDO' ? $meta['native_type'] : $meta);
        if (substr($type, 0, 1) == '_')
            $type = 'array';

        switch ($type) {
            case "int":
            case 'int2':
            case 'int4':
            case 'int8':
            case "smallint":
            case "bigint":
            case "tinyint":
            case "integer":
            case 'numeric':
            case "uniqueidentifier":
                return 'int';

            case "float":
            case 'float4':
            case 'float8':
            case "real":
            case "double":
            case "decimal":
            case "smallmoney":
            case "money":
                return 'number';

            case 'bool':
            case "boolean":
                return 'boolean';

            case "abstime":
            case "date":
            case "datetime":
            case "smalldatetime":
            case "timestamp":
                return 'datetime';

            case 'timetz':
            case 'timestamptz':
                return 'datetimeoffset';

            case 'time':
                return 'time';

            case 'bytea':
            case 'array':
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

            case 'datetimeoffset':
                if (strlen($value) <= 15) {
                    $offset = substr($value, strpos($value, '+'));
                    if (strlen($offset) == 3) $offset = $offset . ':00';
                    $value = substr($value, 0, strpos($value, '+'));
                    $value = '0001-01-01 ' . $value;
                    $timestamp = strtotime($value);
                    $format = date("Y-m-d\TH:i:s.v", $timestamp);
                    if (strpos($format, '.v') > 0) $format = date("Y-m-d\TH:i:s.000", $timestamp);
                    return $format . $offset;
                }

                $timestamp = strtotime($value);
                $format = gmdate("Y-m-d\TH:i:s.v\Z", $timestamp);
                if (strpos($format, '.v') > 0) $format = gmdate("Y-m-d\TH:i:s.000\Z", $timestamp);
                return $format;

            case 'time':
                $timestamp = strtotime($value);
                $format = date("H:i:s.v", $timestamp);
                if (strpos($format, '.v') > 0) $format = date("H:i:s.000", $timestamp);
                return $format;
        }

        return $value;
    }

    protected function executeNative($queryString, $result)
    {
        $query = pg_query($this->link, $queryString);
        if (!$query)
            return $this->getLastErrorResult();

        $result->count = pg_num_fields($query);

        for ($i = 0; $i < $result->count; $i++) {
            $result->columns[] = pg_field_name($query, $i);
            $type = pg_field_type($query, $i);
            $result->types[] = $this->parseType($type);
        }

        while ($rowItem = pg_fetch_assoc($query)) {
            $row = array();
            foreach ($rowItem as $value) {
                $type = count($result->types) >= count($row) + 1 ? $result->types[count($row)] : 'string';
                $row[] = $this->getValue($type, $value);
            }
            $result->rows[] = $row;
        }

        return $result;
    }
}