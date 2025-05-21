<?php
/**
 * Clase News - Maneja las operaciones relacionadas con noticias RSS
 * Proporciona funcionalidades para obtener y buscar noticias en la base de datos
 */
class News {
    /** @var mysqli Conexión a la base de datos */
    private $conn;

    /**
     * Constructor de la clase News
     * @param mysqli $db Conexión a la base de datos
     */
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Obtiene todas las noticias ordenadas por un campo específico
     * @param string $orderBy Campo por el cual ordenar los resultados (por defecto: pub_date)
     * @return array Array asociativo con todas las noticias
     */
    public function getNews($orderBy = "pub_date") {
        // Lista de columnas permitidas
        $allowedColumns = ["title", "description", "pub_date", "created_at"];
        
        // Validar que la columna es segura
        if (!in_array($orderBy, $allowedColumns)) {
            $orderBy = "pub_date"; // Usar "pub_date" si el parámetro es inválido
        }
    
        // Ahora es seguro incluir `$orderBy`
        $sql = "SELECT * FROM news ORDER BY $orderBy ASC";
        $result = $this->conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    /**
     * Busca noticias por título o descripción
     * @param string $query Término de búsqueda
     * @return array Array asociativo con las noticias que coinciden con la búsqueda
     */
    public function searchNews($query) {
        if ($query === "") {
            return "La búsqueda no puede estar vacía";
        }
        $stmt = $this->conn->prepare("SELECT * FROM news WHERE title LIKE ? OR description LIKE ?");
        $search = "%$query%";
        $stmt->bind_param("ss", $search, $search);
        $stmt->execute();
        $result = $stmt->get_result();
        $response = $result->fetch_all(MYSQLI_ASSOC);
        return (!$response)? "Sin resultados" : $response;
    }

    public function addNews($feed_id, $title, $description, $link, $pub_date, $categories = null) {
        $stmt = $this->conn->prepare("
            INSERT INTO news (feed_id, title, description, link, pub_date, categories)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->bind_param("isssss", $feed_id, $title, $description, $link, $pub_date, $categories);
        return $stmt->execute();
    }

    // Método para verificar si el enlace ya existe
    public function linkExists($link) {
        $query = "SELECT 1 FROM news WHERE link = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $link);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0; // Retorna true si el enlace existe
    }

}
?>