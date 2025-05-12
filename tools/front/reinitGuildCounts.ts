import { ConnectedAdmin } from "@/types"

export type ResetGuildCountsProps = {
    admin: ConnectedAdmin;
    reAskedPassword: string;
    wantToResetInterventions: boolean;
}

export type ResetGuildCountsResponse = {
    message: string;
    resetCounts: number;
    deletedInterventions: number;
}

export type BodyRequestProps = {
    reAskedPassword: string;
    guildToReset: string;
    resetInterventions: boolean;
}

/**
 * @description réinitialise les compteurs de la guilde et supprime les interventions si demandé
 * @param props.admin
 * @param props.reAskedPassword
 * @param props.wantToResetInterventions
 * @returns Promise<ResetGuildCountsResponse>
 */
const resetGuildsCounts = async (props: ResetGuildCountsProps): Promise<ResetGuildCountsResponse> => {
    const { admin, reAskedPassword, wantToResetInterventions } = props;

    const bodyRequest: BodyRequestProps = {
        reAskedPassword,
        guildToReset: admin.guild,
        resetInterventions: wantToResetInterventions
    }

    const response = await fetch("/api/counts/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Email": admin.mail,
            "Authorization": `Bearer ${admin.token}`
        },
        body: JSON.stringify(bodyRequest)
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la réinitialisation des compteurs");
    }

    return response.json();
}

export default resetGuildsCounts