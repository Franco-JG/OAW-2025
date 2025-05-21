<?php
 $host = "localhost"; $user = "root"; $pass = ""; $dbname = "rss_feed_db"; $conn = new mysqli($host, $user, $pass, $dbname); if ($conn->connect_error) { die("Conexión fallida: " . $conn->connect_error); } $conn->set_charset("utf8"); ?>
