<?php

require_once "../models/News.php";

class NewsController {
    private $model;

    public function __construct($conn) {
        $this->model = new News($conn);
    }

    public function getNews($orderBy = 'pub_date') {
        return $this->model->getNews($orderBy);
    }

    public function searchNews($query) {
        return $this->model->searchNews($query);
    }

    public function linkExists($link) {
        return $this->model->linkExists($link);
    }

    public function addNews($feed_id, $title, $description, $link, $pub_date, $categories = null) {
        return $this->model->addNews($feed_id, $title, $description, $link, $pub_date, $categories);
    }

}
?>