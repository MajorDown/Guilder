import Style from '@/styles/components/landing/LinkButton.module.css';
import Image from 'next/image';

type LinkButtonProps = {
    color?: 'dark' | 'light';
}

const LinkButton = (props: LinkButtonProps): JSX.Element => {
    return (
        <button className={[Style.LinkButton, props.color === 'dark' ? Style.dark : Style.light].join(' ')}>
            <p>Découvrir l'outil</p>
            <Image
                src={`/images/icons/arrow_${props.color === 'dark' ? 'white' : 'dark'}_left_top.png`}
                alt="Arrow_top_left"
                width={24}
                height={24}
            />
        </button>
    );
}

export default LinkButton;