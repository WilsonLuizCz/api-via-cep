document.addEventListener('DOMContentLoaded', () => {

  const dadosSalvos = localStorage.getItem('dadosFormulario');
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);

    document.getElementById('cep').value = dados.cep || '';
    document.getElementById('logradouro').value = dados.logradouro || '';
    document.getElementById('bairro').value = dados.bairro || '';
    document.getElementById('cidade').value = dados.cidade || '';
    document.getElementById('estado').value = dados.estado || '';
    document.getElementById('numero').value = dados.numero || '';
  }

  
  document.getElementById('cep').addEventListener('blur', (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value.replace(/\D/g, '');

    if (cepInformado.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('logradouro').value = data.logradouro || '';
          document.getElementById('bairro').value = data.bairro || '';
          document.getElementById('cidade').value = data.localidade || '';
          document.getElementById('estado').value = data.uf || '';
        } else {
          alert('CEP não encontrado.');
        }
      })
      .catch(error => console.log('Erro ao buscar o CEP:', error));
  });

  
  const form = document.getElementById('form-cep');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = {
      cep: document.getElementById('cep').value,
      logradouro: document.getElementById('logradouro').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value,
      numero: document.getElementById('numero').value
    };

    localStorage.setItem('dadosFormulario', JSON.stringify(dados));
    alert('Dados salvos localmente!');
  });
})