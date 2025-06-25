import {useState, useEffect} from 'react'
import { Admin, Member } from '@/types';

type GuildData = {
    admins: Admin[],
    members: Member[],
} | null;

type Recipient = 'admin' | 'admins' | 'member' | 'members';

const GodMailingForm = () => {
    const [errMessage, setErrMessage] = useState<string>('');
    const [guildList, setGuildList] = useState<string[]>([]);
    const [selectedGuild, setSelectedGuild] = useState<string>('');
    const [guildData, setGuildData] = useState<GuildData>(null);
    const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);

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

    // RECHERCHE DES NOMS DES GUILDS
    useEffect(() => {
        getGuildsName()
            .then((data) => setGuildList(data))
            .catch((err) => setErrMessage("erreur lors du chargement des noms de guildes"));
    }, []);

    // DES QUE LE NOM DE LA GUILDE EST SELECTIONNE, RECHERCHE DES DONNEES DE LA GUILDE
    useEffect(() => {
        if (selectedGuild != "") {
            getGuildData(selectedGuild)
                .then((data) => {
                    setGuildData(data);
                    console.log("data: ", data);
                })
                .catch((err) => setErrMessage(`erreur lors du chargement des données de la guilde: ${err}`));
        }
    }, [selectedGuild]);

    return (
        <form>GodMailingForm

        </form>
  )
}

export default GodMailingForm;