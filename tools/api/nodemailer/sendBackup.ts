const Nodemailer = require('nodemailer');
import { Member, Admin, Contestation, GuildConfig, Intervention } from "@/types";

type Backup = {
    admins: Admin[],
    members: Member[],
    guildsConfig: GuildConfig[],
    interventions: Intervention[],
    contestations: Contestation[],
}

/**
 * Envoi un mail avec le backup a l'adresse de récuperation 
 * 
 * @param {Member} member
 * @param {string} newPassword
 * @returns {Promise<boolean>}
 */
async function sendBackup(backup: Backup ) {
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
        to: process.env.BACKUP_EMAIL,
        subject: 'Backup de l\'application Agriguilder',
        html: /*html*/`
            <p>Voici le backup</p>
        `,
        attachments: [
            {
                filename: 'backup.json',
                content: JSON.stringify(backup, null, 2),
            },
        ],
    };

    // ENVOI DU MAIL
    try {
        await transporter.sendMail(mailOptions);
        console.log('sendBackup ~> Email envoyé avec succès');
        return true;
    } catch (error: any) {
        console.error('sendBackup ~> Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
}

export default sendBackup;