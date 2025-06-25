import ManagerModel from "@/tools/api/models/model.manager";
import { passwordChecker } from "@/tools/api/passwordManager";
import { tokenMaker } from "@/tools/api/tokenManager";
import { ConnectedManager } from "@/types";

type LoginManagerInput = {
    mail: string;
    password: string;
}

/**
 * @description logn un manager de la db
 * @param {string} input.mail
 * @param {string} input.password
 * @returns {Promise<ConnectedManager>} - le manager connecté
 */
const loginManager = async (input: LoginManagerInput): Promise<ConnectedManager> => {
    const managerTologin = await ManagerModel.findOne({ mail: input.mail });
    if (!managerTologin) throw new Error("Manager introuvable");
    const isPasswordValid = passwordChecker(input.password, managerTologin.password);
    if (!isPasswordValid) throw new Error("password incorrect");
    const token = tokenMaker(managerTologin.mail);
    if (!token) throw new Error("erreur lors de la création du token");
    const manager: ConnectedManager = {
        mail: managerTologin.mail,
        token,
    };
    return manager;
}

export default loginManager;