fetch('http://localhost:5000/clima')
  .then(response => response.json())
  .then(clima => {
    const dropdown = document.getElementById('dataDropdown');
    const info = document.getElementById('infoClima');

    // Preenche as opções com os dados
    clima.forEach(dia => {
      const option = document.createElement('option');
      option.value = dia.data;
      option.textContent = dia.data;
      dropdown.appendChild(option);
    });

    // Escuta mudanças na seleção
    dropdown.addEventListener('change', () => {
      const valorSelecionado = dropdown.value;

      if (!valorSelecionado) {
        info.innerHTML = '';
        info.style.display = 'none';
        return;
      }

      const selecionado = clima.find(d => d.data === valorSelecionado);

      if (!selecionado) {
        info.innerHTML = '<p>Dados não encontrados para a data selecionada.</p>';
        info.style.display = 'block';
        return;
      }

      // Exibe os dados formatados horizontalmente
      info.innerHTML = `
        <div style="display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
          <div style="text-align: center;">
            <i class="bi bi-thermometer-snow" style="font-size: 40px;"></i>
            <p>${selecionado.temp_min_C}°C</p>
          </div>
          <div style="text-align: center;">
            <i class="bi bi-thermometer-sun" style="font-size: 40px;"></i>
            <p>${selecionado.temp_max_C}°C</p>
          </div>
          <div style="text-align: center;">
            <i class="bi bi-cloud-drizzle" style="font-size: 40px;"></i>
            <p>${selecionado.precip_mm} mm</p>
          </div>
          <div style="text-align: center;">
            <i class="bi bi-water" style="font-size: 40px;"></i>
            <p>${selecionado.umidade_media_percent}%</p>
          </div>
        </div>
      `;
      info.style.display = 'block';
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os dados do clima:', error);
  });
