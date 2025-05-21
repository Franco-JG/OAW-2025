<?php

require_once './vendor/autoload.php';

use SimplePie\SimplePie;

try {

    $feed = new SimplePie();
    $feed->enable_cache(false);

    $feed->set_feed_url('https://feed.perfplanet.com/');
    $feed->init();
    $feedName = $feed->get_title();
    echo 
    "
    <p>Feed Name: <strong>$feedName</strong></p>
    <p>Feed URL: https://feed.perfplanet.com/</p>
    ";
    $feed->__destruct();
    unset($feed);


} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>