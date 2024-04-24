import { NextResponse } from "next/server";
import mongoose from "mongoose";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import MemberModel from "@/tools/api/models/model.member";
import InterventionModel from "@/tools/api/models/model.intervention";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import { ConnectedMember, UserCounter } from "@/types";

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
        // CALCUL DES POINTS
        const memberGuild = request.headers.get('X-user-Guild');     
        const guildConfig = await GuildConfigModel.findOne({name: memberGuild});
        console.log("api/intervention/create ~> guildConfig trouvé :", guildConfig);
        // EXTRACTION DES COEFFICIENTS POUR LES OPTIONS
        let coefsList = options && options.length > 0 ? options.map((optionName: string) => {
            const optionConfig = guildConfig.config.find((option: {option: string, coef: number, enabled: boolean}) => option.option === optionName && option.enabled);
            return optionConfig ? optionConfig.coef : 0;
        }) : [];
        console.log("api/intervention/create ~> coefsList trouvé :", coefsList);
        // création de optionsList au format [{option: string, coef: number}] à partir de options et coefsList
        const optionsList = options && options.length > 0 ? options.map((option: string, index: number) => ({option, coef: coefsList[index]})) : [];
        console.log("api/intervention/create ~> optionsList généré :", optionsList);
        // CALCUL DU TOTAL DES POINTS
        const totalPoints = optionsList.length > 0 ? coefsList.reduce((acc: number, coef: number) => acc + (hours * coef), 0) : 0;
        // REDUIRE LE NOMBRE DE DECIMALES
        const interventionPoints = totalPoints.toFixed(2);        
        // CREATION DE L'INTERVENTION
        const newIntervention = new InterventionModel({
            declarationDate,
            interventionDate,
            worker,
            payer,
            hours,
            options: optionsList,
            description,
            imagesUrls: []
        });
        await newIntervention.save({ session: session });
        // AJOUT DES POINTS AU COMPTE DU WORKER
        let workerMember = await MemberModel.findOne({name: worker});
        workerMember.counter += parseFloat(interventionPoints);
        await workerMember.save({ session: session });
        // RETRAIT DES POINTS DU COMPTE DU PAYER
        let payerMember = await MemberModel.findOne({name: payer});
        payerMember.counter -= parseFloat(interventionPoints);
        await payerMember.save({ session: session });
        // FIN DE SESSION
        await session.commitTransaction();
        session.endSession();
        console.log("api/intervention/create ~> nouvelle intervention créé :", newIntervention);
        return NextResponse.json(workerMember.counter as UserCounter, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log("api/intervention/create ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}
