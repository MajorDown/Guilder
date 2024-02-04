import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "@/tools/api/models/model.member";
import { passwordCrypter } from "@/tools/api/passwordManager";
import { Member, NewMemberInfos } from "@/types";
import { tokenChecker } from "@/tools/api/tokenManager";
import generatePassword from "@/tools/api/passwordGenerator";
import sendMailToNewMember from "@/tools/api/nodemailer/sendMailToNewMember";

export async function POST(request: Request) {
    const { name, mail, phone, guild } = await request.json() as NewMemberInfos;
    console.log(
        "api/member/signup ~> Tentative d'inscription via l'adresse mail :",
        mail
    );
    try {
        await databaseConnecter();
        // AUTHENTIFICATION DE L'ADMIN
        const adminToCheck = await AdminModel.findOne({guild: guild});
        if (!adminToCheck) {
            console.log(`api/member/signup ~> l'admin de la guilde ${guild} est introuvable dans la db`);
            return NextResponse.json("Non autorisé", { status: 401 });      
        }
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker("admin", token, adminToCheck.mail) : false;
        if (!isAuthentified) {
            console.log(`api/member/signup ~> l'admin de la guilde ${guild} a échoué son authentification`);
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // VERIFICATION SI L'UTILISATEUR EXISTE DEJA
        const existingMember: Member | null = await MemberModel.findOne({
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
        const newMember = new MemberModel({
            name: name,
            mail: mail,
            phone: phone,
            guild: guild,
            password: cryptedNewPassword,
            counter: 0
        });
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
        // SAUVEGARDE DU NOUVEAU MEMBRE
        await newMember.save();
        console.log(
            "api/member/signup ~> Nouveau membre enregistré :",
            newMember.name
        );
        // RENVOI DU NOUVEAU MEMBRE
        return NextResponse.json(newMember, { status: 201 });
      } catch (error) {
        // SI ERREUR
        console.log("api/user/signup ~> error :", error);
        return NextResponse.json("failed to signup", { status: 500 });
      }
}