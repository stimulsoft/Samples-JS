<?php
# Stimulsoft.Reports.JS
# Version: 2023.1.3
# Build date: 2022.12.27
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

namespace Stimulsoft\Adapters;

use Stimulsoft\StiDataResult;
use Stimulsoft\StiResult;

class StiMySqlAdapter extends StiDataAdapter
{
    public $version = '2023.1.3';
    public $checkVersion = true;

    protected $driverName = 'mysql';

    protected function getLastErrorResult()
    {
        if ($this->driverType == 'PDO')
            return parent::getLastErrorResult();

        $message = 'Unknown';
        $code = $this->link->errno;
        if ($this->link->error)
            $message = $this->link->error;

        return $code == 0 ? StiResult::error($message) : StiResult::error("[$code] $message");
    }

    protected function connect()
    {
        if ($this->driverType == 'PDO')
            return parent::connect();

        $this->link = new \mysqli($this->info->host, $this->info->userId, $this->info->password, $this->info->database, $this->info->port);

        if ($this->link->connect_error)
            return StiResult::error("[{$this->link->connect_errno}] {$this->link->connect_error}");

        if (!$this->link->set_charset($this->info->charset))
            return $this->getLastErrorResult();

        return StiDataResult::success();
    }

    protected function disconnect()
    {
        if ($this->driverType == 'PDO')
            parent::disconnect();
        else if ($this->link) {
            $this->link->close();
            $this->link = null;
        }
    }

    public function parse($connectionString)
    {
        if (parent::parse($connectionString))
            return true;

        $this->info->port = 3306;
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

    private function getStringType($meta)
    {
        switch ($meta->type) {
            case MYSQLI_TYPE_TINY:
                return 'tiny';

            case MYSQLI_TYPE_SHORT:
            case MYSQLI_TYPE_LONG:
            case MYSQLI_TYPE_LONGLONG:
            case MYSQLI_TYPE_INT24:
            case MYSQLI_TYPE_YEAR:
                return 'int';

            case MYSQLI_TYPE_BIT:
                return 'bit';

            case MYSQLI_TYPE_DECIMAL:
            case MYSQLI_TYPE_FLOAT:
            case MYSQLI_TYPE_DOUBLE:
            case MYSQLI_TYPE_NEWDECIMAL:
                return 'decimal';

            case MYSQLI_TYPE_TIMESTAMP:
            case MYSQLI_TYPE_DATE:
            case MYSQLI_TYPE_DATETIME:
            case MYSQLI_TYPE_NEWDATE:
                return 'datetime';

            case MYSQLI_TYPE_TIME:
                return 'time';

            case MYSQLI_TYPE_STRING:
            case MYSQLI_TYPE_VAR_STRING:
            case MYSQLI_TYPE_BLOB:
                return $this->isBinaryStringType($meta) ? 'blob' : 'string';

            case MYSQLI_TYPE_TINY_BLOB:
            case MYSQLI_TYPE_MEDIUM_BLOB:
            case MYSQLI_TYPE_LONG_BLOB:
            case MYSQLI_TYPE_GEOMETRY:
                return 'blob';
        }

        return 'string';
    }

    private function isBinaryStringType($meta)
    {
        // BINARY_ENCODING = 63, see https://github.com/sidorares/node-mysql2/blob/ef283413607a5ee6643c238245f3ad4b533f5689/lib/constants/charsets.js#L64
        return ($meta->flags & MYSQLI_BINARY_FLAG) && ($meta->charsetnr == 63);
    }

    protected function parseType($meta)
    {
        $binary = false;

        if ($this->driverType == 'PDO') {
            foreach ($meta['flags'] as $value) {
                if ($value == 'blob')
                    $binary = true;
            }
            $type = $meta['native_type'];
            $length = $meta['len'];
        }
        else {
            $type = $this->getStringType($meta);
            $length = $meta->length;
        }

        $type = strtolower($type);
        switch ($type) {
            case 'short':
            case 'int':
            case 'int24':
            case 'long':
            case 'longlong':
            case 'bit':
                return 'int';

            case 'decimal':
            case 'newdecimal':
            case 'float':
            case 'double':
                return 'number';

            case 'tiny':
                return $length == 1 ? 'boolean' : 'int';

            case 'string':
            case 'var_string':
                return $binary ? 'array' : 'string';

            case 'date':
            case 'datetime':
            case 'timestamp':
            case 'year':
                return 'datetime';

            case 'time':
                return 'time';

            case 'blob':
            case 'geometry':
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
                // Replace invalid dates with NULL
                if ($value == "0000-00-00 00:00:00") return null;
                $timestamp = strtotime($value);
                $format = date("Y-m-d\TH:i:s.v", $timestamp);
                if (strpos($format, '.v') > 0) $format = date("Y-m-d\TH:i:s.000", $timestamp);
                return $format;

            case 'time':
                $hours = intval($value);
                if ($hours < 0 || $hours > 23) return $value;

                $timestamp = strtotime($value);
                $format = date("H:i:s.v", $timestamp);
                if (strpos($format, '.v') > 0) $format = date("H:i:s.000", $timestamp);
                return $format;
        }

        return $value;
    }

    protected function executeNative($queryString, $result)
    {
        $query = $this->link->query($queryString);
        if (!$query)
            return $this->getLastErrorResult();

        $result->count = $query->field_count;

        while ($meta = $query->fetch_field()) {
            $result->columns[] = $meta->name;
            $result->types[] = $this->parseType($meta);
        }

        if ($query->num_rows > 0) {
            $isColumnsEmpty = count($result->columns) == 0;
            while ($rowItem = $isColumnsEmpty ? $query->fetch_assoc() : $query->fetch_row()) {
                $row = array();
                foreach ($rowItem as $key => $value) {
                    if ($isColumnsEmpty && count($result->columns) < count($rowItem)) $result->columns[] = $key;
                    $type = count($result->types) >= count($row) + 1 ? $result->types[count($row)] : 'string';
                    $row[] = $this->getValue($type, $value);
                }
                $result->rows[] = $row;
            }
        }

        return $result;
    }
}