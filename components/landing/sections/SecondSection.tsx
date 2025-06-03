import WhiteSection from "./WhiteSection";

const SecondSection = ():JSX.Element => {
    return (
        <WhiteSection
            left={
                <>
                    <h2>Une plateforme de gestion de projet</h2>
                    <p>
                        Notre plateforme vous permet de gérer vos projets de manière efficace et collaborative.
                        Suivez l'avancement, assignez des tâches et collaborez avec votre équipe en temps réel.
                    </p>
                </>
            }
            right={
                <img src="/images/landing/second-section.png" alt="Gestion de projet" />
            }
        />
    )
}

export default SecondSection