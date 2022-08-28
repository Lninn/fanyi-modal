import classNames from "classnames"
import React, { useEffect } from "react"
import { createPortal } from "react-dom"

import "./Modal.less"


interface ModalProps {
  visible: boolean
  onCancel: () => void
  clsPrefix: string
  children: React.ReactNode
  
  mask?: boolean
  width?: number
}

const Modal = ({
  visible,
  onCancel,
  clsPrefix,
  children,

  mask,
  width,
}: ModalProps) => {
  useEffect(() => {
    function handleKeyDown(evt: KeyboardEvent) {
      const { code } = evt

      if (code === "Escape") {
        onCancel()
      }
    } 

    window.addEventListener("keyup", handleKeyDown)

    return () => {
      window.removeEventListener("keyup", handleKeyDown)
    }
  }, [])

  const rootCls = classNames(
    `${clsPrefix}-modal-root`,
    { "no-mask": !!mask }
  )

  const modalDom = (
    <div>
      <div className={rootCls}>
        <div className={`${clsPrefix}-modal-wrap`} style={{ width }}>
          <div className={`${clsPrefix}-modal-content`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(
    modalDom,
    document.body,
  )
}

export default Modal
