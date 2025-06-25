'use client'
import { useEffect, PropsWithChildren } from "react";
import style from "@/styles/components/landing/Modal.module.css";

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const Modal = ({ isOpen, onClose, children }: Props): JSX.Element | null => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
