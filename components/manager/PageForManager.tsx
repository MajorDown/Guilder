import { useManagerContext } from "@/contexts/managerContext";
import LoginManagerForm from "./LoginManagerForm";
import style from '@/styles/pages/manager/PageForManager.module.css'


type Props = {
    id: string,
    title: string,
    children: JSX.Element
}

const PageForManager = (props: Props): JSX.Element => {
    const {manager} = useManagerContext();

    return (<section id={props.id} className={style.pageForManager}>
        <h2>{props.title}</h2>
        {manager ? props.children : <>
            <p>Vous devez vous connecter en tant que manager pour accéder à cette page</p>
            <LoginManagerForm />
        </>}
    </section>
    )
}

export default PageForManager;