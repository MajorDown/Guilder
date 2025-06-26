import Style from '@/styles/components/landing/LinkButton.module.css';
import Image from 'next/image';
import Link from 'next/link';

type LinkButtonProps = {
    color?: 'dark' | 'light' | 'white';
    text: string;
    redirectTo?: 'presentation' | 'contact'
}

const LinkButton = (props: LinkButtonProps): JSX.Element => {
    return (
        <Link 
            className={`${Style.LinkButton} ${Style[props.color ?? 'dark']}`} 
            href={props.redirectTo === 'presentation' ? `/accueil/wHa3MFw5hPs?si=bgkEysEMwzELYKaX` : '/accueil/contact'}
        >
            <p>{props.text}</p>
            <Image
                src={`/images/icons/arrow_${props.color === 'dark' ? 'white' : 'dark'}_left_top.png`}
                alt="Arrow_top_left"
                width={24}
                height={24}
            />
        </Link>
    );
}

export default LinkButton;