import { NextResponse } from "next/server";
import mongoose from "mongoose";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import InterventionModel from "@/tools/api/models/model.intervention";
import MemberModel from "@/tools/api/models/model.member";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";

export async function POST(request: Request) {
    const {declarationDate, interventionDate, worker, payer, hours, options, description} = await request.json();
    console.log(`api/intervention/create ~> Tentative de déclaration d'intervention de  ${worker}`);
    // CONNEXION A LA DB
    await databaseConnecter();
    // CREATION DE LA SESSION
    const session = await mongoose.startSession();
    try {
        // AUTHENTIFICATION
        const memberMail = request.headers.get('X-user-Email');
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = memberMail && token ? await tokenChecker("member", token, memberMail) : false;
        if (!isAuthentified) {
          console.log(`api/intervention/create ~> ${memberMail} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        //DEBUT DE SESSION
        session.startTransaction();
        // CREATION DE L'INTERVENTION
        const newIntervention = new InterventionModel({
            declarationDate,
            interventionDate,
            worker,
            payer,
            hours,
            options,
            description,
            imagesUrls: []
        });
        newIntervention.save();
        // CALCUL DES POINTS
        const memberGuild = request.headers.get('X-user-Guild');        
        const guildConfig = await GuildConfigModel.findOne({guild: memberGuild});
        // EXTRACTION DES COEFFICIENTS POUR LES OPTIONS
        let coefsList = options.map((optionName: string) => {
            const optionConfig = guildConfig.config.find((option: {option: string, coef: number, enabled: boolean}) => option.option === optionName && option.enabled);
            return optionConfig ? optionConfig.coef : 0; // Retourne 0 si l'option n'est pas trouvée ou désactivée
        });
        // CALCUL DU TOTAL DES POINTS : hours + (hours*coef1) + (hours*coef2) + ...
        const totalPoints = coefsList.reduce((acc: number, coef: number) => acc + (hours * coef), hours);
        console.log("total des points :", totalPoints);
        // REDUIRE LE NOMBRE DE DECIMALES
        const interventionPoints = totalPoints.toFixed(2);        
        // AJOUT DES POINTS AU COMPTE DU WORKER
        const workerMember = await MemberModel.findOne({name: worker});
        "counter" in workerMember && (workerMember.counter += interventionPoints);
        workerMember.save();
        // RETRAIT DES POINTS DU COMPTE DU PAYER
        const payerMember = await MemberModel.findOne({name: payer});
        "counter" in payerMember && (payerMember.counter -= interventionPoints);
        payerMember.save();
        // FIN DE SESSION
        await session.commitTransaction();
        session.endSession();
        return NextResponse.json("nouvelle intervention déclarée :", { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        await session.abortTransaction();
        console.log("api/intervention/create ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}