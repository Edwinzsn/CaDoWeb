document.addEventListener('DOMContentLoaded', () => {
  const focoImage = document.getElementById('focoImage');
  const statusText = document.getElementById('statusText');
  const toggleButton = document.getElementById('toggleButton');
  const imageWrapper = document.getElementById('imageWrapper');
  const wifiButton = document.getElementById('wifiButton');

  if (!focoImage || !statusText || !toggleButton || !imageWrapper || !wifiButton) {
    console.error("Elementos HTML no encontrados");
    return;
  }

  const espIp = localStorage.getItem("esp_ip") || "192.168.1.68";

  let focoEncendido = false;
  let loading = false;

  const setUI = () => {
    focoImage.src = focoEncendido ? '../assets/prendido.png' : '../assets/apagado.png';
    statusText.textContent = focoEncendido ? 'Encendida' : 'Apagada';
    toggleButton.textContent = loading ? 'Cambiando...' : (focoEncendido ? 'Apagar' : 'Encender');
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
      const response = await fetch(`http://${espIp}/status`, { cache: "no-store" });
      if (!response.ok) throw new Error('Error en la respuesta del dispositivo');
      const data = await response.json();
      focoEncendido = !!data.focos?.foco1;
      setUI();
    } catch (error) {
      console.error('No se pudo obtener el estado del foco:', error);
      statusText.textContent = 'No se pudo conectar al dispositivo';
      toggleButton.disabled = true;
    }
  };

  const toggleFoco = async () => {
    if (loading) return; // Evitar doble click
    loading = true;
    setUI();

    try {
      const newState = !focoEncendido;
      const response = await fetch(`http://${espIp}/control/foco1/${newState ? 'on' : 'off'}`);
      if (!response.ok) throw new Error('Error en el comando al dispositivo');
      focoEncendido = newState;
      statusText.textContent = 'Estado actualizado';
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
    window.location.href = 'WifiScreen.php';
  });

  fetchFocoStatus();
});
