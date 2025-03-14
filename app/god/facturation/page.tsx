'use client'
import {useState, useEffect} from 'react';
import { Facture } from '@/types';

const GodFacturationPage = () => {
    const [guildsFacturations, setGuildsFacturations] = useState<Facture[]>([]);
    const [FaturationsErr, setFacturationsErr] = useState<string>("");

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

    // SI LE GOD EST CONNECTE, RECHERCHE DES FACTURES DES GUILDS
    useEffect(() => {
        if (sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) !== "true") {
            // rediriger vers la page /god/login
            window.location.href = "/god/login";
        }
        else getGuildsFacturations()
            .then((data) => setGuildsFacturations(data))
            .catch((err) => setFacturationsErr("erreur lors du chargement des noms de guildes"));
    }, []);

    return (
        <section id={"godFacturation"} className={"godSection scrollable"}>
            <h2>Facturation</h2>
        </section>
    )  
}

export default GodFacturationPage;