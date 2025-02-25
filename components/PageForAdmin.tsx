import { ReactNode, useEffect, useState } from "react";
import { useAdminContext } from '@/contexts/adminContext';
import SectionLeft from "./SectionLeft"
import SectionRight from "./SectionRight"
import UINavLink from "./UI/UINavLink";
import LoadSpinner from "./LoadSpinner";


type PageForAdminProps = {
    children?: ReactNode;
    title: string;
    pseudoTitle: string;
    id: string;
}

/**
 * @description PageForAdmin component
 * @param {string} props.title
 * @param {string} props.id
 * @param {ReactNode} props.children
 * @returns {JSX.Element}
 */
const PageForAdmin = (props: PageForAdminProps) => {
    const { admin } = useAdminContext();
    const [adminIsChecked, setAdminIsChecked] = useState(false);

    useEffect(() => {
        setAdminIsChecked(true);
    }, [admin])

    return (<>
        <SectionLeft pseudoTitle={props.pseudoTitle}/>
        <SectionRight title={props.title} id={props.id}>
            {!adminIsChecked && <LoadSpinner message={"chargement de la page..."}/>}
            {adminIsChecked && !admin && (<>
                <p>Vous devez être connecté en tant qu'admin pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-dark.svg'} />
            </>)}
            {adminIsChecked && admin && props.children}
        </SectionRight>
    </>)
}

export default PageForAdmin;