const nodemailer = require('nodemailer');

const USER_EMAIL = process.env.SMTP_USER || 'inscricaosenaioficial124@gmail.com';
const APP_PASSWORD = process.env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: USER_EMAIL,
        pass: APP_PASSWORD
    }
});

module.exports = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).send('Método não permitido. Use POST.');
    }


    if (!APP_PASSWORD) {
        return res.status(500).json({ message: 'Erro de configuração: Senha SMTP não definida.' });
    }

    try {

        const { name, surname, email, unit, course } = req.body;


        const linkHTML2 = `https://6sixfrosty.github.io/Tasks/cadastro/templates/DataEnrichment.html?` +
            `name=${encodeURIComponent(name)}` +
            `&surname=${encodeURIComponent(surname)}` +
            `&email=${encodeURIComponent(email)}` +
            `&unit=${encodeURIComponent(unit)}` +
            `&course=${encodeURIComponent(course)}`;

        const mailOptions = {
            from: USER_EMAIL,
            to: USER_EMAIL,
            subject: `[INSCRIÇÃO] ${name} ${surname} - ${course}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; max-width: 600px;">
                    <h2 style="color: #007bff;">Nova Inscrição Recebida!</h2>
                    <p><strong>Detalhes do Aluno:</strong></p>
                    <ul style="list-style-type: none; padding: 0;">
                        <li><strong>Nome Completo:</strong> ${name} ${surname}</li>
                        <li><strong>E-mail de Contato:</strong> <a href="mailto:${email}">${email}</a></li>
                        <li><strong>Unidade Escolhida:</strong> ${unit}</li>
                        <li><strong>Curso Desejado:</strong> ${course}</li>
                    </ul>
                    <hr>
                    <p><strong>Ação Necessária:</strong> Clique no link abaixo para processar e enriquecer os dados:</p>
                    <a href="${linkHTML2}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                        Processar Inscrição
                    </a>
                    <p style="margin-top: 20px;"><small>Link direto: ${linkHTML2}</small></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Inscrição enviada com sucesso! O e-mail foi enviado ao administrador.' });

    } catch (error) {
        console.error('Erro no Back-end ao processar a inscrição:', error);
        res.status(500).json({ success: false, message: 'Houve um erro no servidor ao enviar a inscrição.', error: error.message });
    }
};