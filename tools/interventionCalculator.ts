import { Intervention } from "@/types";

/**
 * Calcule le nombre de crédits à attribuer à une intervention.
 * 
 * @param {Intervention} intervention - L'intervention pour laquelle on veut calculer les crédits.
 * @returns {number} Le nombre de crédits à attribuer.
 */
const interventionCalculator = (intervention: Intervention): number => {
    const {hours, options} = intervention;
    let total = 0;
    options.forEach((option) => {
        if (typeof option === 'object') {
            total += (hours * option.coef) as number;
        }
    });
    return parseFloat(total.toFixed(2));
};

export default interventionCalculator;