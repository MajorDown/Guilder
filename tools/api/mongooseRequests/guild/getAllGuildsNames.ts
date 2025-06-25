import GuildConfigModel from "@/tools/api/models/model.guildConfig";

/**
 * @description Récupère les noms de toutes les guildes
 * @returns Un tableau contenant les noms de toutes les guildes
 */
const getAllGuildsNames = async (): Promise<string[]> => {
    try {
        const guilds = await GuildConfigModel.find().select("name").lean();
        if (!guilds || guilds.length === 0) {
            throw new Error("No guilds found");
        }
        return guilds.map(guild => guild.name);
    } catch (error) {
        console.error("Error fetching guild names:", error);
        throw new Error("Failed to fetch guild names");
    }
}

export default getAllGuildsNames;