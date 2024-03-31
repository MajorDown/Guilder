'use client'
import { useState, useEffect } from 'react';
import { useMemberContext } from '@/contexts/memberContext';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import UINavLink from '@/components/UI/UINavLink';
import LoadSpinner from '@/components/LoadSpinner';
import MembersLister from '@/components/MembersLister';
import { MembersList } from '@/types';
import AppNavbar from '@/components/AppNavbar';
import PageLogo from '@/components/PageLogo';

const Guilde = () => {
    const { member } = useMemberContext();
    const [hasCheckedMember, setHasCheckedMember] = useState(false);
    const [membersList, setMembersList] = useState<MembersList>([]);

    useEffect(() => {
        setHasCheckedMember(true);
    }, [member])

    useEffect(() => {
        if (member) {
            const getMembers = async () => {
                const response = await getGuildMembers(member) as MembersList;
                if (response) setMembersList(response);
            }
            getMembers();
        }
    }, [hasCheckedMember])

    
    return (<>
        <section className={"section_left"}>
            <div id={"section_navigation"} className={"section_content"}>
                <PageLogo pseudoTitle='Guilde'/>
                <AppNavbar />
            </div>
      </section>
      <section className={"section_right"} >
        <div id="section_guilde" className={"section_content"}>
            <h2>Les membres de la Guilde</h2>
            <p>Besoin d'un coup de main ? ou au contraire envie de contribuer ? Voici la liste des membres de votre guilde, ainsi que leurs soldes. N'hésitez pas à les contacter !</p>
            {!hasCheckedMember && <LoadSpinner />}
            {hasCheckedMember && member && <MembersLister members={membersList}/>}
            {hasCheckedMember && !member && <>
                <p>Vous devez être connecté pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-light.svg'} />
            </>}
        </div>

      </section>
    </>)
}

export default Guilde;