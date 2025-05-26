import { GuildConfig } from "@/types";
import { packages }from "@/constants";
import style from "@/styles/components/manager/contratCard.module.css";

type Props = {
    guild: GuildConfig;
}

/**
 * @description Formate un mois de début de contrat (exprimé en chiffre de 1 à 12)
 * au format `MM/YYYY`, en estimant l’année à laquelle ce mois correspond.
 * 
 * Exemple 1 :
 *   - currentPeriodStart = 3 (mars)
 *   - aujourd'hui = avril 1999
 *   → résultat : "03/1999" (le mois de mars vient de passer)
 * 
 * Exemple 2 :
 *   - currentPeriodStart = 8 (août)
 *   - aujourd'hui = février 2003
 *   → résultat : "08/2002" (le mois d’août précédent était en 2002)
 * 
 * @param currentPeriodStart - Mois de début du contrat (1 à 12)
 * @returns La date formatée au format "MM/YYYY"
 */
const formatPeriodStart = (currentPeriodStart: number): string => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() retourne 0-11, donc +1 pour avoir 1-12

    // Si le mois actuel est inférieur ou égal au mois de début,
    // cela signifie que le début du contrat était l’année précédente.
    const year = (currentMonth <= currentPeriodStart) ? currentYear - 1 : currentYear;

    // Formate le mois sur 2 chiffres (ex : 3 → "03")
    const month = String(currentPeriodStart).padStart(2, '0');

    return `${month}/${year}`;
};

const ContratCard = (props: Props): JSX.Element => {
    return (<article className={style.contratCard}>
        <p className={style.name}>{props.guild.name}</p>
        <p className={style.package}>
            package {props.guild.currentPackageId} : {packages[props.guild.currentPackageId].price}€/12 mois
        </p>
        <p className={style.monthStart}>
            début de contrat : {formatPeriodStart(props.guild.currentPeriodStart)}
        </p>
    </article>)
}

export default ContratCard;