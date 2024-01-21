import { FormEvent, useRef } from "react";
import UIEmailInput from "./UI/UIEmailInput";

const TestForm = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("TestForm ~> UIEmaiInput :", emailRef.current?.value);
    }
    
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <UIEmailInput inputRef={emailRef} placeholder={"jean-dupont@gamil.com"} required/>
            <input type="submit" value="Valider" />
        </form>
  )
}

export default TestForm;