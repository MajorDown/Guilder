import {useState} from 'react';
import Image from 'next/image';

export type UIOptionsSelectorProps = {
  guildOptions: {option: string, coef: number}[];
  initialSelectedOptions?: string[];
  selectedOptions: (option : string[]) => void;
}

/**
 * @function UIOptionsSelector
 * @description Composant pour sélectionner des options pour une intervention.
 * @param {UIOptionsSelectorProps} props - Les props du composant.
 */
const UIOptionsSelector = (props: UIOptionsSelectorProps) => {
  const [wantOptionsList, setWantOptionsList] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.initialSelectedOptions || []);

  return (
    <div className={"UIOptionsSelector"}>
        <div className={"UIOptionsSelected"}>
          <label htmlFor="">Renseignez les outils utilisés : ({selectedOptions.length} sélectionnée(s))</label>
          <button
            type={"button"}
            className={wantOptionsList ? "wantOptionsListBtn" : "doNot wantOptionsListBtn"}
            onClick={() => setWantOptionsList(!wantOptionsList)}
          >
            <Image src={'/images/arrow_up.svg'} alt={'develop'} width={30} height={30}/>
          </button>
        </div>
        <div className={wantOptionsList ? "UIOptionsList wanted" : "UIOptionsList"}>
          {props.guildOptions.map((option, index) => (
              <button
                type={"button"}
                key={index}
                onClick={() => {
                  if (selectedOptions.includes(option.option)) {
                    setSelectedOptions(selectedOptions.filter((opt) => opt !== option.option));
                    props.selectedOptions(selectedOptions.filter((opt) => opt !== option.option));
                  } else {
                    setSelectedOptions([...selectedOptions, option.option]);
                    props.selectedOptions([...selectedOptions, option.option]);
                  }
                }}
                className={selectedOptions.includes(option.option) ? "option checked" : "option"}
              >
                {<Image src={"/images/check.svg"} alt={option.option} width={15} height={15} />}
                {option.option}
              </button>
          ))}
        </div>
    </div>
  )
}

export default UIOptionsSelector;