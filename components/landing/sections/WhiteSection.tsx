import { ReactNode } from 'react';
import Style from '@/styles/components/landing/WhiteSection.module.css';

type WhiteSectionProps = {
    left: ReactNode;
    right: ReactNode;
};

/**
 * @returns une section blanche avec deux parties
 */
const WhiteSection = ({ left, right }: WhiteSectionProps): JSX.Element => {
    return (
        <section className={Style.WhiteSection}>
            <div className={Style.leftPart}>{left}</div>
            <div className={Style.rightPart}>{right}</div>
        </section>
    );
};

export default WhiteSection;
