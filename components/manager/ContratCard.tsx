'use client'
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

/**
 * @description Calcule le pourcentage de progression d'un contrat
 * @param startMonth 
 * @param duration 
 * @returns 
 */
const getProgressPercent = (startMonth: number, duration: 'monthly' | 'annual'): number => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Estime l'année de départ (même logique que formatPeriodStart)
    const startYear = (currentMonth <= startMonth) ? currentYear - 1 : currentYear;

    // Crée la date de début
    const startDate = new Date(startYear, startMonth - 1, 1); // JS : mois 0-based
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + (duration === 'annual' ? 12 : 1));

    // Calcule la progression en %
    const totalTime = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();

    const percent = Math.max(0, Math.min(1, elapsed / totalTime)) * 100;
    return Math.round(percent);
};

const ContratCard = (props: Props): JSX.Element => {
    const percent = getProgressPercent(props.guild.currentPeriodStart, props.guild.currentPeriod);

    return (<article className={style.contratCard}>
        <div className={style.infosLine}>
            <p className={style.name}>{props.guild.name}</p>
            <p className={style.package}>
                package {props.guild.currentPackageId} ({packages[props.guild.currentPackageId].price}€)
                de {packages[props.guild.currentPackageId].rules.min} à {packages[props.guild.currentPackageId].rules.max} membres
            </p>
            <p className={style.monthStart}>
                début de contrat : {formatPeriodStart(props.guild.currentPeriodStart)}
            </p>
            <p className={style.duration}>
                durée du contrat : {props.guild.currentPeriod === 'annual' ? '12 mois' : '1 mois'}
            </p>
            <div className={style.progressContainer}>
                <div className={style.progressBar} style={{ width: `${percent}%` }} />
            </div>
        </div>
        <div className={style.contactLine}>
            <p className={style.adress}>{`~ adresse : ${props.guild.adress?.line1} ${props.guild.adress?.line2 ? props.guild.adress?.line2 : ''} - ${props.guild.adress?.code} ${props.guild.adress?.city}`}</p>
            <p className={style.tel}>{'  ~  tel : '}{props.guild.phone}</p>
            <p className={style.mail}>{'  ~  mail : '}{props.guild.mail}</p>
        </div>
    </article>)
}

export default ContratCard;