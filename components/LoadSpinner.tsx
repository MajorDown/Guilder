import Image from "next/image";

const LoadSpinner = () => {
  return (
    <Image className="loadSpinner" src="/images/spinner.png" alt="loading" width={150} height={150}/>
  )
}

export default LoadSpinner;