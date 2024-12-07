'use client'
import { useEffect, useState } from "react";

const GodSaveAllData = () => {
    const [downloadProgressReport, setDownloadProgressReport] = useState<string>("");

    useEffect(() => {
        if (sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) !== "true") {
            // Rediriger vers la page /god/login si non authentifié
            window.location.href = "/god/login";
        }
    }, []);

    const handleDownLoadAllData = async () => {
        try {
            // Requête pour récupérer les données
            setDownloadProgressReport("Récupération des données en cours...");
            const response = await fetch("/api/god/saveAllData", {
                method: "GET",
                headers: {
                    "X-IsGodConnected": "true"
                }
            });

            if (response.ok) {
                setDownloadProgressReport("création du fichier JSON en cours...");
                // Sauvegarder les données dans un fichier JSON et le télécharger
                const data = await response.json();
                const dataJson = JSON.stringify(data, null, 2); // Format JSON avec indentation
                const blob = new Blob([dataJson], { type: "application/json" });
                const url = URL.createObjectURL(blob);

                // Créer un lien temporaire pour télécharger le fichier
                const link = document.createElement("a");
                link.href = url;
                link.download = "application_data.json"; // Nom du fichier
                document.body.appendChild(link);
                link.click();

                // Nettoyer le lien après téléchargement
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                setDownloadProgressReport("Téléchargement terminé");
            } else {
                console.error("Erreur lors de la récupération des données");
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    };

    return (
        <section id={"saveAllData"} className={"godSection"}>
            <h2>Session de récupération des données de l'application</h2>
            <button 
                className={"light"}
                onClick={() => handleDownLoadAllData()}
            >
                Télécharger l'ensemble des données
            </button>
            {downloadProgressReport != '' && <p>{downloadProgressReport}</p>}
        </section>
    );
}

export default GodSaveAllData;
