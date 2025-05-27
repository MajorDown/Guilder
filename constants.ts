import { Package } from "./types";



export const labels = {
    society: "Agriguilder",
    adress: {
        line1: "AE Romain Fouillaron",
        line2: "4 rue du Lavoir",
        code: "85120",
        city: "Antigny",
        country: "France"
    },
    siret: "123456789",
    mail: "app.agriguilder@gmail.com",
    tel : "01 12 23 34 45"
}

export const RIB = {
    IBAN: "FR76 1234 5678 9012 3456 7890 123",
    BIC: "ABCDEFGHIJK"
}

export const TVA: number = 0;

export const packages: Package[] = [
    {
        id: 0,
        rules: {
            min: 0,
            max: 0
        },
        price: 0
    },
    {
        id: 1,
        rules: {
            min: 4,
            max: 10
        },
        price: 35
    },
    {
        id: 2,
        rules: {
            min:11,
            max: 20
        },
        price: 45
    },
    {
        id: 3,
        rules: {
            min: 21,
            max: 50
        },
        price: 55
    },
    {
        id: 4,
        rules: {
            min: 51,
            max: 1000
        },
        price: 65
    }
]
