const Nodemailer = require('nodemailer');
import { Member } from "@/types";

/**
 * Envoi un mail avec le nouveau mot de passe
 * 
 * @param {Member} member
 * @param {string} newPassword
 * @returns {Promise<boolean>}
 */
async function sendMailWithNewPassword(mail: string, type: string, newPassword: string) {
    // CREATION DU TRANSPORTEUR NODEMAILER
    const transporter = Nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMX_ADRESS,
            pass: process.env.GMX_PASSWORD,
        },
    });

    // CREATION DES OPTIONS DU MAIL
    const mailOptions = {
        from: '"Agriguilder - Application de collaboration" <guilder.app@gmx.fr>',
        to: mail,
        subject: 'Agriguilder - réinitialisation du mot de passe',
        html: /*html*/`
            <div style="font-family: monospace">
                <h1 style="margin-left: 50px; margin-bottom: 30px">Réinitialisation de votre mot de passe pour Agriguilder</h1>
                <div style="margin: 0 auto">
                    <p>Bonjour,</p>
                    <p>Il semblerais que vous ayez effectué une requète pour récupérer votre mot de passe pour un compte <strong>${type}</strong></p>
                    <p>Par mesure de sécurité, Nous avons regénéré un mot de passe aléatoire que vous pourrez modifier une fois connecté sur Agriguilder.</p>
                </div>
                <p style="margin-top: 10px">voici le nouveau mot de passe : <strong>${newPassword}</strong></p>
                <p style="margin-top: 10px">Vous pouvez dès à présent l'utiliser et vous connecter en vous rendant à l'adressse <a href="https://agriguilder.com/connexion">https://agriguilder.com/connexion</a></p>
                <p>À bientôt sur Agriguilder !</p>
            </div>
            <p>PS : Ce mail est envoyé automatiquement, inutile d'y répondre.</p>
            <p>PPS : Si vous n'avez pas fais de demande de réinitialisation... n'hésitez pas à nous répondre et nous le faire savoir, il s'agira probablement d'une erreur.</p>
        `
    };

    // ENVOI DU MAIL
    try {
        await transporter.sendMail(mailOptions);
        console.log('sendMailwithNewPassword ~> Email envoyé avec succès à', mail);
        return true;
    } catch (error: any) {
        console.error('sendMailwithNewPassword ~> Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
}

export default sendMailWithNewPassword;