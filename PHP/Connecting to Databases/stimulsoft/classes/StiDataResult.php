<?php
# Stimulsoft.Reports.JS
# Version: 2023.1.7
# Build date: 2023.02.10
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

namespace Stimulsoft;

class StiDataResult extends StiResult
{
    public $types;
    public $columns;
    public $rows;
    public $count;

    public static function success($notice = null, $object = null)
    {
        $result = new StiDataResult();
        $result->success = true;
        $result->notice = $notice;
        $result->object = $object;

        $result->types = array();
        $result->columns = array();
        $result->rows = array();

        return $result;
    }
}