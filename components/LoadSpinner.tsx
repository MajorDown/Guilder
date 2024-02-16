import Image from "next/image";

export type LoadSpinnerProps = {
  message?: string;
}

const LoadSpinner = (props: LoadSpinnerProps) => {
  return (<>
    {props.message && <p>{props.message}</p>}
    <Image className="loadSpinner" src="/images/spinner.png" alt="loading" width={150} height={150}/>
  </>
  )
}

export default LoadSpinner;