import { FormEvent, useRef, useState } from "react";
import UIFirstnameInput from "./UI/UIFirstnameInput";
import UILastnameInput from "./UI/UILastnameInput";
import UIPasswordInput from "./UI/UIPasswordInput";
import UIPasswordValidator from "./UI/UIPasswordValidator";

const TestForm = () => {
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordVerif = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("TestForm ~> firstname:", firstnameRef.current?.value);
        console.log("TestForm ~> lastname:", lastnameRef.current?.value);
        console.log("TestForm ~> passworVerif :", passwordRef.current?.value);
    }
    
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <UIFirstnameInput inputRef={firstnameRef} required/>
            <UILastnameInput inputRef={lastnameRef} required/>
            <UIPasswordInput inputRef={passwordRef} required/>
            <UIPasswordValidator inputRef={passwordVerif} />
            <input type="submit" value="Valider" />
        </form>
  )
}

export default TestForm;