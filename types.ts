export type Guild = string;

export type UserName = string;
export type UserMail = string;
export type UserPassword = string;
export type UserPhone = string;
export type UserCounter = number

export type User = {
    name: UserName,
    mail: UserMail,
    password: UserPassword,
    phone: UserPhone,
    counter: UserCounter,
    guild: Guild
};

export type ConnectedUser = {
    token: string,
    name: UserName,
    mail: UserMail,
    phone: UserPhone,
    counter: UserCounter,
    guild: Guild
}

export type UserContext = {
    user: ConnectedUser,
    updateUser: (user: ConnectedUser) => void
}

export type OperationPoints = number;


export type Operation = {
    date: string,
    declarationDate: Date,
    worker: UserName,
    payer: UserName,
    point: OperationPoints,
    nature: string,
}

/*
 * fonction de vérification du format
 * @param {RegExp} regex - L'expression régulière à utiliser pour la vérification.
 * @param {string} toValidate - La chaîne de caractères à vérifier.
 * @returns {boolean} Retourne true si la chaîne correspond au motif, sinon false.
 */
export const isFormatted = (toValidate: string, regex: RegExp): boolean => {
  if (regex.test(toValidate)) return true;
  else return false;
}

export const operationDateFormat: RegExp = /^\d{4}-\d{2}-\d{2}$/;