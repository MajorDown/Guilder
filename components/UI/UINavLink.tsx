import { MouseEvent } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { LinkHTMLAttributes } from "react";

export type UINavLinkProps = {
    label: string;
    href: string;
    icon: string;
    onClick?: () => void;
    style?: LinkHTMLAttributes<HTMLAnchorElement>;
}

const UINavLink = (props: UINavLinkProps) => {
    const router = useRouter();

    const handleClick = async (event: MouseEvent) => {
        if (props.onClick) {
            event.preventDefault();
            props.onClick();
            router.push(props.href);
        }
    };

    return (
        <Link
            className="UINavLink"
            href={props.href}
            onClick={(event) => handleClick(event)}
            style={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                ...props.style
            }}
        >
            <Image 
                src={props.icon} 
                alt={`${props.label}`} 
                width={32} 
                height={32}
            />
            <p>{props.label}</p>
        </Link>
  )
}

export default UINavLink;