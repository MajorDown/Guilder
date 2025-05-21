'use client'
import { useAdminContext } from "@/contexts/adminContext";
import ConfigManager from '@/components/ConfigManager';
import PageForAdmin from '@/components/PageForAdmin';

/**
 * @module Config
 * 
 * Nécessite d'être connecté en tant qu'admin pour accéder à cette page.
 */
const Config = () => {
    const {admin} = useAdminContext();

    return (<PageForAdmin title={'Les outils de la guilde'} pseudoTitle={'Outils'} id={'section_config'}>
        <p>Gérez ici les outils disponibles lorsqu'un membre déclare une intervention</p>
        {admin && <ConfigManager />}
    </PageForAdmin>
    )
  }
  
  export default Config;