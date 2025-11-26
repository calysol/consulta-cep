const cep = document.querySelector('#cep');
const endereco = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const message = document.querySelector('#message');
const consultarButton = document.querySelector('#consultar');
const loading = document.querySelector('#loading');
const cepForm = document.querySelector('#cepForm');

consultarButton.addEventListener('click', async () => {
        
    if (!cepForm.checkValidity()) {
        cepForm.reportValidity();
        return;
        }
    
    try {
        const OnlyNumbers = /^[0-9]+$/;
        const cepValid = /^[0-9]{8}$/;

        if(!OnlyNumbers.test(cep.value) || !cepValid.test(cep.value)) {
            throw {cep_error:'CEP inválido'};
        }

        loading.style.display = 'block';
        const minLoadingDelay = 200;

        const hideLoading = () => {
            setTimeout(() => {
                loading.style.display = 'none';
            }, minLoadingDelay);
        };

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        if(!response.ok) {
            throw await response.json();
        }

        const responseCep = await response.json();
            endereco.value = responseCep.logradouro;
            bairro.value = responseCep.bairro;
            cidade.value = responseCep.localidade;

            hideLoading();

    } catch (error) {
    if (error?.cep_error) {
        message.textContent = error.cep_error;
        setTimeout(() => {
            message.textContent = '';
        }, 5000);
    }
    console.log(error);

    hideLoading();

    }
});