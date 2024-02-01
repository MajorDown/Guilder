import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import { tokenChecker } from "@/tools/api/tokenManager";
import AdminModel from "@/tools/api/models/model.admin";
import GuildConfigModel from "@/tools/api/models/model.guildConfig";

export async function PUT(request: Request) {
    const newguildConfig = await request.json();
    console.log(`api/guildConfig/update ~> Tentative de modification de guildConfig`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // VERIFICATION DE L'EXISTENCE DE LA GUILDE
        let guildConfigToUpdate = await GuildConfigModel.findOne({name: newguildConfig.name});
        if (!guildConfigToUpdate) {
            console.log(`api/guildConfig/update ~> la guilde ${newguildConfig.name} n'existe pas dans la db`);
            return NextResponse.json("Non autorisé", { status: 401 });      
        }
        // AUTHENTIFICATION
        const adminToCheck = await AdminModel.findOne({guild: newguildConfig.name});
        if (!adminToCheck) {
          console.log(`api/guildConfig/update ~> l'admin de la guilde ${newguildConfig.name} est introuvable dans la db`);
          return NextResponse.json("Non autorisé", { status: 401 });      
        }
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker("admin", token, adminToCheck.mail) : false;
        if (!isAuthentified) {
          console.log(`api/guildConfig/update ~> ${adminToCheck.name} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // MODIFICATION DU GUILDCONFIG
        guildConfigToUpdate.name = newguildConfig.name;
        guildConfigToUpdate.config = newguildConfig.config;
        console.log(guildConfigToUpdate);
        guildConfigToUpdate.save();
        return NextResponse.json(guildConfigToUpdate, { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/password/update ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}