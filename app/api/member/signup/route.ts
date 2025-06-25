import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "@/tools/api/models/model.member";
import { passwordCrypter } from "@/tools/api/passwordManager";
import { tokenChecker } from "@/tools/api/tokenManager";
import generatePassword from "@/tools/api/passwordGenerator";
import sendMailToNewMember from "@/tools/api/nodemailer/sendMailToNewMember";
import { Member } from "@/types";

export async function POST(request: Request) {
    const { name, mail, phone, guild, initialCount } = await request.json();
    console.log(
        "api/member/signup ~> Tentative d'inscription via l'adresse mail :",
        mail
    );
    try {
        await databaseConnecter();
        // VERIFICATION DU MAIL DE L'ADMIN
        const mailToCheck = request.headers.get('X-Auth-Email');
        const adminToCheck = await AdminModel.findOne({mail: mailToCheck});
        if (!adminToCheck) {
            console.log(`api/member/signup ~> aucun admin n'existe avec l'adresse mail ${mail}`);
            return NextResponse.json("Adresse mail incorrect", { status: 400 });
        }
        // AUTHENTIFICATION DE L'ADMIN
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker("admin", token, adminToCheck.mail) : false;
        if (!isAuthentified) {
            console.log(`api/member/signup ~> l'admin de la guilde ${guild} a échoué son authentification`);
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // VERIFICATION SI L'UTILISATEUR EXISTE DEJA
        const existingMember = await MemberModel.findOne({
            mail: mail,
        });
        if (existingMember) {
        console.log(
            "api/member/signup ~> Utilisateur déjà enregistré via l'adresse :",
            mail
        );
        return NextResponse.json("Cet utilisateur existe déjà", { status: 400 });
        }
        // CREATION ET CRYPTAGE D'UN NOUVEAU MOT DE PASSE ALEATOIRE
        const newPassword = generatePassword();
        const cryptedNewPassword = await passwordCrypter(newPassword);
        // CREATION DE L'UTILISATEUR
        const newMemberData: Member = {
            name: name,
            mail: mail,
            phone: phone,
            guild: guild,
            password: cryptedNewPassword,
            counter: initialCount,           
        }
        const newMember = new MemberModel(newMemberData);
        // SAUVEGARDE DU NOUVEAU MEMBRE
        await newMember.save();
        console.log(
            "api/member/signup ~> Nouveau membre enregistré :",
            newMember.name
        );
        // ENVOI DU MOT DE PASSE PAR MAIL
        console.log(
            "api/member/signup ~> Envoi d'une notification à l'utilisateur via l'adresse :",
            mail
        );
        const isMailSent = await sendMailToNewMember(newMember, newPassword);
        if (!isMailSent) {
            console.log(
            "api/member/signup ~> Echec de l'envoi du mail à l'adresse :",
            mail
            );
            return NextResponse.json("Echec de l'envoi du mail", { status: 500 });
        }
        // RENVOI DU NOUVEAU MEMBRE
        return NextResponse.json(newMember, { status: 201 });
      } catch (error) {
        // SI ERREUR
        console.log("api/user/signup ~> error :", error);
        return NextResponse.json("failed to signup", { status: 500 });
      }
}