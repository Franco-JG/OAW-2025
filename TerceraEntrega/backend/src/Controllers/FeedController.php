<?php

namespace OAW\Backend\Controllers;

use OAW\Backend\Models\Feed;
use function OAW\Backend\Utils\getFeedNameFromUrl;

class FeedController {
    private $model;

    public function __construct($conn) {
        $this->model = new Feed($conn);
    }

    public function getFeeds() {
        return $this->model->getFeeds();
    }

    public function addFeed($data) {
        // Obtener el nombre del feed desde la URL
        $data['name'] = getFeedNameFromUrl($data['url']);
        return $this->model->addFeed($data);
    }
}
?>