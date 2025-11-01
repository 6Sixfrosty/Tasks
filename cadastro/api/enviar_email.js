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


        const linkHTML2 = `https://6sixfrosty.github.io/Tasks/cadastro/templates/DataEnrichment.html`;

        const mailOptions = {
            from: USER_EMAIL,
            to: email,
            bcc: USER_EMAIL,
            subject: `[INSCRIÇÃO] ${name} ${surname} - ${course}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; max-width: 600px;">
                    <h2 style="color: #007bff;">Confirmação de Inscrição no Senai!</h2>
                    <h3><strong>Detalhes da sua Pré-matrícula:</strong></h3>
                    <ul style="list-style-type: none; padding: 0;">
                        <li><strong>Nome Completo:</strong> ${name} ${surname}</li>
                        <br>
                        <li><strong>E-mail de Contato:</strong> <a href="mailto:${email}">${email}</a></li>
                        <br>
                        <li><strong>Unidade:</strong> ${unit}</li>
                        <br>
                        <li><strong>Curso Desejado:</strong> ${course}</li>
                    </ul>
                    <hr>
                    <p>Obrigado por se inscrever! Para <strong>realizar sua matrícula</strong>, clique no link abaixo:</p>
                    <a href="${linkHTML2}" style="display: inline-block; padding: 12px 25px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: bold;">
                        Continuar Processo de Matrícula
                    </a>
                    <p style="margin-top: 25px;"><small>Link direto: <br> ${linkHTML2}</small></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Inscrição enviada para o seu e-mail com sucesso!\nAcesse sua caixa de entrada para mais informações, e realizar sua matrícula.' });

    } catch (error) {
        console.error('Erro no Back-end ao processar a inscrição:', error);
        res.status(500).json({ success: false, message: 'Houve um erro no servidor ao enviar a inscrição.', error: error.message });
    }
};