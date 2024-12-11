import { ReactNode, useEffect, useState } from "react";
import { useMemberContext } from '@/contexts/memberContext';
import SectionLeft from "./SectionLeft"
import SectionRight from "./SectionRight"
import UINavLink from "./UI/UINavLink";
import LoadSpinner from "./LoadSpinner";


type PageForMemberProps = {
    children?: ReactNode;
    title: string;
    pseudoTitle: string;
    id: string;
}

/**
 * @description PageForMember component
 * @param {string} props.title
 * @param {string} props.id
 * @param {ReactNode} props.children
 * @returns {JSX.Element}
 */
const PageForMember = (props: PageForMemberProps) => {
    const { member } = useMemberContext();
    const [checkedMember, setCheckedMember] = useState(false);

    useEffect(() => {
        setCheckedMember(true);
    }, [member])

    return (<>
        <SectionLeft pseudoTitle={props.pseudoTitle}/>
        <SectionRight title={props.title} id={props.id}>
            {!checkedMember && <LoadSpinner message={"chargement de la page..."}/>}
            {checkedMember && !member && (<>
                <p>Vous devez être connecté en tant que membre pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-light.svg'} />
            </>)}
            {checkedMember && member && props.children}
        </SectionRight>
    </>)
}

export default PageForMember;