import AppNavbar from "./AppNavbar";
import PageLogo from "./PageLogo";

type SectionLeftProps = {
    pseudoTitle: string
}

/**
 * @description SectionLeft component
 * @param {string} props.pseudoTitle
 * @param {string} props.id
 * @returns {JSX.Element}
 */
const SectionLeft = (props: SectionLeftProps) => {

    return (<section className={"section_left"}>
        <div id={"section_navigation"} className={"section_content"}>
            <PageLogo pseudoTitle={props.pseudoTitle}/>
            {<AppNavbar />}
        </div>
    </section>)
}

export default SectionLeft;