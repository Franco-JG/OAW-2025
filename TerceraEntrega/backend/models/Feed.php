<?php

// Clase Feed - Maneja las operaciones CRUD para feeds RSS
class Feed {
    /* @var mysqli Conexión a la base de datos */
    private $conn;

    /** 
     * Constructor de la clase Feed
     * @param mysqli $db Conexión a la base de datos
     */
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Obtiene todos los feeds ordenados por fecha de creación
     * @return array Array asociativo con todos los feeds
     */
    public function getFeeds() {
        $sql = "SELECT * FROM feeds ORDER BY created_at DESC";
        $result = $this->conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Agrega un nuevo feed a la base de datos
     * @param string $url URL del feed RSS a agregar
     * @return bool true si la inserción fue exitosa, false en caso contrario
     */
    public function addFeed($data) {
        $stmt = $this->conn->prepare("INSERT INTO feeds (url, name) VALUES (?, ?)");
        $stmt->bind_param("ss", $data['url'], $data['name']);
        return $stmt->execute();
    }

    
}
?>
