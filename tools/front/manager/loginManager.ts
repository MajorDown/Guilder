import { ConnectedManager } from "@/types";

type LoginManagerProps = {
    mail: string;
    password: string;
}

/**
 * @description requète front vers le serveur pour login le manager
 * @param {string} props.mail - le mail du manager
 * @param {string} props.password - le mot de passe du manager
 * @returns {Promise<ConnectedManager>} - le manager connecté
 */
const loginManager = async (props: LoginManagerProps): Promise<ConnectedManager> => {
    const response = await fetch("/api/manager/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mail: props.mail,
            password: props.password,
        }),
    })
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const data = await response.json();
    if (!data) throw new Error("erreur lors de la récupération du manager");
    if (!data.token) throw new Error("erreur lors de la récupération du token");
    const manager: ConnectedManager = {
        mail: data.mail,
        token: data.token,
    };
    sessionStorage.setItem(
        process.env.NEXT_PUBLIC_SESSIONSTORAGE_MANAGERCONTEXT_KEY as string, 
        JSON.stringify(manager)
    );
    return manager;
}

export default loginManager;