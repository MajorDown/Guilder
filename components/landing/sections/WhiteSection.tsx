import { ReactNode, PropsWithChildren} from 'react';
import Style from '@/styles/components/landing/WhiteSection.module.css';

/**
 * @returns une section blanche avec deux parties
 */
const WhiteSection = (props: PropsWithChildren): JSX.Element => {
    return (
        <section className={Style.WhiteSection}>
            {props.children}
        </section>
    );
};

export default WhiteSection;
