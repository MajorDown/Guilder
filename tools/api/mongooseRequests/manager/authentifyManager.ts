import ManagerModel from "@/tools/api/models/model.manager";
import { passwordChecker } from "@/tools/api/passwordManager";
import { tokenMaker } from "@/tools/api/tokenManager";
import { ConnectedManager } from "@/types";

type AuthentifyManagerInput = {
    mail: string;
    password: string;
}

/**
 * @description Authentifies a manager in the database
 * @param {AuthentifyManagerInput} input - The input to authentify the manager
 * @returns {Promise<string>} - The token of the authentified manager
 */
const authentifyManager = async (input: AuthentifyManagerInput):Promise<ConnectedManager> => {
    const managerToAuthentify = await ManagerModel.findOne({ mail: input.mail });
    if (!managerToAuthentify) throw new Error("Manager introuvable");
    const isPasswordValid = passwordChecker(input.password, managerToAuthentify.password);
    if (!isPasswordValid) throw new Error("password incorrect");
    const token = tokenMaker(managerToAuthentify.mail);
    if (!token) throw new Error("erreur lors de la création du token");
    const manager: ConnectedManager = {
        mail: managerToAuthentify.mail,
        token,
    };
    return manager;
}

export default authentifyManager;