import style from '@/styles/landing/UI/LinkButton.module.css';

type LinkButtonProps = {
    color?: 'dark' | 'light';
}

const LinkButton = (): JSX.Element => {
    return (
        <button className={style.Linkbutton}>
            Click me
        </button>
    );
}

export default LinkButton;