import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import MemberModel from "@/tools/api/models/model.member";
import AdminModel from "@/tools/api/models/model.admin";
import passwordGenerator from "@/tools/api/passwordGenerator";
import { passwordCrypter } from "@/tools/api/passwordManager";
import sendMailWithNewPassword from "@/tools/api/nodemailer/sendMailWithNewPassword";

export async function PATCH(request: Request) {
    const {type, mail } = await request.json();
    console.log(`api/password/reinitialize ~> Demande de réinitialisation du password du compte ${mail}`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // CHOISIR ENTRE MEMBER OU ADMIN
        let UserToReset;
        if (type === "admin") UserToReset = await AdminModel.findOne({ mail });
        if (type === "member") UserToReset = await MemberModel.findOne({ mail });
        if (!UserToReset) {
            console.log(`api/password/reinitialize ~> aucun compte ${type} n'a été trouvé avec l'adresse ${mail}`);
            return NextResponse.json(`Aucun compte ${type} trouvé avec l'adresse mail ${mail}`, { status: 404 });
        }
        // GENERATION D'UN NOUVEAU PASSWORD
        const newPassword = passwordGenerator();
        // ENVOI DU PASSWORD PAR MAIL
        const isSended = await sendMailWithNewPassword(mail, type, newPassword);
        if (!isSended) {
            console.log(`api/password/reinitialize ~> Erreur lors de l'envoi du mail à ${mail}`);
            return NextResponse.json("Échec de l'envoi du mail de réinitialisation", { status: 500 });
        } else {
            // SAUVEGARDE DU NOUVEAU PASSWORD
            const newHashedPassword = await passwordCrypter(newPassword);
            UserToReset.password = newHashedPassword;
            UserToReset.save();
        }
        console.log(`api/password/reinitialize ~> ${mail} a réinitialisé son password`);
        return NextResponse.json("password réinitialisé !", { status: 200 });
    }
    catch (error) {
        console.log("api/password/reinitialize ~> error :", error);
        return NextResponse.json("Échec de la réinitialisation du password", { status: 500 });
    }
}