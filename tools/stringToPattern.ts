/**
 * Convertit une string en une chaîne de caractères adaptée pour l'attribut `pattern` d'un élément HTML `<input>`.
 * 
 * @param {RegExp} str - La chaine de caractère à convertir.
 * @returns {string} La chaîne de caractères résultante, adaptée pour l'usage dans l'attribut `pattern`.
 */
const stringToPattern = (str: string): string => {
    const escapedStr = str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return '^' + escapedStr + '$';
}

export default stringToPattern;