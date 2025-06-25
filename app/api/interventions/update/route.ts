import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import ContestationModel from "@/tools/api/models/model.contestation";
import MemberModel from "@/tools/api/models/model.member";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import InterventionModel from "@/tools/api/models/model.intervention";
import interventionCalculator from "@/tools/interventionCalculator";
import { Intervention } from "@/types";

export async function PUT(request: Request) {
    const updatedContestation = await request.json();
    console.log(`api/interventions/update ~> Traitement de la contestation ${updatedContestation.contestationDate}`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // AUTHENTIFICATION
        const adminMail = request.headers.get('X-admin-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const isAuthentified = token && adminMail? await tokenChecker("admin", token, adminMail) : false;
        if (!isAuthentified) {
            console.log(`api/interventions/update ~> ${adminMail} a échoué son authentification`);
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // SI LA CONTESTATION EST "ACCEPTEE"
        if (updatedContestation.adminConclusion === "accordé") {
            // ANNULATION DES POINTS DES ANCIENS WORKER ET PAYER
            const initialIntervention = await InterventionModel.findOne(
                { declarationDate: updatedContestation.contestedIntervention.declarationDate }
                );
            const initialPoints = interventionCalculator(initialIntervention);
            // SI L'ANCIEN WORKER EXISTE, RETIRER INITIALPOINTS
            const exWorker = await MemberModel.findOneAndUpdate(
                { name: initialIntervention.worker },
                { $inc: { counter: -initialPoints } },
                { new: true }
            );
            if (!exWorker) {
                return NextResponse.json({ message: `L'ancien worker ${initialIntervention.worker} n'existe pas.` }, { status: 404 });
            }
            console.log("exWorker", exWorker);
            // SI L'ANCIEN PAYER EXISTE, AJOUTER INITIALPOINTS
            const exPayer = await MemberModel.findOneAndUpdate(
                { name: initialIntervention.payer },
                { $inc: { counter: initialPoints } },
                { new: true }
            );
            if (!exPayer) {
                return NextResponse.json({ message: `L'ancien payer ${initialIntervention.payer} n'existe pas.` }, { status: 404 });
            }
            console.log("exPayer", exPayer);
            // CALCUL DES NOUVEAUX POINTS
            const guildConfig = await GuildConfigModel.findOne({ name: updatedContestation.guild });
            if (!guildConfig) {
                return NextResponse.json({ message: `La guilde ${updatedContestation.guild} n'existe pas.` }, { status: 404 });
            }
            const correctedIntervention: Intervention = {
                declarationDate: updatedContestation.contestedIntervention.declarationDate,
                interventionDate: updatedContestation.contestedIntervention.interventionDate,
                worker: updatedContestation.contestedIntervention.worker,
                payer: updatedContestation.contestedIntervention.payer,
                hours: updatedContestation.contestedIntervention.hours,
                options: updatedContestation.contestedIntervention.options.map((option: string) => {
                    const foundOption = guildConfig.config.find((configOption: {option: string, coef: number}) => configOption.option === option);
                    return foundOption ? { option: foundOption.option, coef: foundOption.coef } : { option: option, coef: 0 };
                }),
                description: updatedContestation.contestedIntervention.description,
                imagesUrls: updatedContestation.contestedIntervention.imagesUrls
            }                       
            const finalPoints = interventionCalculator(correctedIntervention);
            // MISE À JOUR DES POINTS POUR LE NOUVEAU WORKER
            const newWorker = await MemberModel.findOneAndUpdate(
                { name: updatedContestation.contestedIntervention.worker },
                { $inc: { counter: finalPoints } },
                { new: true }
            );
            if (!newWorker) {
                return NextResponse.json({ message: `Le nouveau worker ${updatedContestation.contestedIntervention.worker} n'existe pas.` }, { status: 404 });
            }
            console.log("newWorker", newWorker);
            // MISE À JOUR DES POINTS POUR LE NOUVEAU PAYER
            const newPayer = await MemberModel.findOneAndUpdate(
                { name: updatedContestation.contestedIntervention.payer },
                { $inc: { counter: -finalPoints } },
                { new: true }
            );
            if (!newPayer) {
                return NextResponse.json({ message: `Le nouveau payer ${updatedContestation.contestedIntervention.payer} n'existe pas.` }, { status: 404 });
            }
            console.log("newPayer", newPayer);
            // MISE À JOUR DE L'INTERVENTION
            const newOptions = updatedContestation.contestedIntervention.options.map(
                (option: string) => {
                    const foundOption = guildConfig.config.find((configOption: {option: string, coef: number}) => configOption.option === option);
                    return foundOption ? { option: option, coef: foundOption.coef } : { option: option, coef: 1 };
            });
            const interventionToUpdate = await InterventionModel.findOneAndUpdate(
                { declarationDate: updatedContestation.contestedIntervention.declarationDate },
                {$set: {
                    interventionDate: updatedContestation.contestedIntervention.interventionDate,
                    worker: updatedContestation.contestedIntervention.worker,
                    payer: updatedContestation.contestedIntervention.payer,
                    hours: updatedContestation.contestedIntervention.hours,
                    description: updatedContestation.contestedIntervention.description,
                    imagesUrls: updatedContestation.contestedIntervention.imagesUrls,
                    options: newOptions
                }},
                { new: true }
            );
            if (!interventionToUpdate) {
                return NextResponse.json({ message: `L'intervention ${updatedContestation.contestedIntervention.declarationDate} n'existe pas.` }, { status: 404 });
            }
            console.log(`interventionToUpdate: ${interventionToUpdate}`);
        }
        // MISE A JOUR DE LA CONTESTATION
        let contestationToUpdate = await ContestationModel.findOneAndUpdate(
            { contestationDate: updatedContestation.contestationDate },
            { 
              contestedIntervention: updatedContestation.contestedIntervention,
              adminConclusion: updatedContestation.adminConclusion,
              adminMessage: updatedContestation.adminMessage
            },
            { new: true }
        );
        if (!contestationToUpdate) {
            return NextResponse.json({ message: `La contestation ${updatedContestation.contestationDate} n'existe pas.` }, { status: 404 });
        }
        console.log(`api/interventions/update ~> ${adminMail} a accepté de modifier l'intervention ${contestationToUpdate}`);
        return NextResponse.json(contestationToUpdate, { status: 200 });        
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/interventions/update ~> error :", error);
        return NextResponse.json("Échec de la modification de l'intervention", { status: 500 });
    }
}