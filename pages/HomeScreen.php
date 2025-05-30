<?php
session_start();
if (!isset($_SESSION['user'])) {
  header('Location: ../index.php');
  exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Control de Luz - Casa Domótica</title>
  <link rel="stylesheet" href="../css/HomeScreen.css" />
</head>
<body>
  <div class="container">
    <div class="title-section">
      <h1>Iluminación</h1>
    </div>

    <div class="content">
      <!-- Columna izquierda con las imágenes de los focos -->
      <div class="left">
        <!-- Foco 1 -->
        <div class="image-wrapper" id="imageWrapper1">
          <img
            src="../assets/apagado.png"
            alt="Estado del foco 1"
            id="focoImage1"
            class="foco-image"
          />
        </div>

        <!-- Foco 2 -->
        <div class="image-wrapper" id="imageWrapper2">
          <img
            src="../assets/apagado.png"
            alt="Estado del foco 2"
            id="focoImage2"
            class="foco-image"
          />
        </div>

        <!-- Foco 3 -->
        <div class="image-wrapper" id="imageWrapper3">
          <img
            src="../assets/apagado.png"
            alt="Estado del foco 3"
            id="focoImage3"
            class="foco-image"
          />
        </div>
      </div>

      <!-- Columna derecha con el estado y botones -->
      <div class="right">
        <p class="status" id="statusText">Todos apagados</p>

        <!-- Botones para controlar los focos -->
        <button id="toggleButton1" class="button button-on">Encender</button>
        <button id="toggleButton2" class="button button-on">Encender</button>
        <button id="toggleButton3" class="button button-on">Encender</button>

        <!-- Botón para conectar al WiFi -->
        <button id="wifiButton" class="button button-alt">Conectar WiFi</button>
      </div>
    </div>
  </div>

  <script>
    const espIp = '<?php echo $_SESSION["esp_ip"] ?? "192.168.1.68"; ?>';
  </script>
  <script src="../js/HomeScreen.js"></script>
</body>
</html>
