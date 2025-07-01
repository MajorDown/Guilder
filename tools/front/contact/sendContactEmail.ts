export type ContactEmailData = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    message: string;
}

/**
 * @decription Envoie un e-mail de contact avec les informations fournies.
 * @param data - les informations du formulaire de contact
 * @returns une promesse
 */
const sendContactEmail = async (data: ContactEmailData): Promise<Response> => {
    const response = await fetch("/api/contact/contactEmail/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to send contact email");
    }
    const result = await response.json();
    return result;
}

export default sendContactEmail;