import { ReactNode, PropsWithChildren} from 'react';
import Style from '@/styles/components/landing/WhiteSection.module.css';

type WhiteSectionprops = PropsWithChildren<{
    id?: string;
}>;

/**
 * @returns une section blanche avec deux parties
 */
const WhiteSection = (props: WhiteSectionprops): JSX.Element => {
    return (
        <section id={props.id? props.id : ''} className={Style.WhiteSection}>
            {props.children}
        </section>
    );
};

export default WhiteSection;
