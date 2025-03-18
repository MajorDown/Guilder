type FactureFilterBtnProps = {
    value: string;
}

const FactureFilterBtn = (props: FactureFilterBtnProps):JSX.Element => {
    return (<button>📂{props.value}</button>)
}

export default FactureFilterBtn;