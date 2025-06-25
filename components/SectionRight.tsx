import { ReactNode } from "react"

type SectionRightProps = {
    children: ReactNode;
    title: string;
    id: string;
}

/**
 * @description SectionRight component
 * @param {string} props.title
 * @param {string} props.id
 * @param {ReactNode} props.children
 * @returns {JSX.Element}
 */
const SectionRight = (props: SectionRightProps) => {
    return (<section className={"section_right"}>
        <div id={props.id} className={"section_content"}>
            <h2>{props.title}</h2>
            {props.children}
        </div>
    </section>)
}

export default SectionRight