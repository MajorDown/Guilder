'use client'
import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import PageForUser from "@/components/PageForUser";

const Aide = () => {
    const [videoCategory, setVideoCategory] = useState<"membre" | "admin">("membre");

    return (<PageForUser title={"Besoin d'aide ?"} id={"section_aide"}>            
        <p>Vous trouverez ici une série de vidéos tutoriels pour vous aider à prendre en main Agriguilder.</p>
        <div id={"videoCategory-selector"}>
            <button onClick={() => setVideoCategory("membre")} className={videoCategory === "membre" ? "green" : "light"}>Tutos pour membre</button>
            <button onClick={() => setVideoCategory("admin")} className={videoCategory === "admin" ? "green" : "light"}>Tutos pour admin</button>
        </div>
        {videoCategory === "membre" && <div id={"videoPlayer-list"} className={"scrollable"}>
            <VideoPlayer src="https://youtu.be/k62KYVUCqzY?feature=shared" title="Comment déclarer une intervention ?" />
            <VideoPlayer src="https://youtu.be/VEyaUtid31o?feature=shared" title="Comment consulter ses déclarations et les soldes ?" />
            <VideoPlayer src="https://youtu.be/P86uxZKM0kE?feature=shared" title="Comment créer une contestation ?" />
            <VideoPlayer src="https://youtu.be/qEwTbRRnJbc?feature=shared" title="Le règlement" />
            <VideoPlayer src="https://youtu.be/6ziOPhiJ9QY" title="Comment modifier son mot de passe ?" />


        </div>}
        {videoCategory === "admin" && <div id={"videoPlayer-list"} className={"scrollable"}>
            <VideoPlayer src="https://youtu.be/0wFzWvX9HEc" title="Gérer les membres de la guilde" />
            <VideoPlayer src="https://youtu.be/_B5lgUsyRco" title="Arbitrer les contestations" />
            <VideoPlayer src="https://youtu.be/0wFzWvX9HEc" title="Gérer les outils" />
            <VideoPlayer src="https://youtu.be/uEqr160IPdI" title="Modifier votre mode d'authentification" />
            <VideoPlayer src="https://youtu.be/HNHIojWJmfQ" title="Créer un nouvel admin" />
            <VideoPlayer src="https://youtu.be/oWeOB9v4szc" title="Editer le règlement" />
        </div>}
    </PageForUser>)
}

export default Aide;