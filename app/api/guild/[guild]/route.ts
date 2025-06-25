import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { UserStatus } from "@/types";
import MemberModel from "@/tools/api/models/model.member";
import authentifier from "@/tools/api/authentifier";

export async function GET(request: Request, { params }: { params: { guild: string } }) {
  console.log(`api/guild/[guild] ~> Requète de récupération des membres de la guilde ${params.guild}`);
  try {
    await databaseConnecter();
    // VERIFICATION DE LA PRESENCE DES DONNEES
    const auth = request.headers.get('Authorization');
    const userToken = auth && auth.split(' ')[1];
    const userMail = request.headers.get('X-user-Email');
    const role = request.headers.get('X-role') as UserStatus;
    if (!userMail || !role || !userToken) {
        console.log(`api/guild/[guild] ~> echec de l'authentification de l'utilisateur ${userMail}`);
        return NextResponse.json("Non autorisé", { status: 401 });
    }
    // VERIFICATION DE L'AUTHENTIFICATION
    const authResponse = await authentifier({
      model: role,
      token: userToken,
      userMail: userMail
    });
    if (!authResponse.authorized) {
      console.log(`api/guild/[guild] ~> ${authResponse.error}`);
      return NextResponse.json(authResponse.error, { status: 401 });
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