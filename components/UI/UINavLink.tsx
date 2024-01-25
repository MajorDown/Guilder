'use client'
import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter, usePathname } from "next/navigation";
import { LinkHTMLAttributes } from "react";

/**
 * Propriétés du composant UINavLink.
 * @typedef {Object} UINavLinkProps
 * @property {string} label - Label du lien.
 * @property {string} href - URL de destination.
 * @property {string} icon - URL de l'icône.
 * @property {boolean} [showActivation] - Afficher l'activation du lien.
 * @property {function(): void} [onClick] - Fonction de rappel pour le clic.
 * @property {LinkHTMLAttributes<HTMLAnchorElement>} [style] - Style pour le lien.
 */
export type UINavLinkProps = {
    label: string;
    href: string;
    icon: string;
    onClick?: () => void;
    showActivation?: boolean;
    style?: LinkHTMLAttributes<HTMLAnchorElement>;
}

/**
 * Composant de navigation.
 * 
 * @param {UINavLinkProps} props - Propriétés pour configurer le lien.
 * @returns {JSX.Element} Un lien de navigation stylisé.
 */
const UINavLink = (props: UINavLinkProps) => {
    const router = useRouter();
    const actualPathName = usePathname();
    const [isActive, setIsActive] = useState<boolean>(false);
  
    useEffect(() => {
      if (props.showActivation) actualPathName === props.href ? setIsActive(true) : setIsActive(false);
    }, [actualPathName])

    const handleClick = async (event: MouseEvent) => {
        if (props.onClick) {
            event.preventDefault();
            props.onClick();
            router.push(props.href);
        }
    };

    return (
        <Link
            className={`UINavLink ${isActive? "isActive" : ""}`}
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
                alt={`icon_${props.label}`} 
                width={32} 
                height={32}
            />
            <p>{props.label}</p>
        </Link>
  )
}

export default UINavLink;