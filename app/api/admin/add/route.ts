import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import { passwordCrypter } from "@/tools/api/passwordManager";
import generatePassword from "@/tools/api/passwordGenerator";
import sendMailToNewAdmin from "@/tools/api/nodemailer/sendMailToNewAdmin";
import authentifier from "@/tools/api/authentifier";
import { Admin } from "@/types";

export async function POST(request: Request) {
    const { name, mail, phone, guild } = await request.json();
    console.log("api/admin/add ~> Tentative d'inscription via l'adresse mail :", mail);
    try {        
        // CONNEXION A LA DB
        await databaseConnecter();
        // VERIFICATION DE LA PRESENCE DE DONNEES
        const adminMail = request.headers.get('X-admin-Mail');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        if (!name || !mail || !phone || !guild || !adminMail || !token) {
            console.log(`api/admin/add ~> données manquantes`);
            return NextResponse.json("Données manquantes", { status: 400 });
        }
        // VERIFICATION DE L'AUTHENTIFICATION
        const authResponse = await authentifier({
            model: 'admin', 
            userMail: adminMail, 
            token: token, 
            guildToCheck: guild}
        );
        if (!authResponse.authorized) {
            console.log(`api/admin/add ~> ${authResponse.error}`);
            return NextResponse.json(authResponse.error, { status: 401 });
        }
        // VERIFICATION SI L'ADMIN EXISTE DEJA
        const existingAdmin = await AdminModel.findOne({
            mail: mail,
        });
        if (existingAdmin) {
            console.log("api/admin/add ~> admin déjà enregistré via l'adresse :", mail);
            return NextResponse.json("Cet admin existe déjà", { status: 400 });
        }
        // CREATION ET CRYPTAGE D'UN NOUVEAU MOT DE PASSE ALEATOIRE
        const newPassword = generatePassword();
        const cryptedNewPassword = await passwordCrypter(newPassword);
        // CREATION DE L'UTILISATEUR
        const newAdminData: Admin = {
            name: name,
            mail: mail,
            phone: phone,
            guild: guild,
            password: cryptedNewPassword,          
        }
        const newAdmin = new AdminModel(newAdminData);
        // ENVOI DU MOT DE PASSE PAR MAIL
        console.log("api/admin/add ~> Envoi d'une notification à l'admin via l'adresse :", mail);
        const isMailSent = await sendMailToNewAdmin(newAdmin, newPassword);
        if (!isMailSent) {
            console.log("api/admin/add ~> Echec de l'envoi du mail à l'adresse :", mail);
            return NextResponse.json("Echec de l'envoi du mail", { status: 500 });
        }
        // SAUVEGARDE DU NOUVEAU MEMBRE
        await newAdmin.save();
        console.log("api/admin/add ~> Nouvel admin enregistré :", newAdmin.name);
        // RENVOI DU NOUVEAU MEMBRE
        return NextResponse.json(newAdmin, { status: 201 });
      } catch (error) {
        // SI ERREUR
        console.log("api/admin/add ~> error :", error);
        return NextResponse.json("failed to add new admin", { status: 500 });
      }
}