import style from '@/styles/components/FactureFilterBtn.module.css';

type FactureFilterBtnProps = {
    value: string;
    status: "à jour" | "en attente";
}

const FactureFilterBtn = (props: FactureFilterBtnProps):JSX.Element => {
    return (<button className={style.factureFilterBtn}>
        📂{props.value}{props.status === "à jour" ? '🟢' : '🟠'}
    </button>)
}

export default FactureFilterBtn;