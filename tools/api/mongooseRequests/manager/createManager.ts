import ManagerModel from '@/tools/api/models/model.manager';
import { passwordCrypter } from '../../passwordManager';

type CreateManagerInput = {
    password: string;
    mail: string;
}

/**
 * @description Créé un manager dans la db
 * @param {string} input.mail
 * @param {string} input.password
 * @returns {Promise<string>} - l'id du manager créé
 */
const createManager = async (input: CreateManagerInput):Promise<string> => {
    const hashedPassword = await passwordCrypter(input.password);
    const creation = await ManagerModel.create({
        mail: input.mail,
        password: hashedPassword,
    });
    if (!creation) throw new Error('erreur lors de la création du manager');
    return creation._id.toString();
}

export default createManager