'use client'
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
        <UINavLink 
          label={"Outils"} 
          href={'/config'} 
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/outils-white-light.svg'} 
          activedIcon={'/images/icons/outils-green.svg'} 
          showActivation
        />
        <UINavLink 
          label={"Membres"} 
          href={'/membres'}
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/membres-white-light.svg'} 
          activedIcon={'/images/icons/membres-green.svg'} 
          showActivation
        />
        <UINavLink 
          label={"Arbitrage"} 
          href={'/arbitrage'}
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/arbitrage-white-light.svg'} 
          activedIcon={'/images/icons/arbitrage-green.svg'} 
          showActivation
        />
        <UINavLink 
          label={"Options"} 
          href={'/options'}
          iconWidth={100}
          iconHeight={100} 
          icon={'/images/icons/options-white-light.svg'} 
          activedIcon={'/images/icons/options-green.svg'} 
          showActivation
        />
        <UINavLink
          label={"Règlement"} 
          href={'/guildRules'}
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/rules-white-light.svg'} 
          activedIcon={'/images/icons/rules-green.svg'} 
          showActivation 
        />
      </>)}
      {!admin && member && (<>
        <UINavLink 
          label={"Déclarer"} 
          href={'/declaration'}
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/declaration-white-light.svg'} 
          activedIcon={'/images/icons/declaration-green.svg'} 
          showActivation
        />
        <UINavLink 
          label={"Historique"} 
          href={'/historique'} 
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/historique-white-light.svg'} 
          activedIcon={'/images/icons/historique-green.svg'} 
          showActivation
        />
        <UINavLink 
          label={"Soldes"} 
          href={'/guilde'}
          iconWidth={100}
          iconHeight={100} 
          icon={'/images/icons/guilde-white-light.svg'} 
          activedIcon={'/images/icons/guilde-green.svg'} 
          showActivation
        />
        <UINavLink 
          label={"Options"} 
          href={'/options'}
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/options-white-light.svg'} 
          activedIcon={'/images/icons/options-green.svg'} 
          showActivation
        />
        <UINavLink
          label={"Règlement"} 
          href={'/guildRules'}
          iconWidth={100}
          iconHeight={100}
          icon={'/images/icons/rules-white-light.svg'} 
          activedIcon={'/images/icons/rules-green.svg'} 
          showActivation 
        />
      </>)}
    </nav>)
}

export default AppNavbar;