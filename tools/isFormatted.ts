//jsdoc
/**
 * fonction de vérification du format
 * @param {RegExp} regex - L'expression régulière à utiliser pour la vérification.
 * @param {string} toValidate - La chaîne de caractères à vérifier.
 * @returns {boolean} Retourne true si la chaîne correspond au motif, sinon false.
 */
export const isFormatted = (toValidate: string, regex: RegExp): boolean => {
    if (regex.test(toValidate)) return true;
    else return false;
  }

/**
 * @module YYYY-MM-DD
 */
export const interventionDateFormat: RegExp = /^\d{4}-\d{2}-\d{2}$/;

/**
 * @module YYYY-MM-DD-HH-MM-SS-MMM
 */
export const operationDateFormat: RegExp = /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}$/;