import { NextRequest } from 'next/server'
import { NextResponse } from "next/server"
import MemberModel from '@/tools/api/models/model.member'
import AdminModel from '@/tools/api/models/model.admin'
import getAllDataByGuild from '@/tools/api/mongooseRequests/guild/getAllDataByGuild'

import { tokenChecker } from '@/tools/api/tokenManager'
import DeviceManager from '@/tools/api/DeviceManager'

import databaseConnecter from '@/tools/api/databaseConnecter'

type getUserDataProps = {
    userType: 'member' | 'admin'
    userMail: string
    userPassword: string
    deviceId: string
}

export async function GET(request: NextRequest) {
    console.log('api/mobile/user/getAllData ~> Tentative de récupération des données utilisateur');
    try {
        await databaseConnecter();
        // Récupération des données de l'utilisateur connecté
        const headers = request.headers;
        const userType = headers.get('user-type') as 'member' | 'admin';
        const userMail = headers.get('user-mail') as string;
        const device = headers.get('device-id') as string;
        const token = headers.get('authorization')?.replace('Bearer ', '') || '';
        if (!userType || !userMail || !device || !token) {
            return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis.' }), { status: 400 });
        }
        // recherche du user dans la db
        let userToCheck;
        if (userType === 'member') {
            userToCheck = await MemberModel.findOne({ mail: userMail });
        }
        else if (userType === 'admin') {
            userToCheck = await AdminModel.findOne({ mail: userMail });
        }
        if (!userToCheck) {
            console.log('api/mobile/user/login ~> Erreur de mail');
            return new NextResponse(JSON.stringify({ error: 'Mail ou mot de passe incorrect.' }), { status: 400 });
        } 
        // vérification du device
        const deviceCheck = await DeviceManager.check({
            userType: userType,
            userMail: userMail,
            deviceId: device
        });
        if (!deviceCheck.isValid) {
            console.log('api/mobile/user/getAllData ~> Erreur de device :', deviceCheck.message);
            return new NextResponse(JSON.stringify({ error: deviceCheck.message }), { status: 400 });
        }       
        // Vérification du token
        console.log('api/mobile/user/getAllData ~> utilisateur connecté :', userMail);
        const isTokenValid = tokenChecker(userType, token, userMail);
        if (!isTokenValid) {
            console.log('api/mobile/user/getAllData ~> Erreur de token');
            return new NextResponse(JSON.stringify({ error: 'Token invalide.' }), { status: 401 });
        }
        // Récupération des données de l'utilisateur
        // si c'est un admin, on récupère l'ensemble des données : interventions, membres, contestations, guildconfig
        if (userType === 'admin') {
            const allData = await getAllDataByGuild({ guildName: userToCheck.guild });            
            return new NextResponse(JSON.stringify(allData), { status: 200 });
        }


    } catch (error) {
        console.log('api/mobile/user/getAllData ~> error :', error)
        return new NextResponse(JSON.stringify({ error: 'Erreur de connexion à la base de données.' }), { status: 500 });
    }
}
