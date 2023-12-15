import {PropsWithChildren} from 'react';

type AppButtonProps = PropsWithChildren<{
    onClick: () => void
}>;

const AppButton = (props : AppButtonProps) => {
  return (
    <button 
      className="appButton" 
      onClick={() => props.onClick()}
    >
        {props.children}
    </button>
  )
}

export default AppButton;