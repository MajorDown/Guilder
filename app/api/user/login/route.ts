import { NextResponse } from "next/server";
import UserModel from "@/tools/api/models/model.user";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenMaker } from "@/tools/api/tokenManager";
import { passwordChecker } from "@/tools/api/passwordManager";
import { ConnectedUser} from "@/types";

export const POST = async (request: Request) => {
  const { mail, password } = await request.json();
  console.log("api/user/login ~> Tentative de connection en cours :", mail);
  try {
    await databaseConnecter();
    // RECHERCHE DU MAIL DANS LA DB
    const userToCheck = await UserModel.findOne({mail: mail});
    if (!userToCheck) {
      console.log("api/user/login ~> Erreur de mail");
      return NextResponse.json("mail / password incorrect", { status: 400 });
    }
    // VALIDATION DU PASSWORD
    const isPasswordValid = passwordChecker(password, userToCheck.password);
    if (!isPasswordValid) {
      console.log("api/user/login ~> Erreur de password");
      return NextResponse.json("mail / password incorrect", { status: 400 });
    }
    // RENVOI DU USER VALIDE
    const token = tokenMaker(mail);
    const connectedUser: ConnectedUser = { 
      token: token, 
      mail: userToCheck.mail, 
      name: userToCheck.name, 
      guild: userToCheck.guild, 
      counter: userToCheck.counter,
      phone: userToCheck.phone
    };
    console.log("api/user/login ~> utilisateur connecté :", mail);
    return NextResponse.json(connectedUser, {status: 201});
  } catch (error) {
    console.log("api/user/login ~> error :", error);
    return NextResponse.json("failed to login", { status: 500 });
  }
};