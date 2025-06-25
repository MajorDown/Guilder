import AdminModel from "../models/model.admin";
import ContestationModel from "../models/model.contestation";
import GuildConfigModel from "../models/model.guildConfig";
import InterventionModel from "../models/model.intervention";
import MemberModel from "../models/model.member";

/**
 * @description Efface toutes les collections de la base de données
 * @returns {Promise<{collection: string, deletedCount: number}[]>} Un tableau d'objets contenant le nom de la collection et le nombre de documents supprimés
 */
async function clearAllCollections() {
    const collections = [
      { name: "admins", model: AdminModel },
      { name: "members", model: MemberModel },
      { name: "guildsConfig", model: GuildConfigModel },
      { name: "interventions", model: InterventionModel },
      { name: "contestations", model: ContestationModel }
    ];  
    const results = [];
    const errors = [];  
    for (const { name, model } of collections) {
      try {
        const result = await model.deleteMany({});
        results.push({ collection: name, deletedCount: result.deletedCount });
      } catch (error) {
        errors.push(`Erreur lors de la suppression de la collection '${name}': ${(error as Error).message}`);
      }
    }  
    if (errors.length > 0) {
      throw { results, errors };
    }  
    return results;
}
  
export default clearAllCollections;
