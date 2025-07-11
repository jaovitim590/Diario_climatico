fetch('frontend/clima.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro ao carregar os dados do clima: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(clima => {
    console.log('Dados do clima carregados do arquivo local:', clima);

    const dropdown = document.getElementById('dataDropdown');
    const info = document.getElementById('infoClima');

    // Limpa e adiciona a opção inicial
    dropdown.innerHTML = '<option value="">Selecione uma data</option>';

    // Preenche o dropdown com as datas disponíveis
    clima.forEach(dia => {
      const option = document.createElement('option');
      option.value = dia.data;
      option.textContent = dia.data;
      dropdown.appendChild(option);
    });

    // Evento ao selecionar uma data
    dropdown.addEventListener('change', () => {
      const valorSelecionado = dropdown.value;

      if (!valorSelecionado) {
        info.innerHTML = '';
        info.classList.remove('show');
        return;
      }

      const selecionado = clima.find(d => d.data === valorSelecionado);

      if (!selecionado) {
        info.innerHTML = '<p>Dados não encontrados para a data selecionada.</p>';
        info.classList.add('show');
        return;
      }

      const formatTextForHTML = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      };

      const analiseFormatada = formatTextForHTML(selecionado.analise);

      info.innerHTML = `
        <div class="clima-resumo-grid">
          <div class="clima-item">
            <i class="bi bi-thermometer-snow"></i>
            <p>${selecionado.temp_min_C}°C</p>
          </div>
          <div class="clima-item">
            <i class="bi bi-thermometer-sun"></i>
            <p>${selecionado.temp_max_C}°C</p>
          </div>
          <div class="clima-item">
            <i class="bi bi-cloud-drizzle"></i>
            <p>${selecionado.precip_mm} mm</p>
          </div>
          <div class="clima-item">
            <i class="bi bi-water"></i>
            <p>${selecionado.umidade_media_percent}%</p>
          </div>
        </div>

        <div class="clima-secao-texto">
          <h4>Nota Climática:</h4>
          <p><strong>${selecionado.texte}</strong></p>
        </div>

        <div class="clima-secao-texto">
          <h4>Análise Detalhada:</h4>
          <p>${analiseFormatada}</p>
        </div>
      `;

      info.classList.add('show');
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os dados do clima:', error);
    const info = document.getElementById('infoClima');
    info.innerHTML = '<p style="color: red; text-align: center;">Não foi possível carregar os dados do clima. Verifique se o arquivo "clima.json" está na pasta correta e se você está usando um servidor local.</p>';
    info.classList.add('show');
  });
