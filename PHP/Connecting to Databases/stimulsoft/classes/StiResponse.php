<?php
# Stimulsoft.Reports.JS
# Version: 2023.2.2
# Build date: 2023.04.05
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

namespace Stimulsoft;

class StiResponse
{
    public static function json($result, $encode = false)
    {
        unset($result->object);
        $result = defined('JSON_UNESCAPED_SLASHES') ? json_encode($result, JSON_UNESCAPED_SLASHES) : json_encode($result);
        echo $encode ? str_rot13(base64_encode($result)) : $result;
    }
}