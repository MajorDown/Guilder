'use client'
import { useState, useEffect} from 'react';
import { useMemberContext } from '@/contexts/memberContext';
import UINavLink from '@/components/UI/UINavLink';

const Declaration = () => {
    const { member } = useMemberContext();
    const [checkedMember, setCheckedMember] = useState(false);

    useEffect(() => {
        setCheckedMember(true);
    }, [member])
    
    return (
        <section id="declarationSection">
            <h2>Déclarez une nouvelle intervention</h2>
            {checkedMember && !member && <>
                <p>Vous devez être connecté pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/user.svg'} />
            </>}
        </section>
  )
}

export default Declaration;