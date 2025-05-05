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
    guild: Guild,
    initialCount: UserCounter
}

// TYPES POUR LE GOD

export type God = {
    name: UserName,
    mail: UserMail,
    phone: UserPhone,
    password: UserPassword;
}

export type ConnectedGod = Omit<God, 'password'> & { token: string };

export type GodContext = {
    god: ConnectedGod | null,
    updateGod: (god: ConnectedGod | null) => void,
}

// TYPES POUR ADMIN

export type Admin = {
    name: UserName,
    mail: UserMail,
    phone: UserPhone,
    guild: Guild,
    password: UserPassword;
    authPersistence?: boolean;
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

export type ConnectedUser = ConnectedAdmin | ConnectedMember;

// TYPES POUR INTERVENTIONS

export type Intervention = {
    declarationDate: string, // format YYYY-MM-DD-HH-MM-SS-MMM
    interventionDate: string, // format YYYY-MM-DD
    worker: UserName,
    payer: UserName,
    hours: number,
    options: {option: string, coef: number}[] | string[]
    description: string;
    imagesUrls?: string[];
}

export type MemberInterventions = Intervention[];

// TYPES POUR GUILDS

export type Tool = {
    option: string,
    coef: number,
    enabled: boolean
}

export type GuildRules = string[];

export type Adress = {
    line1: string,
    line2?: string,
    code: number,
    city: string,
    country: string
}

export type GuildConfig = {
    name: Guild,
    config: Tool[],
    rules?: GuildRules,
    adress?: Adress,
    phone?: UserPhone,
    mail?: UserMail,
    currentPackageId: Package['id'],
    currentPeriod: FacturationPeriod,
    currentPeriodStart: MonthNumber,
}

export type GuildConfigContext = {
    guildConfig: GuildConfig | null,
    updateGuildConfig: (guildConfig: GuildConfig | null) => void
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

export const factureIdFormat: RegExp = /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}$/;

// TYPES POUR LES FACTURATIONS

export const MonthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export type MonthNumber = typeof MonthNumbers[number];

export type Package = {
    id: 0 | 1 | 2 | 3 | 4;
    rules: {
        min: number,
        max: number
    },
    price: number
}

export type FacturationPeriod = 'annual' | 'monthly';

export type FacturationStatus = 'pending' | 'paid';

export const StatusIcons = {
    'pending': '⏳',
    'paid': '✅',
    'sentToClient': '🚀',
    '!sentToClient': '📝'
}

export type Facture = {
    id: string;
    client: Omit<GuildConfig, 'rules' | 'config'>,
    reduction?: {
        unit: 'percentage' | 'amount',
        value: number
    },
    sentToClient: boolean,
    status: FacturationStatus,
}

// TYPES POUR LES REQUETES

export type Claim = {
    id: string // format YYYY-MM-DD-HH-MM-SS-MMM
    claimer: UserName,
    claimerRole: 'admin' | 'member',
    guild: string,
    message: string,
    category: 'intervention' | 'contestation' | 'outils' | 'facture' | 'autre',
    status: 'en attente' | 'traitée';
    contactMethod: 'mail' | 'phone'
}