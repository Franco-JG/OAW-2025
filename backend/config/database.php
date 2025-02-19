<?php
/**
 * Configuración de la conexión a la base de datos MySQL
 * Este archivo solo maneja la conexión.
 */

// Credenciales de la base de datos
$host = "localhost";        // Servidor de la base de datos
$user = "root";             // Usuario de MySQL
$pass = "";                 // Contraseña del usuario
$dbname = "rss_feed_db";    // Nombre de la base de datos

// Crear conexión con la base de datos
$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar si hay errores en la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Establecer el conjunto de caracteres a UTF-8
$conn->set_charset("utf8");
?>
