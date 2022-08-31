import { TranslateContext } from "@/feature/Translate";
import classNames from "classnames";
import React, { useContext } from "react";

// TODO

const APP_ID = "CE-FANYI-ID"

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal = ({
  visible,
  onClose,
  children
}: ModalProps) => {
  const { clsPrefix } = useContext(TranslateContext)
  const modalCls = classNames(
    `${clsPrefix}-moodal`,
    visible ? "open" : "close"
  )

  React.useEffect(() => {
    const handleUserClick = (evt: MouseEvent) => {
      // todo
      const target = evt.target as HTMLDivElement

      if (!target) return

      const clsSelector = `#${APP_ID}`
      if (!target.closest(clsSelector)) {
        onClose()
      }
    }

    window.addEventListener("click", handleUserClick)

    return () => {
      window.removeEventListener("click", handleUserClick)
    }
  }, [])

  return (
    <div className={modalCls}>{children}</div>
  )
}

export default Modal
