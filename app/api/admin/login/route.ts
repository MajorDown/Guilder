import { NextResponse } from "next/server";
import AdminModel from "@/tools/api/models/model.admin";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenMaker } from "@/tools/api/tokenManager";
import { passwordChecker } from "@/tools/api/passwordManager";
import { ConnectedAdmin} from "@/types";

export const POST = async (request: Request) => {
  const { mail, password } = await request.json();
  console.log("api/admin/login ~> Tentative de connection en cours :", mail);
  try {
    await databaseConnecter();
    // RECHERCHE DU MAIL DANS LA DB
    const adminToCheck = await AdminModel.findOne({mail: mail});
    if (!adminToCheck) {
      console.log("api/admin/login ~> Erreur de mail");
      return NextResponse.json("mail / password incorrect", { status: 400 });
    }
    // VALIDATION DU PASSWORD
    const isPasswordValid = passwordChecker(password, adminToCheck.password);
    if (!isPasswordValid) {
      console.log("api/admin/login ~> Erreur de password");
      return NextResponse.json("mail / password incorrect", { status: 400 });
    }
    // RENVOI DU USER VALIDE
    const token = tokenMaker(mail);
    const connectedAdmin: ConnectedAdmin = { 
      token: token, 
      mail: adminToCheck.mail, 
      name: adminToCheck.name, 
      guild: adminToCheck.guild, 
      phone: adminToCheck.phone
    };
    console.log("api/admin/login ~> utilisateur connecté :", mail);
    return NextResponse.json(connectedAdmin, {status: 201});
  } catch (error) {
    console.log("api/admin/login ~> error :", error);
    return NextResponse.json("failed to login", { status: 500 });
  }
};