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
      <div class="left">
        <div class="image-wrapper" id="imageWrapper">
          <img
            src="../assets/apagado.png"
            alt="Estado del foco"
            id="focoImage"
            class="foco-image"
          />
        </div>
      </div>

      <div class="right">
        <p class="status" id="statusText">Apagada</p>

        <button id="toggleButton" class="button button-on">Encender</button>
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
