import databaseConnecter from "@/tools/api/databaseConnecter";
import InterventionModel from "@/tools/api/models/model.intervention";
import MemberModel from "@/tools/api/models/model.member";
import { NextRequest, NextResponse } from "next/server";

export type ResetCountsProps = {
    guildToReset: string;
    resetInterventions: boolean;
}

export async function POST(request: NextRequest) {
    const { guildToReset, resetInterventions }: ResetCountsProps = await request.json();
    console.log("api/counts/reset : tentative de réinitialisation des compteurs pour la guilde", guildToReset);
    
    try {
        await databaseConnecter();

        if (!guildToReset || resetInterventions === undefined) {
            console.error("api/counts/reset : données manquantes");
            return NextResponse.json("Données manquantes", { status: 400 });
        }

        const adminMail = request.headers.get('X-Auth-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!adminMail || !token) {
            console.error("api/counts/reset : données d'authentification manquantes");
            return NextResponse.json("Données d'authentification manquantes", { status: 401 });
        }

        const guildMembers = await MemberModel.find({ guild: guildToReset });
        if (!guildMembers || guildMembers.length === 0) {
            console.error("api/counts/reset : aucun membre trouvé pour la guilde", guildToReset);
            return NextResponse.json("Aucun membre trouvé pour la guilde", { status: 404 });
        }

        let resetCount = 0;
        for (const member of guildMembers) {
            member.counts = {
                interventions: resetInterventions ? 0 : member.counts.interventions,
                messages: 0,
                reactions: 0,
                votes: 0,
                votesReactions: 0,
            };
            await member.save();
            resetCount++;
        }

        console.log(`api/counts/reset : ${resetCount} compteurs réinitialisés pour la guilde ${guildToReset}`);

        let deletedInterventionCount = 0;
        if (resetInterventions === true) {
            const guildMembersNames = guildMembers.map((member) => member.name);
            const deleteResult = await InterventionModel.deleteMany({
                worker: { $in: guildMembersNames },
                payer: { $in: guildMembersNames }
            });
            deletedInterventionCount = deleteResult.deletedCount ?? 0;
            console.log(`api/counts/reset : ${deletedInterventionCount} interventions supprimées pour la guilde ${guildToReset}`);
        }

        return NextResponse.json({
            message: "Réinitialisation réussie",
            resetCounts: resetCount,
            deletedInterventions: deletedInterventionCount,
        }, { status: 200 });

    } catch (error) {
        console.error("api/counts/reset : erreur lors de la réinitialisation des compteurs pour la guilde", guildToReset, error);
        return NextResponse.json({ error: "Erreur lors de la réinitialisation des compteurs" }, { status: 500 });
    }
}
