<?php
require_once '../controllers/FeedController.php';
require_once '../controllers/NewsController.php';
require_once '../vendor/autoload.php';

use SimplePie\SimplePie;

class FeedService {
    private $conn;
    private $feedController;
    private $newsController;

    public function __construct($conn) {
        $this->conn = $conn;
        $this->feedController = new FeedController($conn);
        $this->newsController = new NewsController($conn);
    }

    public function fetchAndSaveNews() {
        $feeds = $this->feedController->getFeeds(); // Obtiene los feeds desde la DB

        foreach ($feeds as $feed) {
            $feed_id = $feed['id'];
            $url = $feed['url'];

            //Creamos una instancia de <SimplePie></SimplePie>
            $pie = new SimplePie();
            $pie->enable_cache(false);
            $pie->set_feed_url($url);
            $pie->init();

            if ($pie->error()) {
                error_log("Error al obtener el feed: " . $pie->error());
                continue; // Si hay un error con el feed, saltarlo
            }

            foreach ($pie->get_items() as $item) {
                $link = $item->get_permalink();
            
                // Verificar si el enlace ya existe
                if ($this->newsController->linkExists($link)) {
                    error_log("El enlace ya existe: $link");
                    continue; // Saltar este ítem y pasar al siguiente
                }
            
                // Si el enlace no existe, procesar el ítem
                $title = $item->get_title();
                $description = $item->get_description();
                $sanitized_description = $item->sanitize($description, SimplePie::CONSTRUCT_XHTML);
                $pub_date = $item->get_date('Y-m-d H:i:s');
            
                // Obtener categorías
                $categories = [];
                if ($item_categories = $item->get_categories()) {
                    foreach ($item_categories as $category) {
                        $label = $category->get_label();
                        if (!empty($label)) {
                            $categories[] = $label;
                        }
                    }
                }
                $categories_json = !empty($categories) ? json_encode($categories, JSON_UNESCAPED_UNICODE) : null;
            
                // Insertar la noticia en la base de datos
                if (!$this->newsController->addNews($feed_id, $title, $sanitized_description, $link, $pub_date, $categories_json)) {
                    error_log("Error al insertar la noticia: $link");
                }
            }

            // Liberar recursos
            $pie->__destruct();
            unset($pie);
        }

        return true;
    }
}
?>
