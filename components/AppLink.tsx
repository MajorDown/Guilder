import {PropsWithChildren} from 'react';
import Link from 'next/link';

type AppLinkProps = PropsWithChildren<{
    href: string,
}>;

const AppLink = (props: AppLinkProps) => {
  return (
    <Link className="AppLink" href={props.href} replace>{props.children}</Link>
  )
}

export default AppLink;