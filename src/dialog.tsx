import { useEffect, useRef } from 'react'
import './dialog.less'

import { createPortal } from "react-dom"
import { createRoot } from 'react-dom/client'

// ref set variable
// https://css-tricks.com/updating-a-css-variable-with-javascript/

function Dialog() {
  const ref = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    function handlePointerUp(ev: PointerEvent) {
      const {
        pageX,
        pageY,
      } = ev

      const selection = window.getSelection()
      if (!selection) return

      const { focusNode } = selection
      if (!focusNode) return
      const element = focusNode.parentElement
      if (!element) return

      const rect = element.getBoundingClientRect()
      const { lineHeight } = window.getComputedStyle(element)
      
      const row = get_closest_value(rect, lineHeight, pageY)
      const text = selection.toString()

      if (text) {
        const wrap = ref.current
        
        const offsetTop = row * parseInt(lineHeight) + rect.top
        const offsetLeft = pageX

        if (wrap) {
          wrap.style.setProperty('--offset-top', offsetTop + "px")
          wrap.style.setProperty('--offset-left', offsetLeft + "px")
        }
      }
    }

    window.addEventListener('pointerup', handlePointerUp)
    
    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  const dom = (
    <div className="wrap" ref={ref}>
      <div className='dialog'>
        dialog content
      </div>
    </div>
  )

  return dom
}

function get_closest_value(
  sourceRect: DOMRect,
  lineHeight: string,
  targetValue: number,
) {
  const { top } = sourceRect

  const diff = targetValue - top

  const row = Math.ceil(
    diff / parseInt(lineHeight)
  )

  return row
}

export function create_dialog() {
  console.log('create_dialog')

  const container = document.createDocumentFragment()
  document.body.appendChild(container)
  createRoot(container).render(
    createPortal(
      <Dialog />,
      document.body,
    )
  )

}
