import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import { UserMail, UserStatus } from "@/types";
import MemberModel from "@/tools/api/models/model.member";

export async function GET(request: Request, { params }: { params: { guild: string } }) {
  console.log(`api/guild/[guild] ~> Requète de récupération des membres de la guilde ${params.guild}`);
  try {
    await databaseConnecter();
    // AUTHENTIFICATION DE L'ADMIN
    const auth = request.headers.get('Authorization');
    const userToken = auth && auth.split(' ')[1];
    const userMail = request.headers.get('X-user-Email');
    const role = request.headers.get('X-role') as UserStatus;
    const isAuthentified = userToken ? await tokenChecker(role, userToken, userMail as UserMail) : false;
    if (!isAuthentified) {
        console.log(`api/guild/[guild] ~> echec de l'authentification de l'utilisateur ${userMail}`);
        return NextResponse.json("Non autorisé", { status: 401 });
    }
    // RECUPERATION DES MEMBRES
    let users = await MemberModel.find({guild: params.guild}).lean();
    if(!users[0]) {
      return NextResponse.json({ status: 204 });
    }
    const membersList = users.map((user) => ({
      ...user,
      password: null,
    }));
    return NextResponse.json(membersList, { status: 200 });
  } catch (error) {
  // SI ERREUR
    console.log("api/guild/[guild] ~> error :", error);
    return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};