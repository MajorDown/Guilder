import {PropsWithChildren, useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type AppLinkProps = PropsWithChildren<{
    href: string,
    showActivation?: boolean;
}>;

const AppLink = (props: AppLinkProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const actualPathName = usePathname();

  useEffect(() => {
    if (props.showActivation) actualPathName === props.href ? setIsActive(true) : setIsActive(false);
  }, [actualPathName])

  return (
    <Link className={isActive? "appLink isActive" : "appLink"} href={props.href} replace>{props.children}</Link>
  )
}

export default AppLink;