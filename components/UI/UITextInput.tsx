import { useState, RefObject, useEffect } from "react";

export type UITextInputProps = {
  ariaLabel?: string;
  conditions: { regex: RegExp; error: string };
  inputRef?: RefObject<HTMLInputElement>;
  onChangeInputValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UITextInput = (props: UITextInputProps) => {
  const {
    ariaLabel,
    inputRef,
    className,
    style,
    conditions,
    onChangeInputValue,
    ...rest
  } = props;

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const regexToPattern = (regex: RegExp): string =>
    regex.toString().replace(/^\/|\/$/g, "");

  useEffect(() => {
    if (value === "") setError(false);
    else if (!conditions.regex.test(value)) setError(true);
    if (conditions.regex.test(value)) setError(false);
    onChangeInputValue?.(value);
  }, [value, conditions.regex, onChangeInputValue]);

  const classes = ["UITextInput", className].filter(Boolean).join(" ");

  return (
    <input
      {...rest}
      className={classes}
      aria-label={ariaLabel}
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      pattern={regexToPattern(conditions.regex)}
      title={conditions.error}
      style={{
        ...(value
          ? error
            ? { backgroundColor: "#ff7676", borderColor: "#750909" }
            : { backgroundColor: "#4fad4f", borderColor: "#2a5205" }
          : {}),
        ...style,
      }}
    />
  );
};

export default UITextInput;
