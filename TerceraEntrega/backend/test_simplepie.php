<?php
require_once __DIR__ . '/vendor/autoload.php';

use function OAW\Backend\Utils\getFeedNameFromUrl;

$url = "https://www.yucatan.com.mx/feed";
$feedName = getFeedNameFromUrl($url);

echo "Feed Name: $feedName\n";
?>