import GuildConfigModel from '@/tools/api/models/model.guildConfig';
import AdminModel from '@/tools/api/models/model.admin';
import MemberMoel from '@/tools/api/models/model.member';
import InterventionModel from '../../models/model.intervention';
import ContestationModel from '@/tools/api/models/model.contestation';

export type Props = {
    guildName: string;
}

export type GuildData = {

}

/**
 * @description récupère toute les data relatif a une guilde
 * @param props.guildName - le nom de la guilde
 * @returns un objet contenant les données de la guilde, les admins, les membres, les interventions et les contestations
 */
const getAllDataByGuild = async (props: Props) => {
    const { guildName } = props;

    const guildConfig = await GuildConfigModel.findOne({ name: guildName }).lean();
    if (!guildConfig) {
        throw new Error(`Guild with name ${guildName} not found`);
    }

    const admins = await AdminModel.find({ guild: guildName }).lean();
    const members = await MemberMoel.find({ guild: guildName }).lean();

    const memberNames = members.map(m => m.name);

    const interventions = await InterventionModel.find({
        $or: [
            { worker: { $in: memberNames } },
            { payer: { $in: memberNames } }
        ]
    }).lean();

    const contestations = await ContestationModel.find({
        guild: guildName
    }).lean();

    return {
        guildConfig,
        admins,
        members,
        interventions,
        contestations
    };
}


export default getAllDataByGuild;