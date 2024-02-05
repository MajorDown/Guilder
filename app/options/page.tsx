'use client'
import PasswordUpdater from "@/components/PasswordUpdater";
import { useMemberContext } from "@/contexts/memberContext";
import { useAdminContext } from "@/contexts/adminContext";

/**
 * @module Parameters
 */
const Parameters = () => {
    const {member} = useMemberContext();
    const {admin} = useAdminContext();

  return (
    <section id="parametersSection">
        <h2>Paramètres de votre compte</h2>
        <p>Modifiez ici vos informations</p>
        {(admin || member) && (<div>
            <PasswordUpdater 
              status={admin ? "admin" : "member"} 
              user={{
                  mail: admin?.mail || member?.mail,
                  token: admin?.token || member?.token
              }} 
            />
        </div>)}
    </section>
  )
}

export default Parameters;
