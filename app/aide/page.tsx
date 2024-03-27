'use client'
import PageLogo from "@/components/PageLogo";
import VideoPlayer from "@/components/VideoPlayer";

const Aide = () => {
  return (<>
    <section className={"section_left"}>
        <div id={"section_navigation"} className={"section_content"}>
            <PageLogo pseudoTitle='Arbitrage'/>
            </div>
    </section>
    <section className={"section_right"}>
        <div id={"section_aide"} className={"section_content"}>
            <h2>Besoin d'aide ?</h2>
            <p>Vous trouverez ici une série de vidéos tutoriels pour vous aider à prendre en main Agriguilder.</p> 
            <div id={"list-of-VideoPlayer"} className={"scrollable"}>
                <VideoPlayer src="/videos/tuto1.mp4" title="Comment déclarer une intervention ?" />
                <VideoPlayer src="/videos/tuto2.mp4" title="Comment contester une intervention ?" />
            </div>
        </div>
    </section>
</>)
}

export default Aide;