// TYPES GENERIQUES DES USERS

export type Guild = string;
export type UserName = string;
export type UserMail = string;
export type UserPassword = string;
export type UserPhone = string;
export type UserCounter = number
export type UserStatus = 'admin' | 'member';

export type NewMemberInfos = {
    mail: UserMail, 
    name: UserName, 
    phone: UserPhone, 
    guild: Guild
}

// TYPES POUR ADMIN

export type Admin = {
    name: UserName,
    mail: UserMail,
    phone: UserPhone,
    guild: Guild,
    password: UserPassword;
}

export type ConnectedAdmin = Omit<Admin, 'password'> & { token: string };

export type AdminContext = {
    admin: ConnectedAdmin | null,
    updateAdmin: (admin: ConnectedAdmin | null) => void,
}

// TYPES POUR MEMBER

export type Member = {
    name: UserName,
    mail: UserMail,
    phone: UserPhone,
    guild: Guild,
    password: UserPassword;
    counter: UserCounter
}

export type ConnectedMember = Omit<Member, 'password'> & { token: string };

export type MemberContext = {
    member: ConnectedMember | null,
    updateMember: (member: ConnectedMember | null) => void
}

export type MembersList = Omit<Member, 'password'>[];

// TYPES POUR INTERVENTIONS

export type InterventionHours = 1 | 2 | 3 |4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

export type Intervention = {
    declarationDate: string, // format YYYY-MM-DD-HH-MM-SS-MMM
    interventionDate: string, // format YYYY-MM-DD
    worker: UserName,
    payer: UserName,
    hours: InterventionHours,
    options: {option: string, coef: number}[] | string[]
    description: string;
    imagesUrls?: string[];
}

export type MemberInterventions = Intervention[];

// TYPES POUR GUILDS

export type GuildConfig = {
    name: Guild,
    config: {
        option: string,
        coef: number,
        enabled: boolean
    }[]
}

export type Contestation = {
    contestationDate: string // format YYYY-MM-DD-HH-MM-SS-MMM
    contester: UserName,
    contesterMessage: string,
    contestedIntervention: Intervention,
    adminConclusion: 'accordé' | 'refusé' | 'en attente';
    adminMessage?: string;
    guild: Guild;
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

export const interventionDateFormat: RegExp = /^\d{4}-\d{2}-\d{2}$/;


