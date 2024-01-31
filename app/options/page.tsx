'use client'
import PasswordUpdater from "@/components/PasswordUpdater";
import { useUserContext } from "@/contexts/userContext";
import { useAdminContext } from "@/contexts/adminContext";

/**
 * @module Parameters
 */
const Parameters = () => {
    const {user } = useUserContext();
    const {admin} = useAdminContext();

    const whoIsConnected = {
        name: admin?.name || user?.name,
        token: admin?.token || user?.token
    }

  return (
    <section id="parametersSection">
        <h2>Paramètres de votre compte</h2>
        <p>Modifiez ici vos informations</p>
        {(admin || user) && (<div>
            <PasswordUpdater 
              role={admin ? "admin" : "user"} 
              who={whoIsConnected} 
            />
        </div>)}
    </section>
  )
}

export default Parameters;
