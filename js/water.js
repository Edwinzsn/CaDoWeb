export const water = {
  data: {
    temperature: 0,
    humidity: 0,
    volume: 0
  },
  isConnected: false,

  async fetchData() {
    const ip = localStorage.getItem('esp_ip');
    if (!ip) {
      console.warn('No se encontró IP del ESP32 en localStorage');
      this.isConnected = false;
      return;
    }

    try {
      const response = await fetch(`http://${ip}/data`, { cache: 'no-store' });
      if (!response.ok) throw new Error("ESP32 no responde");

      const json = await response.json();
      this.data = json;
      this.isConnected = true;

      const tempEl = document.getElementById('temperature');
      const humEl = document.getElementById('humidity');
      const volEl = document.getElementById('volume');

      if (tempEl) tempEl.textContent = `${json.temperature} °C`;
      if (humEl) humEl.textContent = `${json.humidity} %`;
      if (volEl) volEl.textContent = `${json.volume} L`;

    } catch (err) {
      console.error('Error al obtener datos del ESP32:', err);
      this.isConnected = false;
    }
  }
};
