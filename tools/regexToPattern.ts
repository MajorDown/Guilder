/**
 * Convertit une expression régulière (RegExp) en une chaîne de caractères adaptée pour l'attribut `pattern` d'un élément HTML `<input>`.
 * 
 * @param {RegExp} regex - L'expression régulière à convertir.
 * @returns {string} La chaîne de caractères résultante, adaptée pour l'usage dans l'attribut `pattern`.
 */
const regexToPattern = (regex: RegExp): string => {
    return regex.toString().replace(/^\/|\/$/g, '');
}

export default regexToPattern;