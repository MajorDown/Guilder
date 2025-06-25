import Image from "next/image";

export type LoadSpinnerProps = {
  message?: string;
}

/**
 * @function LoadSpinner
 * @description Composant pour un spinner de chargement.
 * @param {LoadSpinnerProps} props - Les props du composant.
 * @param {string} props.message - Le message à afficher.
 * @returns {JSX.Element} Un spinner de chargement.
 */
const LoadSpinner = (props: LoadSpinnerProps) => {
  return (<>
    {props.message && <p>{props.message}</p>}
    <Image className="loadSpinner" src="/images/spinner.png" alt="loading" width={50} height={50}/>
  </>
  )
}

export default LoadSpinner;