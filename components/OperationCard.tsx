import { useState, useEffect } from "react";
import { Operation, UserName } from "@/types";
import deleteOperation from "@/tools/front/deleteOperation";
import { useUserContext } from "@/contexts/userContext";

type OperationCardProps = {
    operation: Operation,
    userName: UserName;
    onDelete: (operation: Operation) => void;
}

const OperationCard = (props: OperationCardProps) => {
    const {user} = useUserContext();
    const [wantDeleteBtn, setWantDeletedBtn] = useState<boolean>(false);
    const [isItTooLate, setIsItTooLate] = useState<boolean>(true);

    useEffect(() => {
        const operationDate = new Date(props.operation.date).getTime();
        const currentDate = new Date().getTime();
        const diffTime = Math.abs(currentDate - operationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setIsItTooLate(diffDays > 7);
    }, [props.operation.date]);

    const handleDelete = async () => {
        if (user && typeof props.operation.declarationDate === "string") {
            const response = await deleteOperation(props.operation.declarationDate, user);
            if (response instanceof Response) {
                const isDeleted = await response.json();
                if (isDeleted) props.onDelete(props.operation);
            }
            else console.log(response);
        }
    }

    return (
    <li className="operationCard">
        <div onClick={() => setWantDeletedBtn(!wantDeleteBtn)} className="operationInfos">
            <p className="operationDate">{props.operation.date}</p>
            <p className="operationTransaction">
                {props.operation.worker}{" à travaillé pour "}{props.operation.payer}
            </p>
            <p className="operationPoints">
                {props.userName && props.userName === props.operation.worker && "+ "}
                {props.userName && props.userName === props.operation.payer && "- "}
                {props.operation.points}{" pts"}
            </p>
        </div>
        {wantDeleteBtn &&
        <div className="wantToDeleteOperation">
            {isItTooLate ? <>
                <p>Cette opération datant de plus de 7 jours, son annulation est impossible</p>
            </> : <>
                <p>Souhaitez-vous vraiment contester cette opération ?</p>
                <button onClick={() => handleDelete()}>Supprimer</button>
            </>}
        </div>}
    </li>
  )
}

export default OperationCard;