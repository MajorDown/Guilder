'use client'
import {ReactNode} from 'react';
import Link from 'next/link';

export type UILinkProps = {
    children: ReactNode;
    href: string;
    color: 'white' | 'light' | 'green' | 'dark';
}

/**
 * @module UILink
 * 
 * @param {UILinkProps} props
 */
const UILink = (props: UILinkProps) => {
  return (
    <Link className={`UILink ${props.color}`}href={props.href}>{props.children}</Link>
  )
}

export default UILink;