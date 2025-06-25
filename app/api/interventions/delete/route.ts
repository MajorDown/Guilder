import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import ContestationModel from "@/tools/api/models/model.contestation";
import MemberModel from "@/tools/api/models/model.member";
import InterventionModel from "@/tools/api/models/model.intervention";
import interventionCalculator from "@/tools/interventionCalculator";

export async function DELETE(request: Request) {
    console.log(`api/interventions/delete ~> Traitement de la suppression`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // AUTHENTIFICATION
        const adminMail = request.headers.get('X-admin-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const contestationDate = request.headers.get('X-contestation');
        const isAuthentified = token && adminMail && contestationDate ? await tokenChecker("admin", token, adminMail) : false;
        if (!isAuthentified) {
            return NextResponse.json("Non autorisé", { status: 401 });
        }
        // RECHERCHE DE LA CONTESTATION
        const contestation = await ContestationModel.findOne({ contestationDate: contestationDate });
        if (!contestation) {
            return NextResponse.json({ message: `La contestation ${contestationDate} n'existe pas.`, status: 404 });
        }
        // RECHERCHE DE L'INTERVENTION CONTESTEE
        const intervention = await InterventionModel.findOne({ declarationDate: contestation.contestedIntervention.declarationDate });
        if (!intervention) {
            return NextResponse.json({ message: `L'intervention liée à la contestation ${contestationDate} n'existe pas.`, status: 404 });
        }
        // MISE A JOUR DES POINTS DES MEMBRES
        const points = interventionCalculator(intervention);
        await MemberModel.findOneAndUpdate(
            { name: intervention.worker },
            { $inc: { counter: -points } }
        );
        await MemberModel.findOneAndUpdate(
            { name: intervention.payer },
            { $inc: { counter: points } }
        );
        // SUPPRESSION DE L'INTERVENTION
        await InterventionModel.findOneAndDelete({ declarationDate: contestation.contestedIntervention.declarationDate });
        // MAJ DE LA CONTESTATION
        let updatedContestation = await ContestationModel.findOneAndUpdate(
            { contestationDate: contestationDate },
            { adminConclusion: 'accordé', adminMessage: `intervention supprimé`},
            { new: true }
        );
        return NextResponse.json({ message: 'Intervention supprimée avec succès', status: 200 });        
    } catch (error) {
        return NextResponse.json({ message: "Échec de la suppression de l'intervention ", status: 500 });
    }
}
