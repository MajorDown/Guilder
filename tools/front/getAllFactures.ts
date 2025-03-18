import { Facture } from "@/types";

const getGuildsFacturations = async () => {
    const response = await fetch("/api/god/facturation/getAll", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-IsGodConnected": sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) as string
        }
    })
    const data = await response.json();
    return data as Facture[];
}

export default getGuildsFacturations;