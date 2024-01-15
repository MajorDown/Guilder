import { FormEvent, useRef } from "react";
import UIFirstnameInput from "./UI/UIFirstnameInput";
import UILastnameInput from "./UI/UILastnameInput";

const TestForm = () => {
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("TestForm ~> : firstname:", firstnameRef.current?.value);
        console.log("TestForm ~> : lastname:", lastnameRef.current?.value);
    }
    
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <UIFirstnameInput inputRef={firstnameRef} required/>
            <UILastnameInput inputRef={lastnameRef} required/>
            <input type="submit" value="Valider" />
        </form>
  )
}

export default TestForm;