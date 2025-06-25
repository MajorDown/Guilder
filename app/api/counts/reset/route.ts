import databaseConnecter from "@/tools/api/databaseConnecter";
import InterventionModel from "@/tools/api/models/model.intervention";
import MemberModel from "@/tools/api/models/model.member";
import { NextRequest, NextResponse } from "next/server";
import { BodyRequestProps } from "@/tools/front/reinitGuildCounts";
import authentifier from "@/tools/api/authentifier";
import { passwordChecker } from "@/tools/api/passwordManager";

export async function POST(request: NextRequest) {
    const { reAskedPassword, guildToReset, resetInterventions }: BodyRequestProps = await request.json();
    console.log("api/counts/reset : tentative de réinitialisation des compteurs pour la guilde", guildToReset);
    
    try {
        await databaseConnecter();
        // VERIFICATION DE LA PRESENCE DE DONNEES
        if (!reAskedPassword || !guildToReset || resetInterventions === undefined) {
            console.error("api/counts/reset : données manquantes");
            return NextResponse.json("Données manquantes", { status: 400 });
        }
        // VERIFICATION DE LA PRESENCE DES HEADERS
        const adminMail = request.headers.get('X-Auth-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!adminMail || !token) {
            console.error("api/counts/reset : données d'authentification manquantes");
            return NextResponse.json("Données d'authentification manquantes", { status: 401 });
        }
        // VERIFICATION DE L'AUTHENTIFICATION
        const authResponse = await authentifier({
            model: 'admin', 
            userMail: adminMail, 
            token: token, 
            guildToCheck: guildToReset,}
        );
        if (!authResponse.authorized) {
            console.log(`api/counts/reset ~> ${authResponse.error}`);
            return NextResponse.json(authResponse.error, { status: 401 });
        }
        // VERIFICATION DU MOT DE PASSE REDEMANDE COTE FRONT
        const adminToCheck = await authResponse.checkedUser;
        if (!adminToCheck) {
            console.error("api/counts/reset : erreur lors de la vérification de l'admin avant le password redemandé");
            return NextResponse.json("Erreur lors de la vérification de l'admin", { status: 401 });
        }
        console.log("api/counts/reset : admin à vérifier", adminToCheck);
        console.log("api/counts/reset : password redemandé", reAskedPassword);
        const isPasswordValid = passwordChecker(reAskedPassword, adminToCheck.password);
        if (!isPasswordValid) {
            console.log("api/counts/reset ~> Erreur sur le password redemandé");
            return NextResponse.json("password incorrect", { status: 400 });
        }
        // RECHERCHE DES MEMBRES DE LA GUILDE
        const guildMembers = await MemberModel.find({ guild: guildToReset });
        if (!guildMembers || guildMembers.length === 0) {
            console.error("api/counts/reset : aucun membre trouvé pour la guilde", guildToReset);
            return NextResponse.json("Aucun membre trouvé pour la guilde", { status: 404 });
        }
        // REINITIALISATION DES COMPTEURS
        let resetCount = 0;
        for (const member of guildMembers) {
            member.counter = 0;
            await member.save();
            resetCount++;
        }
        console.log(`api/counts/reset : ${resetCount} compteurs réinitialisés pour la guilde ${guildToReset}`);
        // SUPPRESSION DES INTERVENTIONS SI DEMANDE
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
        // RENVOI DE LA REPONSE
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
