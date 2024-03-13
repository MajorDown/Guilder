'use client'
import { ConnectedAdmin, MembersList } from '@/types';
import {useState, useEffect} from 'react';
import MemberSignupForm from './MemberSignupForm';
import UIButton from './UI/UIButton';
import { getGuildMembers } from '@/tools/front/getGuildMembers';
import MembersLister from './MembersLister';

export type MembersManagerProps = {
    admin: ConnectedAdmin;
}

/**
 * @function MembersManager
 * @description Composant pour la gestion des membres.
 * @param {MembersManagerProps} props - Les props du composant.
 * @param {ConnectedAdmin} props.admin - L'admin connecté.
 * @returns {JSX.Element} La gestion des membres.
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
                <button id={"quitBtn"} onClick={() => setWantNewMember(false)}>Annuler</button>
            </> :
            <button id={"createMemberBtn"} onClick={() => setWantNewMember(true)}>Inscrire un nouveau membre</button>
            }
        </div>
    )
}

export default MembersManager;