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

export type UsersList = User[];

export type Member = Omit<User, 'password'> & 
{ password: null };

export type MembersList = Member[];

export type GuildContext = {
    members: MembersList | null;
    updateMembers: (members: MembersList | null) => void
}

export type ConnectedUser = {
    token: string,
    name: UserName,
    mail: UserMail,
    phone: UserPhone,
    counter: UserCounter,
    guild: Guild
}

export type UserContext = {
    user: ConnectedUser | null,
    updateUser: (user: ConnectedUser | null) => void
}

export type OperationPoints = 1 | 2 | 3 |4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;


export type Operation = {
    declarationDate: Date,
    date: string,
    worker: UserName,
    payer: UserName,
    points: OperationPoints,
    nature: string,
}

export type UserOperations = Operation[];

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