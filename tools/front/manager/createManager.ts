type CreateManagerProps = {
    mail: string;
    password: string;
}

/**
 * @description requète front vers le serveur pour créer un manager
 * @param {string} props.mail - le mail du manager
 * @param {string} props.password - le mot de passe du manager
 * @returns {Promise<ConnectedManager>} - le manager créé
 */
const createManager = async (props: CreateManagerProps): Promise<string> => {
    const response = await fetch("/api/manager/create", {
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
    return data;
}

export default createManager;