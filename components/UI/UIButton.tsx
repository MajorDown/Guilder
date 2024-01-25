import {PropsWithChildren, ButtonHTMLAttributes} from 'react';

type UIButtonProps = PropsWithChildren<{
    isActive?: boolean;
}> & ButtonHTMLAttributes<HTMLButtonElement>;

const UIButton = (props: UIButtonProps) => {
  return (
    <button
        className={`UIButton ${props.isActive ? "isActive" : ""}  ${props.className}`}
        {...props}
    >
        {props.children}
    </button>
  )
}

export default UIButton;