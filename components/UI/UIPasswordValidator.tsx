import { useState, useEffect, InputHTMLAttributes, RefObject } from "react";
import UIPasswordInput from "./UIPasswordInput";
import stringToPattern from "@/tools/stringToPattern";

type UIPasswordValidatorProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: RefObject<HTMLInputElement>;
  onChangeValue?: (value: string) => void;
};

const UIPasswordValidator = (props: UIPasswordValidatorProps) => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [verifPattern, setVerifPattern] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<undefined | true | false>(undefined);

  useEffect(() => {
    if (password1 && password2) {
      if (password1 != password2) setIsConfirmed(false);
      else setIsConfirmed(true);
      setVerifPattern(stringToPattern(password1))
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
      <UIPasswordInput name={"password1"} inputRef={props.inputRef} onChangeInputValue={(value) => setPassword1(value)}/>
      <input 
        type="password" 
        className={"UIPasswordConfirmation"} 
        name="password2" 
        onChange={(event) => setPassword2(event.target.value)}
        value={password2}
        pattern={verifPattern}
        title={"Les mots de passes rentrés ne sont pas identique !"}
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