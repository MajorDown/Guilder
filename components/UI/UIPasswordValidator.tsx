import { useState, useEffect, InputHTMLAttributes, RefObject } from "react";
import UIPasswordInput from "./UIPasswordInput";

type UIPasswordValidatorProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: RefObject<HTMLInputElement>;
  onChangeValue?: (value: string) => void;
};

const UIPasswordValidator = (props: UIPasswordValidatorProps) => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<undefined | true | false>(undefined);

  useEffect(() => {
    if(password1 && password2) {
      if (password1 != password2) setIsConfirmed(false);
      else setIsConfirmed(true)
    }
    else setIsConfirmed(false);
  }, [password1, password2])

  useEffect(() => {
    if (props.onChangeValue) {
      if (isConfirmed != true) props.onChangeValue("");
      if (isConfirmed === true) props.onChangeValue(password1);
    }
  }, [isConfirmed])


  return (
    <div className={"UIPasswordValidator"} >
      <UIPasswordInput name={"password1"} onChangeInputValue={(value) => setPassword1(value)}/>
      <input 
        className={"UIPasswordConfirmation"} 
        type="password" 
        name="password2" 
        value={password2} 
        onChange={(event) => setPassword2(event.target.value)}
        style={{
          ...(password2 ? (isConfirmed === false ? {
              backgroundColor: "#ff00003e",
              borderColor: "#750909"
          } : {
              backgroundColor: "#7bff003e",
              borderColor: "#2a5205"
          }) : {}),
          ...props.style
      }}
        required 
        />
    </div>
  )
}

export default UIPasswordValidator;