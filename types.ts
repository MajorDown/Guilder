export type Guild = string;

export type UserName = string;
export type UserMail = string;
export type UserPassword = string;
export type UserPhone = number;
export type UserCounter = number

export type User = {
    name: UserName,
    mail: UserMail,
    password: UserPassword,
    phone: UserPhone,
    counter: UserCounter,
    guild: Guild
};

export type OperationPoint = number;

export type Operation = {
    date: Date,
    declarationDate: Date,
    worker: UserName,
    payer: UserName,
    point: OperationPoint,
    nature: string,
}