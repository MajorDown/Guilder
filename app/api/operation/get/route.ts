import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import OperationModel from "@/tools/api/models/model.user";
import { Operation } from "@/types";

export async function GET(request: Request) {
  const {user} = await request.json();;
  console.log(`api/guild ~> Requète de récupération des membres de la guilde ${user}`);
  try {
    await databaseConnecter();
    const auth = request.headers.get('Authorization');
    const token = auth && auth.split(' ')[1];
    const isAuthentified = token ? await tokenChecker(token) : false;
    if (!isAuthentified) {
      console.log(`api/operation/get/${user} ~> ${user} a échoué son authentification`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }
    else {
      let operations: Operation[] = await OperationModel.find({
        $or: [
          { worker: user },
          { payer: user }
        ]
      }).lean();
      if (!operations[0]) return NextResponse.json(`Aucune opération trouvé concernant "${user}"`, { status: 204 });
      else return NextResponse.json("req", { status: 200 });
    }
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/operation/get/[user] ~> error :`, error);
      return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};