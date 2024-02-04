import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import { UserMail } from "@/types";
import MemberModel from "@/tools/api/models/model.member";

export async function GET(request: Request, { params }: { params: { guild: string } }) {
  console.log(`api/guild/[guild] ~> Requète de récupération des membres de la guilde ${params.guild}`);
  try {
    await databaseConnecter();
    // AUTHENTIFICATION DE L'ADMIN
    const auth = request.headers.get('Authorization');
    const adminToken = auth && auth.split(' ')[1];
    const adminMail = request.headers.get('X-Admin-Email');
    const isAuthentified = adminToken ? await tokenChecker("admin", adminToken, adminMail as UserMail) : false;
    if (!isAuthentified) {
        console.log(`api/guild/[guild] ~> Requète de récupération des membres de la guilde ${params.guild}`);
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