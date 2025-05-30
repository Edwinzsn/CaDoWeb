document.addEventListener('DOMContentLoaded', () => {
  // Obtener elementos HTML
  const focoImages = [
    document.getElementById('focoImage1'),
    document.getElementById('focoImage2'),
    document.getElementById('focoImage3')
  ];
  const statusText = document.getElementById('statusText');
  const toggleButtons = [
    document.getElementById('toggleButton1'),
    document.getElementById('toggleButton2'),
    document.getElementById('toggleButton3')
  ];
  const imageWrappers = [
    document.getElementById('imageWrapper1'),
    document.getElementById('imageWrapper2'),
    document.getElementById('imageWrapper3')
  ];
  const wifiButton = document.getElementById('wifiButton');

  // Comprobamos si los elementos están presentes
  if (focoImages.some(img => !img) || !statusText || toggleButtons.some(btn => !btn) || imageWrappers.some(wrapper => !wrapper) || !wifiButton) {
    console.error("Elementos HTML no encontrados");
    return;
  }

  const espIp = localStorage.getItem("esp_ip") || "192.168.1.68";
  let focoStates = [false, false, false];  // Estados de los focos (foco1, foco2, foco3)
  let loading = false;

  // Función para actualizar la interfaz de usuario
  const setUI = () => {
    focoImages.forEach((image, index) => {
      // Usar la misma imagen para todos los focos, se actualiza según el estado
      image.src = focoStates[index] ? '../assets/prendido.png' : '../assets/apagado.png';
      imageWrappers[index].classList.toggle('glow', focoStates[index]);
      
      // Actualizamos el texto del botón según el estado
      toggleButtons[index].textContent = loading ? 'Cambiando...' : (focoStates[index] ? 'Apagar' : 'Encender');
      toggleButtons[index].disabled = loading;
      
      // Cambiar estilo del botón, activar/desactivar animación solo en el foco correspondiente
      toggleButtons[index].classList.toggle('button-off', focoStates[index]);
      toggleButtons[index].classList.toggle('button-on', !focoStates[index]);
    });

    // Actualizar el estado global
    const allOn = focoStates.every(state => state);
    statusText.textContent = allOn ? 'Todos encendidos' : 'Algunos apagados';
  };

  // Función para obtener el estado de los focos desde el dispositivo
  const fetchFocoStatus = async () => {
    try {
      const response = await fetch(`http://${espIp}/status`, { cache: "no-store" });
      if (!response.ok) throw new Error('Error en la respuesta del dispositivo');
      const data = await response.json();

      // Actualizar los estados de los focos desde la respuesta del servidor
      focoStates = [!!data.focos?.foco1, !!data.focos?.foco2, !!data.focos?.foco3];
      setUI();
    } catch (error) {
      console.error('No se pudo obtener el estado de los focos:', error);
      statusText.textContent = 'No se pudo conectar al dispositivo';
      toggleButtons.forEach(button => button.disabled = true);
    }
  };

  // Función para cambiar el estado de un foco
  const toggleFoco = async (focoIndex) => {
    if (loading) return; // Evitar cambios rápidos (doble clic)
    loading = true;
    setUI();

    try {
      const newState = !focoStates[focoIndex];
      const response = await fetch(`http://${espIp}/control/foco${focoIndex + 1}/${newState ? 'on' : 'off'}`);
      if (!response.ok) throw new Error('Error en el comando al dispositivo');

      focoStates[focoIndex] = newState; // Actualizamos el estado local
      setUI();
    } catch (error) {
      console.error('Error al cambiar estado del foco:', error);
      alert('No se pudo cambiar el estado del foco.');
    } finally {
      loading = false;
      setUI();
    }
  };

  // Asociamos el evento de click a cada botón de foco
  toggleButtons.forEach((button, index) => {
    button.addEventListener('click', () => toggleFoco(index));
  });

  // Botón para ir a la pantalla de conexión Wi-Fi
  wifiButton.addEventListener('click', () => {
    window.location.href = 'WifiScreen.php';
  });

  // Obtener el estado inicial de los focos
  fetchFocoStatus();
});
