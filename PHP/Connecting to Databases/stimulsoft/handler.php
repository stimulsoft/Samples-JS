<?php
# Stimulsoft.Reports.JS
# Version: 2023.1.7
# Build date: 2023.02.10
# License: https://www.stimulsoft.com/en/licensing/reports
?>
<?php

use Stimulsoft\StiDataHandler;

// Event handler classes and functions
require_once 'enums\StiDatabaseType.php';
require_once 'enums\StiDataCommand.php';
require_once 'classes\StiConnectionInfo.php';
require_once 'classes\StiDataRequest.php';
require_once 'classes\StiResult.php';
require_once 'classes\StiDataResult.php';
require_once 'classes\StiResponse.php';
require_once 'classes\StiDataHandler.php';

// Data adapters for supported database types
require_once 'StiDataAdapter.php';
require_once 'StiFirebirdAdapter.php';
require_once 'StiMsSqlAdapter.php';
require_once 'StiMySqlAdapter.php';
require_once 'StiOdbcAdapter.php';
require_once 'StiOracleAdapter.php';
require_once 'StiPostgreSqlAdapter.php';

// You can configure the security level as you required.
// By default is to allow any requests from any domains.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Engaged-Auth-Token');
header('Cache-Control: no-cache');

$handler = new StiDataHandler();
$handler->process();