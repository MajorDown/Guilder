import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import authentifier from "@/tools/api/authentifier";

export async function PUT(request: Request) {
    const newguildConfig = await request.json();
    console.log(`api/guildConfig/update ~> Tentative de modification de guildConfig`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // VERIFICATION DE LA PRESENCE DE DONNEES
        const adminMail = request.headers.get('X-Auth-Email');
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const guildName = newguildConfig.name;
        if (!newguildConfig || !adminMail || !token || !guildName) {
            console.log(`api/guildConfig/update ~> données manquantes`);
            return NextResponse.json("Données manquantes", { status: 400 });
        }
        // VERIFICATION DE L'AUTHENTIFICATION
        const authResponse = await authentifier({
            model: 'admin', 
            userMail: adminMail, 
            token: token, 
            guildToCheck: newguildConfig.name}
        );
        if (!authResponse.authorized) {
            console.log(`api/guildConfig/update ~> ${authResponse.error}`);
            return NextResponse.json(authResponse.error, { status: 401 });
        }
        // RECHERCHE DU GUILDCONFIG A MODIFIER
        const guildConfigToUpdate = await GuildConfigModel.findOne({ name: authResponse.checkedUser.guild });
        // MODIFICATION DU GUILDCONFIG
        guildConfigToUpdate.name = newguildConfig.name;
        guildConfigToUpdate.config = newguildConfig.config;
        guildConfigToUpdate.save();
        return NextResponse.json(guildConfigToUpdate, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/guildConfig/update ~> error :", error);
        return NextResponse.json("Échec de la modification du guildConfig", { status: 500 });
    }
}