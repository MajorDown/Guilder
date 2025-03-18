import { useEffect, useState } from "react";
import LoadSpinner from "../LoadSpinner";

type Props = {
    id: string,
    title: string,
    children: JSX.Element
}

const PageForGod = (props: Props): JSX.Element => {
    const [isGodConnected, setIsGodConnected] = useState<boolean>(false);

    useEffect(() => {
        if (sessionStorage.getItem(process.env.NEXT_PUBLIC_SESSIONSTORAGE_GODCONTEXT_KEY as string) !== "true") {
            // rediriger vers la page /god/login
            window.location.href = "/god/login";
        }
        else setIsGodConnected(true);
    }, []);

    return (
        <section id={props.id} className={"godSection scrollable"}>
        <h2>{props.title}</h2>
        {isGodConnected ? props.children : <LoadSpinner message={"Vous devez être connecté en tant que dev pour accéder à cette page"}/>}
    </section>
    )
}

export default PageForGod;