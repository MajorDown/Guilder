import GuildConfigModel from '@/tools/api/models/model.guildConfig';
import AdminModel from '@/tools/api/models/model.admin';
import MemberMoel from '@/tools/api/models/model.member';
import InterventionModel from '../../models/model.intervention';
import ContestationMOdel from '@/tools/api/models/model.contestation';

export type Props = {
    guildName: string;
}

/**
 * @description récupère toute les data relatif a une guilde
 * @param props.guildName - le nom de la guilde
 * @returns un objet contenant les données de la guilde, les admins, les membres, les interventions et les contestations
 */
const getAllDataByGuild = async (props: Props) => {
    const { guildName } = props;
    const guildConfig = await GuildConfigModel.findOne({ guildName }).lean();
    if (!guildConfig) {
        throw new Error(`Guild with name ${guildName} not found`);
    };
    const admins = await AdminModel.find({ guildName }).lean();
    if (!admins) {
        throw new Error(`No admins found for guild ${guildName}`);
    }
    const members = await MemberMoel.find({ guildName }).lean();
    if (!members) {
        throw new Error(`No members found for guild ${guildName}`);
    }
    const interventions = await InterventionModel.find({ guildName }).lean();
    if (!interventions) {
        throw new Error(`No interventions found for guild ${guildName}`);
    }
    const contestations = await ContestationMOdel.find({ guildName }).lean();
    if (!contestations) {
        throw new Error(`No contestations found for guild ${guildName}`);
    }
    return {
        guildConfig,
        admins,
        members,
        interventions,
        contestations
    };
}

export default getAllDataByGuild;