import { Operation } from "@/types";

type OperationCardProps = {
    operation: Operation
}

const OperationCard = (props: OperationCardProps) => {
  return (
    <li className="operationCard">
    <p className="operationDate">{props.operation.date}</p>
    <p className="operationWorker">{props.operation.worker}</p>
    <p className="operationPayer">{props.operation.payer}</p>
    <p className="operationPoints">{props.operation.points} points</p>
  </li>
  )
}

export default OperationCard;