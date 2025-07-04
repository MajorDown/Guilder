import { NextRequest } from 'next/server'
import { NextResponse } from "next/server"
import MemberModel from '@/tools/api/models/model.member'
import AdminModel from '@/tools/api/models/model.admin'
import { passwordChecker } from '@/tools/api/passwordManager'
import { tokenMaker } from '@/tools/api/tokenManager'
import { ConnectedAdmin, ConnectedMember } from '@/types'
import DeviceManager from '@/tools/api/DeviceManager'

import databaseConnecter from '@/tools/api/databaseConnecter'

type logUserProps = {
    userType: 'member' | 'admin'
    userMail: string
    userPassword: string
    deviceId: string
}

export async function POST(request: NextRequest) {
    const {userType, userMail, userPassword, deviceId} = (await request.json()) as Partial<logUserProps>
    console.log('api/mobile/user/login ~> Tentative de connection en cours :', userMail);
    try {
        await databaseConnecter();
        // vérification que l'ensemble des champs sont renseignés
        if (!userType || !userMail || !userPassword || !deviceId) {
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
        // validation du mot de passe
        const isPasswordValid = passwordChecker(userPassword, userToCheck.password);
        if (!isPasswordValid) {
            console.log('api/mobile/user/login ~> Erreur de mot de passe');
            return new NextResponse(JSON.stringify({ error: 'Mail ou mot de passe incorrect.' }), { status: 400 });
        }
        // enregistrement du device
        const deviceRegister = await DeviceManager.add({
            userType: userType,
            userMail: userMail,
            deviceId: deviceId
        });
        if (!deviceRegister.isValid) {
            console.log('api/mobile/user/login ~> Erreur d\'enregistrement du device :', deviceRegister.message);
            return new NextResponse(JSON.stringify({ error: deviceRegister.message }), { status: 400 });
        }
        // génération du token
        const token = tokenMaker(userMail);
        // renvoi du user valide
        let connectedUser: ConnectedMember | ConnectedAdmin;
        if (userType === 'member') {
            connectedUser = {
                token: token,
                mail: userToCheck.mail,
                name: userToCheck.name,
                guild: userToCheck.guild,
                phone: userToCheck.phone,
                counter: userToCheck.counter
            } as ConnectedMember;
        } else {
            connectedUser = {
                token: token,
                mail: userToCheck.mail,
                name: userToCheck.name,
                phone: userToCheck.phone
            } as ConnectedAdmin;
        }
        console.log('api/mobile/user/login ~> utilisateur connecté :', userMail);
        return new NextResponse(JSON.stringify(connectedUser), { status: 201 });
    } catch (error) {
        console.log('api/mobile/user/login ~> error :', error)
        return new NextResponse(JSON.stringify({ error: 'Erreur de connexion à la base de données.' }), { status: 500 });
    }
}
