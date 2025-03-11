import { Package } from "./types";


export const labels = {
    society: "Agriguilder",
    adress: {
        line1: "SARL Gabillaud",
        line2: "la Riollière",
        code: "85140",
        city: "Saint-Martin-des-Noyers",
        country: "France"
    },
    siret: "123456789"
}

export const TVA: number = 0.2;

export const packages: Package[] = [
    {
        id: 1,
        rules: {
            min: 1,
            max: 20
        },
        price: 40
    },
    {
        id: 2,
        rules: {
            min: 21,
            max: 50
        },
        price: 45
    },
    {
        id: 3,
        rules: {
            min: 51,
            max: 100
        },
        price: 50
    },
    {
        id: 4,
        rules: {
            min: 101,
            max: 1000
        },
        price: 55
    }
]
