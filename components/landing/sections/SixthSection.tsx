import Style from "@/styles/components/landing/SixthSection.module.css";

const SixthSection = (): JSX.Element => {
    return (<section id={Style.SixthSection}>
        <p id={Style.resume}>
            Ils ont testés <span>Agriguilder</span> pour simplifier leur quotidien. Résultat ? <span>
            Plus</span> de clarté, <span>plus</span> d'équité, <span>moins</span> de tracas.
        </p>
    </section>)
}

export default SixthSection;