'use client'
import { useState, useEffect} from 'react';
import { useMemberContext } from '@/contexts/memberContext';
import UINavLink from '@/components/UI/UINavLink';
import InterventionForm from '@/components/InterventionForm';
import AppNavbar from '@/components/AppNavbar';
import PageLogo from '@/components/PageLogo';

const Declaration = () => {
    const { member } = useMemberContext();
    const [checkedMember, setCheckedMember] = useState(false);

    useEffect(() => {
        setCheckedMember(true);
    }, [member])
    
    return (<>
        <section className={"section_left"}>
            <div id={"section_navigation"} className={"section_content"}>
                <PageLogo pseudoTitle='Déclarer'/>
                <AppNavbar />
            </div>
        </section>
        <section className={"section_right"}>
            <div id="section_declaration" className={"section_content"}>
                <h2>Déclarez une nouvelle intervention</h2>
                {checkedMember && !member && <>
                    <p>Vous devez être connecté pour accéder à cette page !</p>
                    <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-light.svg'} />
                </>}
                {checkedMember && member && <InterventionForm />}
            </div>
        </section>
    </>)
}

export default Declaration;