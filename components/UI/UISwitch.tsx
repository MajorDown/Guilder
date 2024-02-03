import {useState} from 'react'

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

    const handleChangeValue = () => {
        setValue(!value);
        props.onChange(!value);
    }

  return (
    <div 
        className="UISwitch"
        style={{
            minWidth: props.minWidth,
            height: "20px",
            display: "flex",
            flexDirection: value ? "row-reverse" : "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "2px",
            borderRadius: "11px",
            border: `solid 3px black`,
            backgroundColor: value ? "#7bff003e" : "#ff00003e",
            transition: "0.3s",
            cursor: "pointer",
        }}
        onClick={() => handleChangeValue()}
    >
        <p
            className="UISwitchValue"
            style={{
                display: "flex",
                borderRadius: "50px",
                transition: "0.3s",
                cursor: "pointer",
            }}
            onClick={() => handleChangeValue()}
        >
            {value ? props.options[0] : props.options[1]}
        </p>
        <div 
            className="UISwitchBtn"
            style={{
                height: "110%",
                aspectRatio: "1/1",
                borderRadius: "50%",
                border: `solid 3px black`,
                transition: "0.3s",
                cursor: "pointer",
                backgroundColor: "grey",
            }}
            onClick={() => handleChangeValue()}
        ></div>
    </div>
  )
}

export default UISwitch;