import { PropsWithChildren, ButtonHTMLAttributes } from "react";

type UIButtonProps = PropsWithChildren<{
  isActive?: boolean;
}> & ButtonHTMLAttributes<HTMLButtonElement>;

const UIButton = (props: UIButtonProps) => {
  const { isActive, className, children, ...rest } = props; // ⬅️ on retire ce qui ne doit pas aller au DOM

  const classes = ["UIButton"];
  if (isActive) classes.push("isActive");
  if (className) classes.push(className);

  return (
    <button className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default UIButton;
