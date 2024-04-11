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

export type InterventionHours = 0.25 | 0.50 | 0.75 | 1 | 1.25 | 1.50 | 1.75 | 2 | 
    2.25 | 2.50 | 2.75 | 3 | 3.25 | 3.50 | 3.75 | 4 | 4.25 | 4.50 | 4.75 | 5 | 
    5.25 | 5.50 | 5.75 | 6 | 6.25 | 6.50 | 6.75 | 7 | 7.25 | 7.50 | 7.75 | 8 | 
    8.25 | 8.50 | 8.75 | 9 | 9.25 | 9.50 | 9.75 | 10 | 10.25 | 10.50 | 10.75 | 11 | 
    11.25 | 11.50 | 11.75 | 12 | 12.25 | 12.50 | 12.75 | 13 | 13.25 | 13.50 | 13.75 | 
    14 | 14.25 | 14.50 | 14.75 | 15 | 15.25 | 15.50 | 15.75 | 16 | 16.25 | 16.50 | 
    16.75 | 17 | 17.25 | 17.50 | 17.75 | 18 | 18.25 | 18.50 | 18.75 | 19 | 19.25 | 
    19.50 | 19.75 | 20 | 20.25 | 20.50 | 20.75 | 21 | 21.25 | 21.50 | 21.75 | 22 |
    22.25 | 22.50 | 22.75 | 23 | 23.25 | 23.50 | 23.75 | 24;

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


