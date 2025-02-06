const Nodemailer = require('nodemailer');
import { Member } from "@/types";

/**
 * Envoi un mail de bienvenue à un nouveau membre
 * 
 * @param {Member} member
 * @param {string} newPassword
 * @returns {Promise<boolean>}
 */
async function sendMailToNewMember(member: Member, newPassword: string) {
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
        to: member.mail,
        subject: 'Bienvenue sur Agriguilder !',
        html: /*html*/`
            <div style="font-family: monospace">
                <h1 style="margin-left: 50px; margin-bottom: 30px">Bienvenue sur Agriguilder, l'application d'entraide pour les collectifs agricoles !</h1>
                <div style="margin: 0 auto">
                    <p>Bonjour ${member.name},</p>
                    <p>Les administrateurs de la guilde "${member.guild}" vous ont ajouté en tant que nouveau membre !</p>
                    <p>Toute nos félicitations, donc... et bienvenue au sein de Agriguilder !</p>
                </div>
                <p style="margin-top: 10px">voici les informations qui ont été saisi lors de votre inscription :</p>
                <ul>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre guilde : <strong>${member.guild}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre nom : <strong>${member.name}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre adresse mail : <strong>${member.mail}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre numéro de téléphone : <strong>${member.phone}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre mot de passe : <strong>${newPassword}</strong> (Pas de panique, vous pourrez le modifier à votre convenance une fois connecté à votre compte Guilder !)</p></li>
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
        console.log('sendMailToNewMember ~> Email envoyé avec succès à', member.mail);
        return true;
    } catch (error: any) {
        console.error('sendMailToNewMember ~> Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
}

export default sendMailToNewMember;