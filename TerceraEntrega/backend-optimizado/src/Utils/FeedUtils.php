<?php
namespace OAW\Backend\Utils; use SimplePie\SimplePie; function getFeedNameFromUrl($url) { $feed = new SimplePie(); $feed->enable_cache(false); $feed->set_feed_url($url); $feed->init(); if ($feed->error()) { echo 'Error al cargar el feed: ' . $feed->error()."\n"; exit; } return $feed->get_title(); } ?>
