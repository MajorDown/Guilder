'use client'
import { useState, useEffect } from 'react';
import { ConnectedAdmin, ConnectedMember} from '@/types';
import { useAdminContext } from '@/contexts/adminContext';
import { useMemberContext } from '@/contexts/memberContext';
import UINavLink from './UI/UINavLink';

/**
 * @function AppNavbar
 * @description NavBar conditionnelle de l'application.
 * @returns {JSX.Element} La NavBar de l'application.
 */
const AppNavbar = () => {
    const {admin} = useAdminContext();
    const {member} = useMemberContext();
    
    if (admin || member) return (<nav id={"appNavbar"}>
      {admin && (<>
        <UINavLink label={"Membres"} href={'/membres'} icon={'/images/guild.svg'} showActivation/>
        <UINavLink label={"Outils"} href={'/config'} icon={'/images/tools.svg'} showActivation/>
        <UINavLink label={"Arbitrage"} href={'/arbitrage'} icon={'/images/justice.svg'} showActivation/>
        <UINavLink label={"Options"} href={'/options'} icon={'/images/options.svg'} showActivation/>
      </>)}
      {!admin && member && (<>
        <UINavLink label={"Déclarer"} href={'/declaration'} icon={'/images/new-intervention.svg'} showActivation/>
        <UINavLink label={"Historique"} href={'/historique'} icon={'/images/stats.svg'} showActivation/>
        <UINavLink label={"Guilde"} href={'/guilde'} icon={'/images/guild.svg'} showActivation/>
        <UINavLink label={"Options"} href={'/options'} icon={'/images/options.svg'} showActivation/>
      </>)}
    </nav>)
}

export default AppNavbar;