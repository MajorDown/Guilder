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
    const [memberIsChecked, setMemberIsChecked] = useState(false);

    useEffect(() => {
        setMemberIsChecked(true);
    }, [member])

    return (<>
        <SectionLeft pseudoTitle={props.pseudoTitle}/>
        <SectionRight title={props.title} id={props.id}>
            {!memberIsChecked && <LoadSpinner message={"chargement de la page..."}/>}
            {memberIsChecked && !member && (<>
                <p>Vous devez être connecté en tant que membre pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-dark.svg'} />
            </>)}
            {memberIsChecked && member && props.children}
        </SectionRight>
    </>)
}

export default PageForMember;