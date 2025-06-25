import { NextRequest } from 'next/server'

import applyCorsForMobiles from '@/tools/api/applyCorsForMobile'
import MemberModel from '@/tools/api/models/model.member'
import { passwordChecker } from '@/tools/api/passwordManager'
import { tokenMaker } from '@/tools/api/tokenManager'
import { ConnectedAdmin, ConnectedMember } from '@/types'

import databaseConnecter from '@/tools/api/databaseConnecter'

type logUserProps = {
    userType: 'member' | 'admin'
    userMail: string
    userPassword: string
}

export async function OPTIONS(request: NextRequest) {
    console.log('⚡ [OPTIONS] api/mobile/user/login');
    return applyCorsForMobiles(request, null, 200)
}

export async function POST(request: NextRequest) {
    const {userType, userMail, userPassword} = (await request.json()) as Partial<logUserProps>
    console.log('api/mobile/user/login ~> Tentative de connection en cours :', userMail);
    try {
        await databaseConnecter();
        if (!userMail || !userPassword) {
            console.log('api/mobile/user/login ~> Erreur de mail')
            return applyCorsForMobiles(request, 'mail / password manquant', 400)
        }
        let userToCheck;
        if (userType === 'member') {
            userToCheck = await MemberModel.findOne({mail: userMail});
            if (!userToCheck) {
                console.log('api/mobile/user/login ~> Erreur de mail')
                return applyCorsForMobiles(request, 'mail / password incorrect', 400)
            }
            const isPasswordValid = passwordChecker(userPassword, userToCheck.password);
            if (!isPasswordValid) {
                console.log("api/member/login ~> Erreur de password");
                return applyCorsForMobiles(request, 'mail / password incorrect', 400)
            }
            const token = tokenMaker(userMail)
            const connectedMember: ConnectedMember = { 
                token: token, 
                mail: userToCheck.mail, 
                name: userToCheck.name, 
                guild: userToCheck.guild, 
                phone: userToCheck.phone,
                counter: userToCheck.counter
            };
            console.log('api/mobile/user/login ~> utilisateur connecté :', userMail)
            return applyCorsForMobiles(request, connectedMember, 201)
        }
        if (userType === 'admin') {
            userToCheck = await MemberModel.findOne({mail: userMail});
            if (!userToCheck) {
                console.log('api/mobile/user/login ~> Erreur de mail')
                return applyCorsForMobiles(request, 'mail / password incorrect', 400)
            }
            const isPasswordValid = passwordChecker(userPassword, userToCheck.password);
            if (!isPasswordValid) {
                console.log("api/member/login ~> Erreur de password");
                return applyCorsForMobiles(request, 'mail / password incorrect', 400)
            }
            const token = tokenMaker(userMail)
            const connectedAdmin: ConnectedAdmin = { 
                token: token, 
                mail: userToCheck.mail, 
                name: userToCheck.name, 
                guild: userToCheck.guild, 
                phone: userToCheck.phone,
                authPersistence: userToCheck.authPersistence
            };
            console.log('api/mobile/user/login ~> utilisateur connecté :', userMail)
            return applyCorsForMobiles(request, connectedAdmin, 201)
        }
        console.log('api/mobile/user/login ~> Erreur de type d\'utilisateur')
        return applyCorsForMobiles(request, 'type d\'utilisateur incorrect', 400)
    } catch (error) {
        console.log('api/mobile/user/login ~> error :', error)
        return applyCorsForMobiles(request, 'failed to login', 500)
    }
}
