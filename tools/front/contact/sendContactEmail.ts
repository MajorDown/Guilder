export type ContactEmailData = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    message: string;
}
//requète coté front pour envoyer un email de contact
const sendContactEmail = async (data: ContactEmailData) => {
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