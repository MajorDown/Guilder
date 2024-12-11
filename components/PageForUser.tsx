import { ReactNode } from "react"

type PageForUserProps = {
    title: string
    children: ReactNode
    id: string
}

/**
 * @module PageForUser
 * @property {string} props.title
 * @property {ReactNode} props.children
 * @returns {JSX.Element}
 */
const PageForUser = (props: PageForUserProps) => {
    return (<section className="section_right">
        <div id="section_mentions_legales" className="section_content scrollable">
            <h2>{props.title}</h2>
            {props.children}
        </div>

    </section>)
}

export default PageForUser