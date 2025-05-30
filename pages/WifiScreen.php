<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Configuración WiFi</title>
  <link rel="stylesheet" href="../css/wifi.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <div class="container">
    <h1 class="title">Configuración WiFi</h1>

    <div class="horizontal-wrapper">
      <div class="card">
        <label for="ssid" class="sr-only">Nombre de red (SSID)</label>
        <input type="text" id="ssid" placeholder="Nombre de red (SSID)" autocomplete="wifi-network" />

        <div class="password-container">
          <label for="password" class="sr-only">Contraseña</label>
          <input type="password" id="password" placeholder="Contraseña" autocomplete="current-password" />
          <button type="button" id="toggle-password" aria-label="Mostrar u ocultar contraseña">👁️</button>
        </div>

        <label for="ip" class="sr-only">IP del ESP32</label>
        <input type="text" id="ip" placeholder="IP del ESP32 (ej. 192.168.1.68)" autocomplete="off" />

        <button type="button" class="save-btn" onclick="guardarWifi()">Guardar</button>
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
