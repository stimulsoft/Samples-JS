<?php
require_once 'stimulsoft/helper.php';

error_reporting(0);
header("Access-Control-Allow-Origin: *");


$handler = new StiHandler();
$handler->registerErrorHandlers();
$handler->process();