import ManagerModel from '@/tools/api/models/model.manager';
import { passwordCrypter } from '../../passwordManager';

type CreateManagerInput = {
    password: string;
    mail: string;
}

/**
 * @description Creates a manager in the database
 * @param {CreateManagerInput} input - The input to create the manager
 * @returns {Promise<string>} - The id of the created manager
 */
const createManager = async (input: CreateManagerInput):Promise<string> => {
    const creation = await ManagerModel.create({
        mail: input.mail,
        password: passwordCrypter(input.password),
    });
    if (!creation) throw new Error('erreur lors de la création du manager');
    return creation._id.toString();
}

export default createManager