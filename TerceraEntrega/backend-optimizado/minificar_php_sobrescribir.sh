#!/bin/bash

# Lista de archivos PHP a minificar
php_files=(
"php_info.php"
"setup.php"
"test_connection.php"
"test_simplepie.php"
"config/database.php"
"routes/api.php"
"src/Controllers/FeedController.php"
"src/Controllers/NewsController.php"
"src/Models/Feed.php"
"src/Models/News.php"
"src/Services/FeedService.php"
"src/Utils/FeedUtils.php"
)

for file in "${php_files[@]}"; do
  if [ -f "$file" ]; then
    echo "Minificando $file..."
    php -w "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
  else
    echo "Archivo no encontrado: $file"
  fi
done

echo "¡Minificación completada y archivos sobrescritos!"