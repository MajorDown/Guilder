import AdminModel from "../models/model.admin";
import MemberModel from "../models/model.member";
import GuildConfigModel from "../models/model.guildConfig";
import InterventionModel from "../models/model.intervention";
import ContestationModel from "../models/model.contestation";
import { Admin, Member, Intervention, Contestation, GuildConfig } from "@/types";

/**
 * @description Restocke toutes les collections de la base de données
 * @param {Object} data Un objet contenant les données à restocker
 * @returns {Promise<{collection: string, insertedCount: number}[]>} Un tableau d'objets contenant le nom de la collection et le nombre de documents insérés
 */
async function recoverAllCollections(data: {
  admins: Admin[];
  members: Member[];
  guildsConfig: GuildConfig[];
  interventions: Intervention[];
  contestations: Contestation[];
}) {
  const collections = [
    { name: "admins", model: AdminModel, data: data.admins },
    { name: "members", model: MemberModel, data: data.members },
    { name: "guildsConfig", model: GuildConfigModel, data: data.guildsConfig },
    { name: "interventions", model: InterventionModel, data: data.interventions },
    { name: "contestations", model: ContestationModel, data: data.contestations }
  ];

  const results = [];
  const errors = [];

  for (const { name, model, data } of collections) {
    try {
      const inserted = await model.insertMany(data);
      results.push({ collection: name, insertedCount: inserted.length });
    } catch (error) {
      errors.push(`Erreur lors de l'insertion dans la collection '${name}': ${(error as Error).message}`);
    }
  }

  if (errors.length > 0) {
    throw { results, errors };
  }

  return results;
}

export default recoverAllCollections;
