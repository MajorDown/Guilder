/**
 * Génère un format de date spécifique
 * ()declaration : YYYY-MM-DD-HH-MM-SS-MMM, intervention : YYYY-MM-DD)
 * 
 * @param {string} format - The format of the date to generate
 * @returns {string} - The generated date
 */
export const dateGenerator = (format: "declaration" | "intervention"): string => {
    const date = new Date();
    switch (format) {
        case "declaration": {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const milliseconds = date.getMilliseconds();
            return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${milliseconds}`;
        }
        case "intervention": {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}-${month}-${day}`;
        }

    }
}