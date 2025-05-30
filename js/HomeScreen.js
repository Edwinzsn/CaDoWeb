document.addEventListener('DOMContentLoaded', () => {
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

  const espIp = localStorage.getItem("esp_ip") || "192.168.1.68";
  let focoStates = [false, false, false];
  let loadingStates = [false, false, false];

  const setUI = () => {
    focoImages.forEach((image, index) => {
      image.src = focoStates[index] ? '../assets/prendido.png' : '../assets/apagado.png';
      imageWrappers[index].classList.toggle('glow', focoStates[index]);

      toggleButtons[index].textContent = loadingStates[index] ? 'Cambiando...' : (focoStates[index] ? 'Apagar' : 'Encender');
      toggleButtons[index].disabled = loadingStates[index];
      toggleButtons[index].classList.toggle('button-off', focoStates[index]);
      toggleButtons[index].classList.toggle('button-on', !focoStates[index]);
    });

    const allOn = focoStates.every(state => state);
    statusText.textContent = allOn ? 'Todos encendidos' : 'Algunos apagados';
  };

  const fetchFocoStatus = async () => {
    try {
      const response = await fetch(`http://${espIp}/status`, { cache: "no-store" });
      if (!response.ok) throw new Error('Error en la respuesta del dispositivo');
      const data = await response.json();

      focoStates = [!!data.focos?.foco1, !!data.focos?.foco2, !!data.focos?.foco3];
      setUI();
    } catch (error) {
      console.error('No se pudo obtener el estado de los focos:', error);
      statusText.textContent = 'No se pudo conectar al dispositivo';
      toggleButtons.forEach(button => button.disabled = true);
    }
  };

  const toggleFoco = async (focoIndex) => {
    if (loadingStates[focoIndex]) return;

    loadingStates[focoIndex] = true;
    setUI();

    try {
      const newState = !focoStates[focoIndex];
      const response = await fetch(`http://${espIp}/control/foco${focoIndex + 1}/${newState ? 'on' : 'off'}`);
      if (!response.ok) throw new Error('Error en el comando al dispositivo');

      focoStates[focoIndex] = newState;
    } catch (error) {
      console.error('Error al cambiar estado del foco:', error);
      alert('No se pudo cambiar el estado del foco.');
    } finally {
      loadingStates[focoIndex] = false;
      setUI();
    }
  };

  toggleButtons.forEach((button, index) => {
    button.addEventListener('click', () => toggleFoco(index));
  });

  wifiButton.addEventListener('click', () => {
    window.location.href = 'WifiScreen.php';
  });

  fetchFocoStatus();
});
