import { FormEvent, useRef } from "react";
import UIEmailInput, {UIEmailInputProps} from "./UI/UIEmailInput";
import UISelectInput from "./UI/UISelectInput";

const options= [
    {
        name: "Option 1",
        value: "option1"
    },
    {
        name: "Option 2",
        value: "option2"
    },
    {
        name: "Option 3",
        value: "option3"
    }
]

const TestForm = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("TestForm ~> UIEmaiInput :", emailRef.current?.value);
    }
    
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <UIEmailInput inputRef={emailRef} placeholder={"jean-dupont@gamil.com"} required/>
            <UISelectInput options={options} />
            <input type="submit" value="Valider" />
        </form>
  )
}

export default TestForm;