import { useState, useEffect } from "react";
import Image from "next/image";
import { useAdminContext } from "@/contexts/adminContext";
import updateAuthPersistence from "@/tools/front/updateAuthPersistence";

const AuthPersistenceManager = () => {
    const {admin, updateAdmin} = useAdminContext();
    const [authPersistence, setAuthPersistence] = useState<boolean>();
    const [error, setError] = useState<string>("");

    const initAuthPersistence = () => {
        if (admin) setAuthPersistence(admin.authPersistence);
    }

    useEffect(() => {
        initAuthPersistence();
    }, [admin]);

    const handleChangeAuthPersistence = async (newAuthPersistence: boolean) => {
        if (!admin) return;
        const response = await updateAuthPersistence(admin, newAuthPersistence);
        if (response instanceof Error) {
            setError("Une erreur est survenue lors de la modification de votre mode d'authentification. Veuillez réessayer plus tard.");
            return;
        }
        else {
            setError("");
            setAuthPersistence(newAuthPersistence);
            updateAdmin({...admin, authPersistence: newAuthPersistence});
            // actualisation du localStorage / sessionStorage
            const storagekey = process.env.NEXT_PUBLIC_LOCALSTORAGE_ADMINCONTEXT_KEY as string;
            if (newAuthPersistence === true) {
                localStorage.setItem(storagekey, JSON.stringify({...admin, authPersistence: newAuthPersistence}));
                sessionStorage.removeItem(storagekey);
            }
            else  if (newAuthPersistence === false) {
                sessionStorage.setItem(storagekey, JSON.stringify({...admin, authPersistence: newAuthPersistence}));
                localStorage.removeItem(storagekey);
            }
        }
    }

    return (
        <div id={"authPersistenceManager"}>
            <h3>Choisissez votre mode d'authentification :</h3>
            <div className={"wrapper-horizontal"}>
                <div className={"wrapper-vertical"}>
                    <button 
                        className={!authPersistence ? "green": "light"}
                        onClick={() => handleChangeAuthPersistence(false)}
                    >
                        par session
                        {!authPersistence && <Image alt={'check'} src={'/images/check.svg'} width={16} height={16}/>}
                    </button>
                    <p>Vous serez automatiquement déconnecté à chaque fois que vous quitterez l'application</p>
                </div>
                <div className={"wrapper-vertical"}>
                    <button
                        className={authPersistence ? "green" : "light"}
                        onClick={() => handleChangeAuthPersistence(true)}
                    >
                        persistant
                        {authPersistence && <Image alt={'check'} src={'/images/check.svg'} width={16} height={16}/>}
                    </button>
                    <p>Vous resterez connecté même en quittant l'application, jusqu'a ce que vous appuyez sur déconnecter par vous-même</p>
                </div>
            </div>
            {error != '' && <p className={"formErrorMsg"}>{error}</p>}
        </div>
    );
}

export default AuthPersistenceManager;