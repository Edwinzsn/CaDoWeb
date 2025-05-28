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
  <meta charset="UTF-8">
  <title>MainScreen - Agua</title>
  <link rel="stylesheet" href="../css/MainScreen.css">
</head>
<body>
  <div class="container">
    <h1 class="title">Casa Domótica</h1>
    <p class="subtitle">Gestión inteligente del agua</p>

    <div class="flex-main">
      <div class="left-column">
        <div class="info-card">
          <img id="containerImage" src="../assets/100.png" class="container-image" alt="Nivel de agua">
          <p id="percentageText" class="percentage-text">100%</p>
        </div>

        <div class="water-info">
          <p class="info-text">Temperatura: <span id="temperature">-- °C</span></p>
          <p class="info-text">Humedad: <span id="humidity">-- %</span></p>
          <p class="info-text">Volumen de Agua: <span id="volume">-- L</span></p>
        </div>
      </div>

      <div class="right-column">
        <div class="button-row">
          <button id="btnPlanta" class="icon-button" disabled>
            <img src="../assets/planta_normal.jpg" class="button-icon" alt="Planta">
          </button>
          <button id="btnRegadera" class="icon-button" disabled>
            <img src="../assets/regadera_off.jpg" class="button-icon" alt="Regadera">
          </button>
          <button id="btnTaza" class="icon-button" disabled>
            <img src="../assets/taza_off.jpg" class="button-icon" alt="Taza">
          </button>
        </div>
      </div>
    </div>

    <a href="HomeScreen.php" class="light-button">Control de Luz</a>

    <p id="connection-status" class="status disconnected">ESP32 no conectado</p>
  </div>

  <script src="../js/water.js"></script>
  <script>
    function updateWaterUI() {
      const data = water.data;
      const connected = water.isConnected;

      // Actualizar datos
      document.getElementById("temperature").textContent = data.temperature + " °C";
      document.getElementById("humidity").textContent = data.humidity + " %";
      document.getElementById("volume").textContent = data.volume + " L";

      // Actualizar imagen del contenedor
      const percentage = Math.min(100, Math.round((data.volume / 10) * 100));
      document.getElementById("percentageText").textContent = percentage + "%";
      document.getElementById("containerImage").src = `../assets/${percentage}.png`;

      // Actualizar estado de conexión
      const status = document.getElementById("connection-status");
      status.textContent = connected ? "ESP32 conectado" : "ESP32 no conectado";
      status.classList.toggle("connected", connected);
      status.classList.toggle("disconnected", !connected);

      // Habilitar/deshabilitar botones
      const buttons = ["btnPlanta", "btnRegadera", "btnTaza"];
      buttons.forEach(id => {
        document.getElementById(id).disabled = !connected;
      });
    }

    // Llamar a fetchData periódicamente
    setInterval(() => {
      water.fetchData().then(updateWaterUI);
    }, 5000);

    // Primera carga
    water.fetchData().then(updateWaterUI);
  </script>
</body>
</html>
