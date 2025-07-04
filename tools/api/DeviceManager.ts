import AdminModel from "./models/model.admin";
import MemberModel from "./models/model.member";

type DeviceManagerResponse = {
    isValid: boolean;
    message: string
}

type DeviceCheckProps = {
    userType: 'member' | 'admin';
    userMail: string;
    deviceId: string;
}

/**
 * @description DeviceManager est une classe qui gère les opérations liées aux devices mobiles pour les membres et les admins.
 */
class DeviceManager {
    /**
     * @description Vérifie si un device est valide pour un utilisateur donné (membre ou admin)
     * @param data.userType - Le type d'utilisateur ('member' ou 'admin')
     * @param data.userMail - L'email de l'utilisateur
     * @param data.deviceId - L'ID du device à vérifier
     * @returns Un objet contenant un booléen isValid et un message
     */
    static async check(data: DeviceCheckProps): Promise<DeviceManagerResponse> {
        const { userType, userMail, deviceId } = data;
        if (userType === 'member') {
            const memberToCheck = await MemberModel.findOne({ mail: userMail});
            if (memberToCheck.devices.includes(deviceId)) return { isValid: true, message: "Device validé pour ce membre" };
            else return { isValid: false, message: "Device non valide pour ce membre" };
        }
        else if (userType === 'admin') {
            const adminToCheck = await AdminModel.findOne({ mail: userMail});
            if (adminToCheck.devices.includes(deviceId)) return { isValid: true, message: "Device validé pour cet admin" };
            else return { isValid: false, message: "Device non valide pour cet admin" };
        }
        else {
            return { isValid: false, message: "Type d'utilisateur inconnu" };
        }
    }

    /**
     * @description Ajoute un device à un utilisateur (membre ou admin)
     * @param data.userType - Le type d'utilisateur ('member' ou 'admin')
     * @param data.userMail - L'email de l'utilisateur
     * @param data.deviceId - L'ID du device à ajouter
     * @returns Un objet contenant un booléen isValid et un message
     */
    static async add(data: DeviceCheckProps): Promise<DeviceManagerResponse> {
        const { userType, userMail, deviceId } = data;
        if (userType === 'member') {
            const memberToUpdate = await MemberModel.findOne({ mail: userMail });
            if (memberToUpdate.devices.includes(deviceId)) return { isValid: false, message: "Device déjà existant pour ce membre" };
            memberToUpdate.devices.push(deviceId);
            await memberToUpdate.save();
            return { isValid: true, message: "Device ajouté pour ce membre" };
        }
        else if (userType === 'admin') {
            const adminToUpdate = await AdminModel.findOne({ mail: userMail });
            if (adminToUpdate.devices.includes(deviceId)) return { isValid: false, message: "Device déjà existant pour cet admin" };
            adminToUpdate.devices.push(deviceId);
            await adminToUpdate.save();
            return { isValid: true, message: "Device ajouté pour cet admin" };
        }
        else {
            return { isValid: false, message: "Type d'utilisateur inconnu" };
        }
    }

    /**
     * @description Supprime un device d'un utilisateur (membre ou admin)
     * @param data.userType - Le type d'utilisateur ('member' ou 'admin')
     * @param data.userMail - L'email de l'utilisateur
     * @param data.deviceId - L'ID du device à supprimer
     * @returns Un objet contenant un booléen isValid et un message
     */
    static async remove(data: DeviceCheckProps): Promise<DeviceManagerResponse> {
        const { userType, userMail, deviceId } = data;
        if (userType === 'member') {
            const memberToUpdate = await MemberModel.findOne({ mail: userMail });
            if (!memberToUpdate.devices.includes(deviceId)) return { isValid: false, message: "Device non existant pour ce membre" };
            memberToUpdate.devices = memberToUpdate.devices.filter((device: string) => device !== deviceId);
            await memberToUpdate.save();
            return { isValid: true, message: "Device supprimé pour ce membre" };
        }
        else if (userType === 'admin') {
            const adminToUpdate = await AdminModel.findOne({ mail: userMail });
            if (!adminToUpdate.devices.includes(deviceId)) return { isValid: false, message: "Device non existant pour cet admin" };
            adminToUpdate.devices = adminToUpdate.devices.filter((device: string) => device !== deviceId);
            await adminToUpdate.save();
            return { isValid: true, message: "Device supprimé pour cet admin" };
        }
        else {
            return { isValid: false, message: "Type d'utilisateur inconnu" };
        }
    }
}

export default DeviceManager;