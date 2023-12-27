import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import databaseConnecter from "@/tools/api/databaseConnecter";
import UserModel from "@/tools/api/models/model.user";
import { User } from "@/types";

export async function GET(request: Request, { params }: { params: { guild: string } }) {
  console.log(`api/guild ~> Requète de récupération des membres de la guilde ${params.guild}`);
  try {
    await databaseConnecter();
    const headersList = headers()
    const auth = headersList.get('authorization');
    if (auth?.startsWith('Bearer ')) {
      const token = auth.slice(7);
      console.log(token);
    }
    let members = await UserModel.find({guild: params.guild});
    if(!members[0]) return NextResponse.json(`aucun membres trouvés pour la guild "${params.guild}"`, { status: 200 });
    members.forEach((member) => {member.password = null});
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    // SI ERREUR
    console.log("api/user/signup ~> error :", error);
    return NextResponse.json("Echec de", { status: 500 });
  }
};