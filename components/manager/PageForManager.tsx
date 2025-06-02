'use client'
import { useManagerContext } from "@/contexts/managerContext";
import LoginManagerForm from "./LoginManagerForm";
import style from '@/styles/pages/manager/PageForManager.module.css'
import CreateManagerForm from "./createManagerForm";
import UILink from "../UI/UILink";
import { usePathname } from "next/navigation";


type Props = {
    id: string,
    title: string,
    children: JSX.Element
}

const PageForManager = (props: Props): JSX.Element => {
    const {manager} = useManagerContext();
    const pathName = usePathname();

    return (<section id={props.id} className={style.pageForManager}>
        <div className={style.sectionHeader}>
            {manager && <>
                <nav>
                    <UILink 
                        href={"/gestion/contrats"} 
                        color={pathName === "/gestion/contrats" ? "light" : "dark"}
                    >
                        <p>Suivi des Contrats</p>
                    </UILink>
                    <UILink 
                        href={"/gestion/guildes"} 
                        color={pathName === "/gestion/guildes" ? "light" : "dark"}
                    >
                        <p>Suivi des Guildes</p>
                    </UILink>
                    <UILink 
                        href={"/gestion/claims"} 
                        color={pathName === "/gestion/claims" ? "light" : "dark"}
                    >
                        <p>Suivi des réclamations</p>
                    </UILink>
                </nav>
                <h2>{props.title}</h2>
            </>}
        </div>
        {manager ? <>
            {props.children}
        </> : <>
            <p>Vous devez vous connecter en tant que manager pour accéder à cette page</p>
            <LoginManagerForm />
            {/* <p>S'il n'existe pas encore de manager, remplissez le formulaire ci-desous</p>
            <CreateManagerForm /> */}
        </>}
    </section>
    )
}

export default PageForManager;