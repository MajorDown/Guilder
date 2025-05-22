import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import loginManager from "@/tools/api/mongooseRequests/manager/loginManager";

export async function POST(request: Request) {
    console.log(`api/manager/login ~> Requète de login de manager`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // RECUPERATION DES DONNEES
        const { mail, password} = await request.json();
        if (!mail || !password) {
            return NextResponse.json("des éléments du formulaires sont manquants", { status: 400 });
        }
        // CREATION DU MANAGER
        const connectedManager = await loginManager({ mail, password });
        if (!connectedManager) {
            return NextResponse.json("Erreur lors de la connexion du manager", { status: 500 });
        }
        return NextResponse.json(connectedManager, { status: 200 });
    }
    catch (error) {
        // SI ERREUR
        console.log(`api/manager/login ~> error :`, error);
        return NextResponse.json("Echec de création de manager", { status: 500 });
    }
};