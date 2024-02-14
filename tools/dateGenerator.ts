/**
 * Génère un format de date spécifique
 * ()declaration : YYYY-MM-DD-HH-MM-SS-MMM, intervention : YYYY-MM-DD)
 * 
 * @param {string} format - The format of the date to generate
 * @returns {string} - The generated date
 */
export const dateGenerator = (format: "declaration" | "intervention"): string => {
    const date = new Date();
    const pad = (number: number): string => number < 10 ? `0${number}` : number.toString();
    const formatMilliseconds = (milliseconds: number): string => {
        if (milliseconds < 10) {
            return `00${milliseconds}`;
        } else if (milliseconds < 100) {
            return `0${milliseconds}`;
        } else {
            return milliseconds.toString();
        }
    };
    switch (format) {
        case "declaration": {
            const year = date.getFullYear();
            const month = pad(date.getMonth() + 1);
            const day = pad(date.getDate());
            const hours = pad(date.getHours());
            const minutes = pad(date.getMinutes());
            const seconds = pad(date.getSeconds());
            const milliseconds = formatMilliseconds(date.getMilliseconds());
            return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${milliseconds}`;
        }
        case "intervention": {
            const year = date.getFullYear();
            const month = pad(date.getMonth() + 1);
            const day = pad(date.getDate());
            return `${year}-${month}-${day}`;
        }
    }
}
