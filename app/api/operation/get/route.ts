import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import OperationModel from "@/tools/api/models/model.operation";
import UserModel from "@/tools/api/models/model.user";

export async function GET(request: Request) {
  console.log(`api/operation/get ~> Requète de récupération des opérations de l'utilisateur`);
  try {
    const url = new URL(request.url);
    const userName = url.searchParams.get("user");
    if (!userName) {
      console.log(`api/operation/get ~> Nom d'utilisateur manquant dans la requète`);
      return NextResponse.json("Nom d'utilisateur manquant", { status: 400 });
    }
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const userToCheck = await UserModel.findOne({name: userName});
    console.log("api/operation/get ~>", userToCheck);
    if (!userToCheck) {
      console.log(`api/operation/get ~> ${userName} n'existe pas dans la db`);
      return NextResponse.json("Non autorisé", { status: 401 });      
    }
    const authHeader = request.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const isAuthentified = token ? await tokenChecker(token, userToCheck.mail) : false;
    if (!isAuthentified) {
      console.log(`api/operation/get ~> ${userName} a échoué son authentification`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }
    // RECUPERATION DES DONNNES
    console.log("OperationModel : ", OperationModel);
    const operationsList = await OperationModel.find({
      $or: [{ worker: userName }, { payer: userName }]
    }).lean();
    console.log(operationsList);
    return NextResponse.json(operationsList, { status: 200 });
  }
  catch (error) {
    // SI ERREUR
      console.log(`api/operation/get/[user] ~> error :`, error);
      return NextResponse.json("Echec de chargement des membres de la guilde", { status: 500 });
  }
};