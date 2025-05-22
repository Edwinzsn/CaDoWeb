window.onload = () => {
  const ssid = localStorage.getItem('wifiSSID');
  const ip = localStorage.getItem('wifiIP');

  if (ssid) document.getElementById('ssid').value = ssid;
  if (ip) {
    document.getElementById('ip').value = ip;
    document.getElementById('result').style.display = 'block';
    document.getElementById('saved-ip').innerText = `IP del ESP32: ${ip}`;
  }

  const toggleBtn = document.getElementById('toggle-password');
  toggleBtn.addEventListener('click', () => {
    const pwdInput = document.getElementById('password');
    pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
    toggleBtn.textContent = pwdInput.type === 'password' ? '👁️' : '🙈';
  });
};

function guardarWifi() {
  const ssid = document.getElementById('ssid').value;
  const password = document.getElementById('password').value;
  const ip = document.getElementById('ip').value;

  if (!ssid || !password || !ip) {
    alert('Por favor completa todos los campos');
    return;
  }

  localStorage.setItem('wifiSSID', ssid);
  localStorage.setItem('wifiPassword', password); // no se recomienda guardar contraseñas así
  localStorage.setItem('wifiIP', ip);
  localStorage.setItem('esp_ip', ip);

  document.getElementById('result').style.display = 'block';
  document.getElementById('saved-ip').innerText = `IP del ESP32: ${ip}`;
  alert('Datos guardados correctamente');
}
