'use client'
import { useAdminContext} from "@/contexts/adminContext";
import MembersManager from '@/components/MembersManager';
import PageForAdmin from '@/components/PageForAdmin';

/**
 * @module Membres
 * 
 * Nécessite d'être connecté en tant qu'admin pour accéder à cette page.
 */
const Membres = () => {
    const { admin } = useAdminContext();

    return (<PageForAdmin title={'Les membres de la guilde'} pseudoTitle={'Membres'} id={'section_membres'}>
        <p>Checkez ici le statut des membres, et gerez leur inscription / suppression</p>
        {admin && <MembersManager admin={admin}/>}
    </PageForAdmin>)
}
  
  export default Membres;