<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Configuración WiFi</title>
  <link rel="stylesheet" href="../css/wifi.css">
</head>
<body>
  <div class="container">
    <h1 class="title">Configuración WiFi</h1>

    <div class="horizontal-wrapper">
      <div class="card">
        <input type="text" id="ssid" placeholder="Nombre de red (SSID)" />

        <div class="password-container">
          <input type="password" id="password" placeholder="Contraseña" />
          <button id="toggle-password">
            👁️
          </button>
        </div>

        <input type="text" id="ip" placeholder="IP del ESP32 (ej. 192.168.1.68)" />

        <button class="save-btn" onclick="guardarWifi()">Guardar</button>
      </div>

      <div id="result" class="result-container" style="display: none;">
        <h3>Configuración guardada</h3>
        <p id="saved-ip">IP del ESP32: </p>
      </div>
    </div>
  </div>

  <script src="../js/wifi.js"></script>
</body>
</html>
