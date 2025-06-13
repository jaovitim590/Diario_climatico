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

          // Exibe os dados formatados
          info.innerHTML = `
            <p><strong>Temperatura Mínima:</strong> ${selecionado.temp_min_C}°C</p>
            <p><strong>Temperatura Máxima:</strong> ${selecionado.temp_max_C}°C</p>
            <p><strong>Precipitação:</strong> ${selecionado.precip_mm} mm</p>
            <p><strong>Umidade Média:</strong> ${selecionado.umidade_media_percent}%</p>
          `;
          info.style.display = 'block';
        });
      })
      .catch(error => {
        console.error('Erro ao carregar os dados do clima:', error);
      });