import { tokenChecker } from "@/tools/api/tokenManager";
import AdminModel from "@/tools/api/models/model.admin";
import MemberModel from "./models/model.member";
import { Admin, Member } from "@/types";
import GuildConfigModel from "./models/model.guildConfig";
import { UserStatus } from "@/types";

export type FalseAuthResponse = {
    authorized: false;
    error: string;
};

export type TrueAuthResponse<U = Admin | Member> = {
    authorized: true;
    checkedUser: U;
};

type AuthResponse<U = Admin | Member> = FalseAuthResponse | TrueAuthResponse<U>;


type AuthentifierProps = {
    model: UserStatus,
    userMail: string,
    token: string,
    guildToCheck?: string
}

/*
* @name authentifier
* @description Vérifie si un utilisateur est authentifié
* @param {AuthentifierProps} props - Les propriétés de l'authentification
* @returns {Promise<AuthResponse<Admin | Member>>} - Une réponse d'authentification
**/
const authentifier = async (props: AuthentifierProps): Promise<AuthResponse<Admin | Member>> => {
    try {
        if (props.model === 'admin') {
            const adminToCheck = await AdminModel.findOne({ mail: props.userMail });
            if (!adminToCheck) {
                return { authorized: false, error: "admin introuvable" };
            }

            const isAuthentified = props.token ? await tokenChecker("admin", props.token, adminToCheck.mail) : false;
            if (!isAuthentified) {
                return { authorized: false, error: "token invalide" };
            }

            if (props.guildToCheck && adminToCheck.guild) {
                const searchedGuild = await GuildConfigModel.findOne({ name: props.guildToCheck });
                if (!searchedGuild || adminToCheck.guild !== props.guildToCheck) {
                    return { authorized: false, error: "admin inconnu de la guilde" };
                }
            }

            return { authorized: true, checkedUser: adminToCheck };
        } else if (props.model === 'member') {
            const memberToCheck = await MemberModel.findOne({ mail: props.userMail });
            if (!memberToCheck) {
                return { authorized: false, error: "Membre introuvable" };
            }

            const isAuthentified = props.token ? await tokenChecker("member", props.token, memberToCheck.mail) : false;
            if (!isAuthentified) {
                return { authorized: false, error: "token invalide" };
            }

            if (props.guildToCheck && memberToCheck.guild) {
                const searchedGuild = await GuildConfigModel.findOne({ name: props.guildToCheck });
                if (!searchedGuild || memberToCheck.guild !== props.guildToCheck) {
                    return { authorized: false, error: "membre inconnu de la guilde" };
                }
            }

            return { authorized: true, checkedUser: memberToCheck };
        }

        return { authorized: false, error: "modèle invalide" };
    } catch (error) {
        return { authorized: false, error: "erreur interne" };
    }
};


export default authentifier;