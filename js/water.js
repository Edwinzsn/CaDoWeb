export const water = {
  data: {
    temperature: 0,
    humidity: 0,
    volume: 0
  },
  isConnected: false,

  async fetchData() {
    const ip = localStorage.getItem('esp_ip');
    if (!ip) return;

    try {
      const response = await fetch(`http://${ip}/data`);
      if (!response.ok) throw new Error("ESP32 no responde");

      const json = await response.json();
      this.data = json;
      this.isConnected = true;

      // Actualiza el DOM (opcional, o lo puedes hacer en MainScreen.php)
      document.getElementById('temperature').textContent = `${json.temperature} °C`;
      document.getElementById('humidity').textContent = `${json.humidity} %`;
      document.getElementById('volume').textContent = `${json.volume} L`;

    } catch (err) {
      console.error('Error al obtener datos del ESP32:', err);
      this.isConnected = false;
    }
  }
};
