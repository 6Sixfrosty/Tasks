const form = document.getElementById('form1');
const API_URL = '/api/enviar_email';

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("email").value,
        unit: document.getElementById("unit").value,
        course: document.getElementById("course").value
    };

    const submitButton = form.querySelector('.input_send');
    submitButton.value = 'Enviando...';
    submitButton.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok && result.success) {


            alert("Inscrição enviada para o seu e-mail com sucesso!\nAcesse sua caixa de entrada para mais informações, e realizar sua matrícula.");

            window.location.href = REDIRECT_URL;

            form.reset();

        } else {
            alert(`❌ Erro ao enviar inscrição: ${result.message || 'Erro desconhecido.'}`);
        }
    } catch (error) {
        alert('❌ Erro de conexão com o servidor. Verifique sua rede e tente novamente.');
        console.error('Erro de rede:', error);
    } finally {
        submitButton.value = 'Enviar Inscrição';
        submitButton.disabled = false;
    }
});