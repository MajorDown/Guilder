const Nodemailer = require("nodemailer");

export type ContactEmailData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
};

/**
 * Envoie un e-mail de contact à Agriguilder
 * 
 * @param {ContactEmailData} data - données du formulaire
 * @returns {Promise<boolean>} - succès ou échec
 */
async function sendContactMail(data: ContactEmailData): Promise<boolean> {
  const transporter = Nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMX_ADRESS,
      pass: process.env.GMX_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${data.firstname} ${data.lastname}" <${data.email}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Nouveau message de contact de ${data.firstname} ${data.lastname}`,
    html: /*html*/ `
      <div style="font-family: sans-serif; line-height: 1.6">
        <h2>Message de contact reçu</h2>
        <p><strong>Nom :</strong> ${data.firstname} ${data.lastname}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone}</p>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      </div>
      <p style="font-style: italic; font-size: 0.9em">Ce message a été envoyé automatiquement depuis le formulaire de contact Agriguilder.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("sendContactMail ~> Email envoyé avec succès.");
    return true;
  } catch (error: any) {
    console.error("sendContactMail ~> Échec de l'envoi :", error);
    return false;
  }
}

export default sendContactMail;
