import { NextResponse } from "next/server";
import mongoose from "mongoose";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import OperationModel from "@/tools/api/models/model.operation";
import UserModel from "@/tools/api/models/model.user";

/**
 * Gère la création d'une nouvelle opération dans la base de données.
 * Route POST, reçoit des données de type Opération et les utilise pour :
 * - mettre à jour les counter des membres respectifs;
 * - enregistrer l'opération
 *
 * @param {Request} request - La requête entrante contenant les données de type Operation.
 * @returns {NextResponse} - Une réponse indiquant le succès ou l'échec de la création de l'opération.
 */
export async function POST(request: Request) {
  const { declarationDate, date, worker, payer, points, nature } = await request.json();
  console.log(`api/operation/create ~> Tentative de création d'opération par ${worker}`);
  try {
    // CONNEXION A LA DB
    await databaseConnecter();
    // AUTHENTIFICATION
    const authHeader = request.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const isAuthentified = token ? await tokenChecker(token) : false;
    if (!isAuthentified) {
      console.log(`api/operation/create ~> ${worker} a échoué son authentification`);
      return NextResponse.json("Non autorisé", { status: 401 });
    }
    // DEMARRAGE DE LA TRANSACTION
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // MISE A JOUR DE WORKER ET PAYER
      const workerUser = await UserModel.findOne({ name: worker }).session(session);
      const payerUser = await UserModel.findOne({ name: payer }).session(session);
      if (!workerUser || !payerUser) {
        throw new Error("utilisateur(s) introuvable");
      }
      workerUser.counter += points;
      payerUser.counter -= points;
      await workerUser.save();
      await payerUser.save();
      // ENREGISTREMENT DE L'OPERATION
      const newOperation = new OperationModel({
        declarationDate,
        date,
        worker,
        payer,
        points,
        nature
      });
      await newOperation.save({ session });
      // FIN DE LA TRANSACTION
      await session.commitTransaction();
      console.log(`api/operation/create ~> Nouvelle opération déclarée par ${worker}`);
      return NextResponse.json(newOperation, { status: 200 });
    } 
    // GESTION DES ERREURS DE TRANSACTION
    catch (error) {
      await session.abortTransaction();
      throw error;
    }
    // FIN DE LA TRANSACTION
    finally {
      session.endSession();
    }
  }
  // GESTION DES ERREURS
  catch (error) {
    console.log("api/operation/create ~> error :", error);
    return NextResponse.json("Échec de la création de l'opération", { status: 500 });
  }
}
