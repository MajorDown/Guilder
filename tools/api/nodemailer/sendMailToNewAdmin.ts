const Nodemailer = require('nodemailer');
import { Admin } from "@/types";

/**
 * Envoi un mail de bienvenue à un nouveau membre
 * 
 * @param {Admin} admin
 * @param {string} newPassword
 * @returns {Promise<boolean>}
 */
async function sendMailToNewAdmin(admin: Admin, newPassword: string) {
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
        to: admin.mail,
        subject: 'Bienvenue sur Agriguilder !',
        html: /*html*/`
            <div style="font-family: monospace">
                <h1 style="margin-left: 50px; margin-bottom: 30px">Bienvenue sur Agriguilder, l'application d'entraide pour les collectifs agricoles !</h1>
                <div style="margin: 0 auto">
                    <p>Bonjour ${admin.name},</p>
                    <p>Un administrateur de la guilde "${admin.guild}" vous a ajouté en tant que nouvel admin !</p>
                    <p>Toute nos félicitations, donc... et bienvenue au sein de Agriguilder !</p>
                </div>
                <p style="margin-top: 10px">voici les informations qui ont été saisi lors de votre inscription :</p>
                <ul>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre guilde : <strong>${admin.guild}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre nom : <strong>${admin.name}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre adresse mail : <strong>${admin.mail}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre numéro de téléphone : <strong>${admin.phone}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre mot de passe : <strong>${newPassword}</strong> (Pas de panique, vous pourrez le modifier à votre convenance une fois connecté à votre compte Agriguilder !)</p></li>
                </ul>
                <p style="margin-top: 10px">Vous pouvez dès à présent vous rendre sur votre compte en vous rendant à l'adressse <a href="https://agriguilder.com/connexion">https://agriguilder.com/connexion</a></p>
                <p>À bientôt sur Agriguilder !</p>
            </div>
            <p>PS : Ce mail est envoyé automatiquement, inutile d'y répondre.</p>
            <p>PPS : Si vous n'avez pas fais de demande d'inscription.. n'hésitez pas à nous répondre et nous le faire savoir, il s'agira probablement d'une erreur.</p>
        `
    };

    // ENVOI DU MAIL
    try {
        await transporter.sendMail(mailOptions);
        console.log('sendMailToNewAdmin ~> Email envoyé avec succès à', admin.mail);
        return true;
    } catch (error: any) {
        console.error('sendMailToNewAdmin ~> Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
}

export default sendMailToNewAdmin;