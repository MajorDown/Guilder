'use client'
import { useState, useEffect } from 'react';
import { useMemberContext } from '@/contexts/memberContext';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import MembersLister from '@/components/MembersLister';
import { MembersList } from '@/types';

import PageForMember from '@/components/PageForMember';

const Guilde = () => {
    const { member } = useMemberContext();
    const [membersList, setMembersList] = useState<MembersList>([]);

    useEffect(() => {
        if (member) {
            const getMembers = async () => {
                const response = await getGuildMembers(member) as MembersList;
                if (response) setMembersList(response);
            }
            getMembers();
        }
    }, [member])
    
    return (<PageForMember 
        title={'Les Membres de la guilde'} 
        pseudoTitle={'Soldes'} 
        id={'section_guilde'}
    >
        <p>Besoin d'un coup de main ? ou au contraire envie de contribuer ? Voici la liste des membres de votre guilde, ainsi que leurs soldes. N'hésitez pas à les contacter !</p>
        {member && <MembersLister members={membersList}/>}
    </PageForMember>)
}

export default Guilde;