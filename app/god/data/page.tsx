'use client'
import {useEffect, useState} from 'react';
import LoadSpinner from '@/components/LoadSpinner';
import { Admin, Contestation, GuildConfig, Intervention, Member } from '@/types';

type DataTab = "admins" | "members" | "tools" | "interventions" | "contestations";
type GuildData = {
    admins: Admin[],
    members: Member[],
    tools: GuildConfig["config"],
    interventions: Intervention[],
    contestations: Contestation[]
} | null;

const GodData = () => {
    const [guildsName, setGuildsName] = useState<string[]>([]);
    const [guildsNameErr, setGuildsNameErr] = useState<string>("");
    const [selectedGuildName, setSelectedGuildName] = useState<string>("");
    const [selectedTab, setSelectedTab] = useState<DataTab>("admins");
    const [guildData, setGuildData] = useState<GuildData>(null);
    const [guildDataErr, setGuildDataErr] = useState<string>("");

    const getGuildsName = async () => {
        const response = await fetch("/api/god/guildsName/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-IsGodConnected": sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) as string
            }
        })
        const data = await response.json();
        return data as string[];
    }

    const getGuildData = async (guildName: string) => {
        const response = await fetch("/api/god/guildData/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-IsGodConnected": sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) as string,
                "X-guildName": guildName
            }
        });
        const data = await response.json();
        return data as GuildData;
    }

    // SI LE GOD EST CONNECTE, RECHERCHE DES NOMS DES GUILDS
    useEffect(() => {
        if (sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) !== "true") {
            // rediriger vers la page /god/login
            window.location.href = "/god/login";
        }
        else getGuildsName()
            .then((data) => setGuildsName(data))
            .catch((err) => setGuildsNameErr("erreur lors du chargement des noms de guildes"));
    }, []);

    //DES QUE LE NOM DE LA GUILDE EST SELECTIONNE, RECHERCHE DES DONNEES DE LA GUILDE
    useEffect(() => {
        if (selectedGuildName != "") {
            getGuildData(selectedGuildName)
                .then((data) => {
                    setGuildData(data);
                    console.log("data: ", data);
                })
                .catch((err) => setGuildDataErr(`erreur lors du chargement des données de la guilde: ${err}`));
        }
    }, [selectedGuildName]);
    
    return (
        <section id={"godData"} className={"godSection"}>
            <h2>Données de l'application</h2>
            <div id={"guildNameSelector"}>
                <label htmlFor="guildsName">choix de la guilde à gérer :</label>
                <select 
                    name="guildsName" 
                    id="guildsName"
                    aria-label="guildsName"
                    value={selectedGuildName}
                    onChange={(e) => setSelectedGuildName(e.target.value)}
                >
                    <option value={""}>nom de la guilde</option>
                    {guildsName.length > 0 && guildsName.map((guildName) => <option key={guildName} value={guildName}>{guildName}</option>)}
                </select>
            </div>
            {guildsNameErr && <p>{guildsNameErr}</p>}
            {selectedGuildName != "" && <>
                {guildData && <div id={"guildDataSelector"}>
                    <h3>Données de la guilde {selectedGuildName}</h3>
                    <div>
                        <button 
                            className={selectedTab === "admins" ? "green" : "light"}
                            onClick={() => setSelectedTab("admins")}
                        >
                            Admins
                        </button>
                        <button 
                            className={selectedTab === "members" ? "green" : "light"}
                            onClick={() => setSelectedTab("members")}
                        >
                            Membres
                        </button>
                        <button 
                            className={selectedTab === "tools" ? "green" : "light"}
                            onClick={() => setSelectedTab("tools")}
                        >
                            Outils
                        </button>
                        <button 
                            className={selectedTab === "interventions" ? "green" : "light"}
                            onClick={() => setSelectedTab("interventions")}
                        >
                            Interventions
                        </button>
                        <button 
                            className={selectedTab === "contestations" ? "green" : "light"}
                            onClick={() => setSelectedTab("contestations")}
                        >
                            Contestations
                        </button>                        
                    </div>
                </div>}
                {guildDataErr && <p>{guildDataErr}</p>}
            </>}            
        </section>
    )
}

export default GodData;