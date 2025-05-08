<?php
/**
 * Script para crear la base de datos y las tablas si no existen.
 * Se ejecuta una sola vez.
 */

// Conectar sin seleccionar base de datos
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "rss_feed_db";

// Conectar a MySQL (sin seleccionar DB aún)
$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Crear la base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci";
if (!$conn->query($sql)) {
    die("Error al crear la base de datos: " . $conn->error);
}

echo "Base de datos '$dbname' creada correctamente.\n";

// Seleccionar la base de datos
$conn->select_db($dbname);

// Crear tabla `feeds`
$sql = "CREATE TABLE IF NOT EXISTS feeds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci";

if (!$conn->query($sql)) {
    die("Error al crear la tabla feeds: " . $conn->error);
}

// Crear tabla `news`
$sql = "CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feed_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255) NOT NULL,
    pub_date DATETIME,
    categories JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (feed_id) REFERENCES feeds(id) ON DELETE CASCADE,
    UNIQUE KEY unique_link (link)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci";

if (!$conn->query($sql)) {
    die("Error al crear la tabla news: " . $conn->error);
}

echo "Tablas creadas correctamente.\n";

// Cerrar conexión
$conn->close();
?>
