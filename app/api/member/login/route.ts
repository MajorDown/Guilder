import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import MemberModel from "@/tools/api/models/model.member";
import { tokenMaker } from "@/tools/api/tokenManager";
import { passwordChecker } from "@/tools/api/passwordManager";
import { ConnectedMember} from "@/types";

export const POST = async (request: Request) => {
  const { mail, password } = await request.json();
  console.log("api/member/login ~> Tentative de connection en cours :", mail);
  try {
    await databaseConnecter();
    // RECHERCHE DU MAIL DANS LA DB
    const memberToCheck = await MemberModel.findOne({mail: mail});
    if (!memberToCheck) {
      console.log("api/member/login ~> Erreur de mail");
      return NextResponse.json("mail / password incorrect", { status: 400 });
    }
    // VALIDATION DU PASSWORD
    const isPasswordValid = passwordChecker(password, memberToCheck.password);
    if (!isPasswordValid) {
      console.log("api/member/login ~> Erreur de password");
      return NextResponse.json("mail / password incorrect", { status: 400 });
    }
    // GENERATION DU TOKEN
    const token = tokenMaker(mail);
    // RENVOI DU USER VALIDE
    const connectedMember: ConnectedMember = { 
      token: token, 
      mail: memberToCheck.mail, 
      name: memberToCheck.name, 
      guild: memberToCheck.guild, 
      phone: memberToCheck.phone,
      counter: memberToCheck.counter
    };
    console.log("api/member/login ~> utilisateur connecté :", mail);
    return NextResponse.json(connectedMember, {status: 201});
  } catch (error) {
    console.log("api/member/login ~> error :", error);
    return NextResponse.json("failed to login", { status: 500 });
  }
};