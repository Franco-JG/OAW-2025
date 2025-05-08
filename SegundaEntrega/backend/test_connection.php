<?php
require_once 'config/database.php';

if ($conn->ping()) {
    echo "¡Conexión exitosa! La base de datos está respondiendo.\n";
    echo "Información de la conexión:\n";
    echo "Servidor: " . $conn->host_info . "\n";
    echo "Versión del servidor: " . $conn->server_info . "\n";
    // error_log(print_r($conn, true));
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>