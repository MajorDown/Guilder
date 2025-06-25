'use client'
import {useState, useEffect} from 'react';
import { useMemberContext } from "@/contexts/memberContext";
import { useAdminContext } from "@/contexts/adminContext";
import { useguildConfigContext } from '@/contexts/guildConfigContext';
import PageLogo from '@/components/PageLogo';
import AppNavbar from '@/components/AppNavbar';
import UINavLink from '@/components/UI/UINavLink';
import GuildRulesViewer from '@/components/GuildRulesViewer';
import GuildRulesManager from '@/components/GuildRulesManager';

/**
 * @module Parameters
 */
const GuildRules = () => {
    const {member} = useMemberContext();
    const {admin} = useAdminContext();
    const {guildConfig, updateGuildConfig} = useguildConfigContext();
    const [checkedLogin, setCheckedLogin] = useState(false);

    useEffect(() => {
      setCheckedLogin(true);
    }, [admin, member])

  return (<>
    <section className={"section_left"}>
        <div id={"section_navigation"} className={"section_content"}>
            <PageLogo pseudoTitle='Règlement'/>
            <AppNavbar />
        </div>
    </section>
    <section className={"section_right"}>
        <div id="section_guildRules" className={"section_content"}>
            <h2>Règlement de la guilde</h2>
            {checkedLogin && !admin && !member && <>
                <p>Vous devez être connecté pour accéder à cette page !</p>
                <UINavLink label={"Se Connecter"} href={'/connexion'} icon={'/images/icons/membre-white-dark.svg'} />
            </>}
            {member && guildConfig && guildConfig.rules && <GuildRulesViewer
              rules={guildConfig.rules} 
            />}
            {admin && guildConfig && guildConfig.rules && <GuildRulesManager 
              admin={admin} 
              rules={guildConfig.rules}
              onUpdate={(newRules) => updateGuildConfig({...guildConfig, rules: newRules})}
            />}
        </div>
    </section>
  </>)
}

export default GuildRules;
