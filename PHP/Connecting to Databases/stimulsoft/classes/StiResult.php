<?php

namespace Stimulsoft;

class StiResult
{
    public $handlerVersion;
    public $adapterVersion;
    public $checkVersion = true;

    public $success = false;
    public $notice;
    public $object;

    public static function success($notice = null, $object = null)
    {
        $result = new StiResult();
        $result->success = true;
        $result->notice = $notice;
        $result->object = $object;

        return $result;
    }

    public static function error($notice = null)
    {
        $result = new StiResult();
        $result->success = false;
        $result->notice = $notice;

        return $result;
    }
}