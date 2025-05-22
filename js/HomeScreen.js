// ../js/HomeScreen.js

document.addEventListener('DOMContentLoaded', () => {
  const focoImage = document.getElementById('focoImage');
  const statusText = document.getElementById('statusText');
  const toggleButton = document.getElementById('toggleButton');
  const imageWrapper = document.getElementById('imageWrapper');
  const wifiButton = document.getElementById('wifiButton');

  // Aquí pones la IP del ESP32 — podrías tomarla de alguna variable PHP o input
  // Para simplificar, la pongo fija. Luego puedes hacer que venga de PHP, sesión o input.
  const espIp = '<?php echo $_SESSION["esp_ip"] ?? "192.168.1.68"; ?>';

  let focoEncendido = false;
  let loading = false;

  const setUI = () => {
    focoImage.src = focoEncendido ? '../assets/prendido.png' : '../assets/apagado.png';
    statusText.textContent = focoEncendido ? 'Encendida' : 'Apagada';
    toggleButton.textContent = loading ? 'Cambiando...' : focoEncendido ? 'Apagar' : 'Encender';
    toggleButton.disabled = loading;

    if (focoEncendido) {
      imageWrapper.classList.add('glow');
      toggleButton.classList.remove('button-on');
      toggleButton.classList.add('button-off');
    } else {
      imageWrapper.classList.remove('glow');
      toggleButton.classList.remove('button-off');
      toggleButton.classList.add('button-on');
    }
  };

  const fetchFocoStatus = async () => {
    try {
      const response = await fetch(`http://${espIp}/status`);
      if (!response.ok) throw new Error('Error en respuesta');
      const data = await response.json();
      focoEncendido = data.focos?.foco1 || false;
      setUI();
    } catch (error) {
      console.error('No se pudo obtener el estado del foco:', error);
      statusText.textContent = 'No se pudo conectar al dispositivo';
      toggleButton.disabled = true;
    }
  };

  const toggleFoco = async () => {
    loading = true;
    setUI();

    try {
      const newState = !focoEncendido;
      const response = await fetch(`http://${espIp}/control/foco1/${newState ? 'on' : 'off'}`);
      if (!response.ok) throw new Error('Error en comando');
      focoEncendido = newState;
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('No se pudo cambiar el estado del foco.');
    } finally {
      loading = false;
      setUI();
    }
  };

  toggleButton.addEventListener('click', toggleFoco);

  wifiButton.addEventListener('click', () => {
    window.location.href = 'WifiScreen.php'; // Cambia a tu pantalla de configuración WiFi
  });

  // Al cargar, obtener estado del foco
  fetchFocoStatus();
});
