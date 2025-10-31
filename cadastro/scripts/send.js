// Arquivo: ../scripts/send.js
const form = document.getElementById('form1');
// URL da sua função Serverless no Vercel:
// No desenvolvimento, use '/api/enviar_email'. Após deploy, o Vercel cuida do domínio.
const API_URL = '/api/enviar_email'; 

form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o envio tradicional

    // 1. Coletar os dados do formulário
    const formData = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("email").value,
        unit: document.getElementById("unit").value,
        course: document.getElementById("course").value
    };
    
    // Desabilitar o botão e mostrar feedback visual enquanto envia
    const submitButton = form.querySelector('.input_send');
    submitButton.value = 'Enviando...';
    submitButton.disabled = true;

    // 2. Enviar os dados como JSON para o Back-end
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
            alert('✅ Inscrição enviada com sucesso! O administrador foi notificado.');
            form.reset(); // Limpa o formulário
        } else {
            // Exibir erro retornado do servidor
            alert(`❌ Erro ao enviar inscrição: ${result.message || 'Erro desconhecido.'}`);
        }
    } catch (error) {
        // Exibir erro de rede/conexão
        alert('❌ Erro de conexão com o servidor. Verifique sua rede e tente novamente.');
        console.error('Erro de rede:', error);
    } finally {
        // Reabilitar o botão, independente do resultado
        submitButton.value = 'Enviar Inscrição';
        submitButton.disabled = false;
    }
});