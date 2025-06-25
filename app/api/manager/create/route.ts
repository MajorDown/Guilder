import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/api/databaseConnecter";
import createManager from "@/tools/api/mongooseRequests/manager/createManager";

export async function POST(request: Request) {
    console.log(`api/manager/create ~> Requète de création de manager`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // RECUPERATION DES DONNEES
        const { mail, password} = await request.json();
        if (!mail || !password) {
            return NextResponse.json("des éléments du formulaires sont manquants", { status: 400 });
        }
        // CREATION DU MANAGER
        const id = await createManager({ mail, password });
        if (!id) {
            return NextResponse.json("Erreur lors de la création du manager dans la db", { status: 500 });
        }
        return NextResponse.json({ status: 200 });
    }
    catch (error) {
        // SI ERREUR
        console.log(`api/manager/create ~> error :`, error);
        return NextResponse.json("Echec de création de manager", { status: 500 });
    }
};