'use client'
import { useState } from "react";
import PageLogo from "@/components/PageLogo";
import VideoPlayer from "@/components/VideoPlayer";

const Aide = () => {
    const [videoCategory, setVideoCategory] = useState<"membre" | "admin">("membre");

  return (<>
    <section className={"section_left"}>
        <div id={"section_navigation"} className={"section_content"}>
            <PageLogo pseudoTitle='Aide / tutoriels'/>
        </div>
    </section>
    <section className={"section_right"}>
        <div id={"section_aide"} className={"section_content"}>
            <h2>Besoin d'aide ?</h2>
            <p>Vous trouverez ici une série de vidéos tutoriels pour vous aider à prendre en main Agriguilder.</p>
            <div id={"videoCategory-selector"}>
                <button onClick={() => setVideoCategory("membre")} className={videoCategory === "membre" ? "green" : "light"}>Tutos pour membre</button>
                <button onClick={() => setVideoCategory("admin")} className={videoCategory === "admin" ? "green" : "light"}>Tutos pour admin</button>
            </div>
            {videoCategory === "membre" && <div id={"videoPlayer-list"} className={"scrollable"}>
                <VideoPlayer src="/videos/declaration.mkv" title="Comment déclarer une intervention ?" />
                <VideoPlayer src="/videos/contestation.mkv" title="Comment contester une intervention ?" />
            </div>}
            {videoCategory === "admin" && <div id={"videoPlayer-list"} className={"scrollable"}>
                <VideoPlayer src="/videos/outils.mkv" title="Comment ajouter de nouveaux outils ?" />
                <VideoPlayer src="/videos/arbitrage.mkv" title="Comment arbitrer une contestation ?" />
            </div>}
        </div>
    </section>
  </>)
}

export default Aide;