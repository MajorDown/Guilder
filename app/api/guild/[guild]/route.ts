import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import UserModel from "@/tools/api/models/model.user";
import { tokenChecker } from "@/tools/api/tokenManager";
import { MembersList, UsersList } from "@/types";

export async function GET(request: Request, { params }: { params: { guild: string } }) {
  console.log(`api/guild ~> Requète de récupération des membres de la guilde ${params.guild}`);
  try {
    await databaseConnecter();
    const auth = request.headers.get('Authorization');
    const token = auth && auth.split(' ')[1];
    const isAuthentified = token ? await tokenChecker(token) : false;
    if (!isAuthentified) {
        console.log(`api/guild ~> Requète de récupération des membres de la guilde ${params.guild}`);
        return NextResponse.json("Non autorisé", { status: 401 });
    }
    else {
      let users: UsersList = await UserModel.find({guild: params.guild}).lean();
      if(!users[0]) {
        return NextResponse.json(`Aucun membres trouvés pour la guilde "${params.guild}"`, { status: 204 });
      }
      else {
        const membersList: MembersList = users.map((user) => ({
          ...user,
          password: null,
        }));
        return NextResponse.json(membersList, { status: 200 });
      }
    }
    } catch (error) {
    // SI ERREUR
      console.log("api/guild/[guild] ~> error :", error);
      return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};