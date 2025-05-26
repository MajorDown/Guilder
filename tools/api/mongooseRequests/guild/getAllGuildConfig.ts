import GuildConfigModel from "@/tools/api/models/model.guildConfig";
import { GuildConfig } from "@/types";

/**
 * @description Parse les données GuildConfig reçu par la db pour correspondre au type GuildConfig
 * @param data Les données de la GuildConfig à parser
 * @returns Un objet GuildConfig
 */
const parseGuildConfig = (data: any): GuildConfig => {
  return {
    name: data.name,
    config: data.config.map((tool: any) => ({
      option: tool.option,
      coef: tool.coef,
      enabled: tool.enabled
    })),
    rules: data.rules ?? undefined,
    adress: data.adress
      ? {
          line1: data.adress.line1,
          line2: data.adress.line2 ?? undefined,
          code: data.adress.code,
          city: data.adress.city,
          country: data.adress.country
        }
      : undefined,
    phone: data.phone ?? undefined,
    mail: data.mail ?? undefined,
    currentPackageId: data.currentPackageId,
    currentPeriod: data.currentPeriod,
    currentPeriodStart: data.currentPeriodStart
  };
}


/**
 * @description Récupère toutes les GuildConfig
 * @returns Un tableau contenant les GuildConfig
 */
const getAllGuildConfig = async (): Promise<GuildConfig[]> => {
    try {
        const guilds = await GuildConfigModel.find().lean();
        return guilds.map(parseGuildConfig);
    } catch (error) {
        console.error("Error fetching all guildConfigs", error);
        throw new Error("Failed to fetch all guildConfigs");
    }
};

export default getAllGuildConfig;
