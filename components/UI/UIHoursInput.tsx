import { useEffect, useState } from "react";

type Hours = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 
    13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;

type Decimals = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Centimals = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type UIHoursInputProps = {
    initialValue?: number;
    onChangeValue: (value: number) => void;
}

const UIHoursInput = (props: UIHoursInputProps) => {
    const [hours, setHours] = useState<Hours>(0);
    const [decimals, setDecimals] = useState<Decimals>(0);
    const [centimals, setCentimals] = useState<Centimals>(0);
    const [GlobalValue, setGlobalValue] = useState<number>();

    useEffect(() => {
        setGlobalValue(Number(`${hours}.${decimals}${centimals}`));
        props.onChangeValue(Number(`${hours}.${decimals}${centimals}`));
    }, [hours, decimals, centimals]);

    //GESTION DES HEURES
    const IncreaseHours = () => {
        if (hours === 23) setHours(0);
        else if (hours < 24) setHours(hours + 1 as Hours);
    }

    const DecreaseHours = () => {
        if (hours === 0) setHours(23);
        else if (hours > 0) setHours(hours - 1 as Hours);
    }

    //GESTION DES DECIMALES
    const IncreaseDecimals = () => {
        if (decimals === 9) {
            setDecimals(0);
            IncreaseHours();
        } 
        else if (decimals < 9) setDecimals(decimals + 1 as Decimals)
    }

    const DecreaseDecimals = () => {
        if (decimals === 0) {
            setDecimals(9);
            DecreaseHours();
        } 
        else if (decimals > 0) setDecimals(decimals - 1 as Decimals)
    }

    //GESTION DES CENTIEMES
    const IncreaseCentimals = () => {
        if (centimals === 9) {
            setCentimals(0);
            IncreaseDecimals();
        } 
        else if (centimals < 9) setCentimals(centimals + 1 as Centimals)
    }

    const DecreaseCentimals = () => {
        if (centimals === 0) {
            setCentimals(9);
            DecreaseDecimals();
        } 
        else if (centimals > 0) setCentimals(centimals - 1 as Centimals)
    }

    return (
        <div className={"UIHoursInput"}>
            <div className={"hours"}>
                <button onMouseDown={() => IncreaseHours()} type="button">+</button>
                <p>{hours}</p>
                <button onMouseDown={() => DecreaseHours()} type="button">-</button>
            </div>
            <p>,</p>
            <div className={"decimals"}>
                <button onMouseDown={() => IncreaseDecimals()} type="button">+</button>
                <p>{decimals}</p>
                <button onMouseDown={() => DecreaseDecimals()} type="button">-</button>
            </div>
            <div className={"centimals"}>
                <button onMouseDown={() => IncreaseCentimals()} type="button">+</button>
                <p>{centimals}</p>
                <button onMouseDown={() => DecreaseCentimals()} type="button">-</button>
            </div>
        </div>       
    );
}

export default UIHoursInput;