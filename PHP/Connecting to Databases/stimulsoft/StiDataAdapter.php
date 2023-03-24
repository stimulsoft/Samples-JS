<?php
# Stimulsoft.Reports.JS
# Version: 2023.2.1
# Build date: 2023.03.22
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

namespace Stimulsoft\Adapters;

use Stimulsoft\StiConnectionInfo;
use Stimulsoft\StiDatabaseType;
use Stimulsoft\StiDataResult;
use Stimulsoft\StiResult;

class StiDataAdapter
{
    public $version;
    public $checkVersion = false;

    protected $driverType = 'Native';
    protected $driverName;
    protected $info;
    protected $link;

    protected function getLastErrorResult()
    {
        $message = 'Unknown';
        $info = $this->link->errorInfo();
        $code = $info[0];
        if (count($info) >= 3)
            $message = $info[2];

        return $code == 0 ? StiResult::error($message) : StiResult::error("[$code] $message");
    }

    protected function connect()
    {
        try {
            $this->link = new \PDO($this->info->dsn, $this->info->userId, $this->info->password);
        }
        catch (\PDOException $e) {
            $code = $e->getCode();
            $message = $e->getMessage();
            return $code == 0 ? StiResult::error($message) : StiResult::error("[$code] $message");
        }

        return StiDataResult::success();
    }

    protected function disconnect()
    {
        $this->link = null;
    }

    public function test()
    {
        $result = $this->connect();
        if ($result->success) $this->disconnect();
        return $result;
    }

    public function parse($connectionString)
    {
        $this->info = new StiConnectionInfo();
        $connectionString = trim($connectionString);

        if (mb_strpos($connectionString, "$this->driverName:") !== false) {
            $this->driverType = 'PDO';

            $parameterNames = array(
                'userId' => ['uid', 'user', 'username', 'userid', 'user id'],
                'password' => ['pwd', 'password']
            );

            return $this->parseParameters($connectionString, $parameterNames);
        }

        return false;
    }

    protected function parseParameters($connectionString, $parameterNames)
    {
        $connectionString = trim($connectionString);
        $parameters = explode(';', $connectionString);

        foreach ($parameters as $parameter) {
            $name = '';
            $value = $parameter;
            if (mb_strpos($parameter, '=') >= 0) {
                $pos = mb_strpos($parameter, '=');
                $name = mb_strtolower(trim(mb_substr($parameter, 0, $pos)));
                $value = trim(mb_substr($parameter, $pos + 1));
            }

            $unknown = true;
            foreach ($parameterNames as $key => $names) {
                if (in_array($name, $names)) {
                    $this->info->{$key} = $value;
                    $unknown = false;
                    break;
                }
            }

            if ($unknown)
                $this->parseUnknownParameter($parameter, $name, $value);
        }

        return true;
    }

    protected function parseUnknownParameter($parameter, $name, $value)
    {
        if ($this->driverType == 'PDO' && !is_null($parameter) && mb_strlen($parameter) > 0) {
            if (mb_strlen($this->info->dsn) > 0)
                $this->info->dsn .= ';';

            $this->info->dsn .= $parameter;
        }
    }

    protected function parseType($meta)
    {
        return 'string';
    }

    protected function getValue($type, $value)
    {
        return $value;
    }

    protected function detectType($value)
    {
        if (preg_match('~[^\x20-\x7E\t\r\n]~', $value) > 0)
            return 'array';

        if (is_numeric($value)) {
            if (strpos($value, '.') !== false) return 'number';
            return 'int';
        }

        if (\DateTime::createFromFormat('Y-m-d H:i:s', $value) !== false ||
            \DateTime::createFromFormat('Y-m-d', $value) !== false ||
            \DateTime::createFromFormat('Y-M-d', $value) !== false ||
            \DateTime::createFromFormat('H:i:s', $value) !== false)
            return 'datetime';

        if (is_string($value))
            return 'string';

        return 'array';
    }

    public function makeQuery($procedure, $parameters)
    {
        $paramsString = '';
        foreach ($parameters as $name => $parameter) {
            if (strlen($paramsString) > 0)
                $paramsString .= ', ';

            $paramsString .= "@$name";
        }

        return $paramsString;
    }

    public function executeQuery($queryString)
    {
        $result = $this->connect();
        if ($result->success) {
            $result->types = array();
            $result->columns = array();
            $result->rows = array();

            $result = $this->driverType == 'PDO'
                ? $this->executePDO($queryString, $result)
                : $this->executeNative($queryString, $result);

            $this->disconnect();
        }

        return $result;
    }

    protected function executePDO($queryString, $result)
    {
        $query = $this->link->query($queryString);
        if (!$query)
            return $this->getLastErrorResult();

        $result->count = $query->columnCount();

        for ($i = 0; $i < $result->count; $i++) {
            $meta = $query->getColumnMeta($i);
            $result->columns[] = $meta['name'];
            $result->types[] = $this->parseType($meta);
        }

        while ($rowItem = $query->fetch()) {
            $row = array();
            for ($i = 0; $i < $result->count; $i++) {
                $type = count($result->types) >= $i + 1 ? $result->types[$i] : 'string';
                $row[] = $this->getValue($type, $rowItem[$i]);
            }
            $result->rows[] = $row;
        }

        return $result;
    }

    protected function executePDOv2($queryString, $result)
    {
        $query = $this->link->query($queryString);
        if (!$query)
            return $this->getLastErrorResult();

        $result->count = $query->columnCount();

        while ($rowItem = $query->fetch()) {
            $index = 0;
            $row = array();

            foreach ($rowItem as $key => $value) {
                if (is_string($key)) {
                    $index++;
                    if (count($result->columns) < $index) $result->columns[] = $key;
                    if (count($result->types) < $index) $result->types[] = $this->detectType($value);
                    $type = $result->types[$index - 1];
                    $row[] = $this->getValue($type, $value);
                }
            }

            $result->rows[] = $row;
        }

        return $result;
    }

    protected function executeNative($queryString, $result)
    {
        return $result;
    }

    public static function getDataAdapter($database)
    {
        switch ($database) {
            case StiDatabaseType::MySQL:
                return new StiMySqlAdapter();

            case StiDatabaseType::MSSQL:
                return new StiMsSqlAdapter();

            case StiDatabaseType::Firebird:
                return new StiFirebirdAdapter();

            case StiDatabaseType::PostgreSQL:
                return new StiPostgreSqlAdapter();

            case StiDatabaseType::Oracle:
                return new StiOracleAdapter();

            case StiDatabaseType::ODBC:
                return new StiOdbcAdapter();
        }

        return null;
    }

    public static function applyQueryParameters($query, $parameters, $escape)
    {
        $result = '';

        while (mb_strpos($query, '@') !== false) {
            $result .= mb_substr($query, 0, mb_strpos($query, '@'));
            $query = mb_substr($query, mb_strpos($query, '@') + 1);

            $parameterName = '';
            while (strlen($query) > 0) {
                $char = mb_substr($query, 0, 1);
                if (!preg_match('/[a-zA-Z0-9_-]/', $char)) break;

                $parameterName .= $char;
                $query = mb_substr($query, 1);
            }

            $replaced = false;
            foreach ($parameters as $key => $item) {
                if (strtolower($key) == strtolower($parameterName)) {
                    switch ($item->typeGroup) {
                        case 'number':
                            $result .= floatval($item->value);
                            break;

                        case 'datetime':
                            $result .= "'" . $item->value . "'";
                            break;

                        default:
                            $result .= "'" . ($escape ? addcslashes($item->value, "\\\"'") : $item->value) . "'";
                            break;
                    }

                    $replaced = true;
                }
            }

            if (!$replaced) $result .= '@' . $parameterName;
        }

        return $result . $query;
    }

    public function __construct()
    {
        $this->info = new StiConnectionInfo();
    }
}