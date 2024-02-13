'use client'
import { useState, useEffect } from 'react';
import { useMemberContext } from '@/contexts/memberContext';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import UINavLink from '@/components/UI/UINavLink';
import LoadSpinner from '@/components/LoadSpinner';
import MembersLister from '@/components/MembersLister';
import { MembersList } from '@/types';

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

    return (
      <section id="MembersSection">
        <h2>Les membres de la Guilde</h2>
        {!hasCheckedMember && <LoadSpinner />}
        {hasCheckedMember && member && <>
            <MembersLister members={membersList}/>
        </>}
        {hasCheckedMember && !member && <>
            <p>Vous devez être connecté pour accéder à cette page !</p>
            <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
        </>}
      </section>
  )
}

export default Guilde;