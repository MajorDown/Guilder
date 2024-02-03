import {FormEvent, useState} from 'react'

export type UISwitchProps = {
    minWidth?: string;
    options: [
        ifIsTrue: string,
        ifIsFalse: string
    ],
    btnColor?: string;
    trueColor?: string;
    falseColor?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const UISwitch = (props: UISwitchProps) => {
    const [value, setValue] = useState<boolean>(props.value);

    const handleChangeValue = (event: FormEvent) => {
        event.stopPropagation();
        setValue(!value);
        props.onChange(!value);
    }
    
    return (
    <div 
        className="UISwitch"
        style={{
            minWidth: props.minWidth,
            height: "24px",
            position: "relative",
            borderRadius: "16px",
            border: `solid 3px black`,
            backgroundColor: value ? "#7bff003e" : "#ff00003e",
            transition: "0.3s",
            cursor: "pointer",
        }}
        onClick={(event) => handleChangeValue(event)}
    >
        <p
            className="UISwitchValue"
            style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: value ? "5px" : "",
                right: value ? "" : "5px",
                fontSize: "16px",
                transition: "0.3s",
                cursor: "pointer",
            }}
            onClick={(event) => handleChangeValue(event)}
        >
            {value ? props.options[0] : props.options[1]}
        </p>
        <div 
            className="UISwitchBtn"
            style={{
                height: "80%",
                position: "absolute",
                left: value ? "100%" : "0%",
                transform: value ? "translateX(-100%)" : "translateX(0%)",
                aspectRatio: "1/1",
                borderRadius: "10px",
                border: `solid 3px black`,
                transition: "0.3s",
                cursor: "pointer",
                backgroundColor: "grey",
            }}
            onClick={(event) => handleChangeValue(event)}
        ></div>
    </div>
  )
}

export default UISwitch;