document.addEventListener('DOMContentLoaded', () => {
  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
    });
  }
});

function validarIP(ip) {
  // Expresión regular válida para IPv4
  const regexIP = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return regexIP.test(ip);
}

function guardarWifi() {
  const ssid = document.getElementById('ssid')?.value.trim() || '';
  const password = document.getElementById('password')?.value.trim() || '';
  const ip = document.getElementById('ip')?.value.trim() || '';

  if (!ip || !validarIP(ip)) {
    alert('Por favor ingresa una IP válida del ESP32.');
    return;
  }

  // Guardar en localStorage
  localStorage.setItem('esp_ip', ip);
  localStorage.setItem('esp_ssid', ssid);
  localStorage.setItem('esp_password', password);

  const savedIpEl = document.getElementById('saved-ip');
  if (savedIpEl) {
    savedIpEl.textContent = `IP del ESP32: ${ip}`;
  }

  const resultDiv = document.getElementById('result');
  if (resultDiv) {
    resultDiv.style.display = 'block';
  }

  setTimeout(() => {
    window.location.href = 'MainScreen.php'; // o 'HomeScreen.php'
  }, 2000);
}
