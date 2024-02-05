'use client'
import { ConnectedAdmin, MembersList } from '@/types';
import {useState, useEffect, useRef, FormEvent} from 'react';
import MemberSignupForm from './MemberSignupForm';
import UIButton from './UI/UIButton';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import MembersLister from './MembersLister';

export type MembersManagerProps = {
    admin: ConnectedAdmin;
}

/**
 * @module MembersManager
 * 
 * Permet de gérer les membres de la guilde.
 */
const MembersManager = (props: MembersManagerProps) => {
    const [wantNewMember, setWantNewMember] = useState<boolean>(false);
    const [membersList, setMembersList] = useState<MembersList>([]);
    const [hasNewMember, setHasNewMember] = useState<boolean>(false);

    useEffect(() => {
        setHasNewMember(false);
        const getMembers = async () => {
            const response = await getGuildMembers(props.admin) as MembersList;
            if (response) setMembersList(response);
        }
        getMembers();
    }, [hasNewMember])
    
    return (
        <div id="membersManager">
            {membersList[0] && <MembersLister members={membersList} />}
            {wantNewMember ?
            <>
                <MemberSignupForm admin={props.admin} onSignup={() => setHasNewMember(true)}/>
                <UIButton onClick={() => setWantNewMember(false)}>Annuler l'inscription d'un nouveau membre</UIButton>
            </> :
            <UIButton onClick={() => setWantNewMember(true)}>Inscrire un nouveau membre</UIButton>
            }
        </div>
    )
}

export default MembersManager;