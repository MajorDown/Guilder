import style from '@/styles/components/FactureFilterBtn.module.css';

type FactureFilterBtnProps = {
    value: string;
    status: "à jour" | "en attente";
    onClick: (value: string) => void;
}

const FactureFilterBtn = (props: FactureFilterBtnProps):JSX.Element => {
    return (<button 
        className={style.factureFilterBtn}
        onClick={() => props.onClick(props.value)}
    >
        📂{props.value}{props.status === "à jour" ? '🟢' : '🟠'}
    </button>)
}

export default FactureFilterBtn;