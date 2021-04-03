(() => {
    const init = () => {
      // CONSTANTES
      // [origem]: [destino]
      const DDD_MAP = {
        "011": ["016", "017", "018"],
        "016": ["011"],
        "017": ["011"],
        "018": ["011"],
      };
  
      /* pega elemento do select e adiciona as options */
      const selectOrigemDDD = document.getElementById("selectOrigemDDD");
      const selectDestinoDDD = document.getElementById("selectDestinoDDD");
      const inputTempo = document.getElementById("tempo");
      const inputPlano = document.getElementById("planoSelecionado");
      
      const DDD = Object.keys(DDD_MAP);
  
      // FUNÇÕES
      const createOption = (value) =>
        `<option value="${value}">${value}</option>`;
      const limpaSelect = (select) => (select.length = 0);
      //
      const initSelector = () => {
        selectOrigemDDD.innerHTML = [
          createOption("-- --"),
          DDD.map(createOption),
        ].join(",");
        selectOrigemDDD.addEventListener("change", selecionou);
      };
      initSelector();
  
      function selecionou() {
        limpaSelect(selectDestinoDDD);
        const DDD2 = DDD_MAP[selectOrigemDDD.value];
        selectDestinoDDD.innerHTML = [
          createOption("-- --"),
          ...DDD2.map(createOption),
        ].join(",");
      }
  
      /* Resultados */
      function resultadoComPlano() {
        let valorOrigemDDD = selectOrigemDDD.value;
        let valorDestinoDDD = selectDestinoDDD.value;
  
        const custo = {
          origem: {
            "016": 2.9,
            "017": 2.7,
            "018": 1.9,
          },
          destino: {
            "016": 1.9,
            "017": 1.7,
            "018": 0.9,
          },
        };
  
        const custoOrigem = custo.origem[valorOrigemDDD] || 0;
        const custoDestino = custo.destino[valorDestinoDDD] || 0;
  
        let valorTempo = inputTempo.value;
        let valorPlano = inputPlano.value;
  
        let custoMinuto = custoOrigem + custoDestino;
        console.log(custoMinuto);
        let custoSemPlano = valorTempo * custoMinuto;
        let limiteDoPlano = custoSemPlano - Number(valorPlano) * custoMinuto;
  
        let custoComFaleMais =
          Number(valorTempo) <= Number(valorPlano)
            ? 0
            : limiteDoPlano + limiteDoPlano * 0.1;
  
        document.getElementById("resultadoComPlanoFaleMais").innerHTML =
          "R$ " + parseFloat(custoComFaleMais).toFixed(2);
        document.getElementById("resultadoSemPlanoFaleMais").innerHTML =
          "R$ " + parseFloat(custoSemPlano).toFixed(2);
      }
  
      selectOrigemDDD.addEventListener("change", resultadoComPlano);
      selectDestinoDDD.addEventListener("change", resultadoComPlano);
      inputTempo.addEventListener("change", resultadoComPlano);
      inputPlano.addEventListener("change", resultadoComPlano);
    };
    init();
  })();
  