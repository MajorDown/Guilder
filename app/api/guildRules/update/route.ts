import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import authentifier from "@/tools/api/authentifier";
import { GuildRules } from "@/types";

export async function PUT(request: Request) {
    const rules = await request.json();
    console.log(`api/guildConfig/update ~> Tentative de modification de guildConfig`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // VERIFICATION DE LA PRESENCE DE DONNEES
        const adminMail = request.headers.get('X-Auth-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const newRules = rules as GuildRules;
        if (!newRules || !adminMail || !token) {
            console.log(`api/guildConfig/update ~> données manquantes`);
            return NextResponse.json("Données manquantes", { status: 400 });
        }
        // VERIFICATION DE L'AUTHENTIFICATION
        const authResponse = await authentifier({
            model: 'admin', 
            userMail: adminMail, 
            token: token}
        );
        if (!authResponse.authorized) {
            console.log(`api/guildConfig/update ~> ${authResponse.error}`);
            return NextResponse.json(authResponse.error, { status: 401 });
        }
        // RECHERCHE DU GUILDCONFIG A MODIFIER
        const guildConfigToUpdate = await GuildConfigModel.findOne({ name: authResponse.checkedUser.guild });
        // MODIFICATION DU GUILDCONFIG
        guildConfigToUpdate.rules = newRules;
        guildConfigToUpdate.save();
        return NextResponse.json(guildConfigToUpdate, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/guildConfig/update ~> error :", error);
        return NextResponse.json("Échec de la modification du guildConfig", { status: 500 });
    }
}