'use client'
import PasswordUpdater, {PasswordUpdaterProps} from "@/components/PasswordUpdater";
import { useMemberContext } from "@/contexts/memberContext";
import { useAdminContext } from "@/contexts/adminContext";

/**
 * @module Parameters
 */
const Parameters = () => {
    const {member} = useMemberContext();
    const {admin} = useAdminContext();

    const connectedUserInfos = {
        mail: admin?.mail || member?.mail,
        token: admin?.token || member?.token
    }
    

  return (
    <section id="parametersSection">
        <h2>Paramètres de votre compte</h2>
        <p>Modifiez ici vos informations</p>
        {(admin || member) && (<div>
            <PasswordUpdater 
              status={admin ? "admin" : "member"} 
              user={connectedUserInfos || null} 
            />
        </div>)}
    </section>
  )
}

export default Parameters;
