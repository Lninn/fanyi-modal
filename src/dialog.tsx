import { useEffect, useRef, useState } from 'react'
import './dialog.less'

import { createPortal } from "react-dom"
import { createRoot } from 'react-dom/client'

// ref set variable
// https://css-tricks.com/updating-a-css-variable-with-javascript/

const DIALOG_WIDTH = 300

function try_find_dialog(el: HTMLElement | null) {
  
  while(el) {
    if (el.classList.contains('wrap')) {
      return true
    }

    el = el.parentElement
  }

  return false
}

function Dialog() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [selectedText, setSelectedText] = useState('')

  const mouseDownRef = useRef({
    x: 0,
    y: 0,
  })
  
  useEffect(() => {
    function handleMOuseDown(ev: PointerEvent) {
      mouseDownRef.current.x = ev.pageX
      mouseDownRef.current.y = ev.pageY
    }
  
    function handlePointerUp(ev: PointerEvent) {
      const {
        pageX,
        pageY,
      } = ev

      const target = ev.target as HTMLElement

      if (try_find_dialog(target)) {
        return
      }

      const selection = window.getSelection()
      if (!selection) return

      const range = selection.getRangeAt(0)
      const rangeRect = range.getBoundingClientRect()

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
          // wrap.style.setProperty('--offset-top', offsetTop + "px")
          // wrap.style.setProperty('--offset-left', offsetLeft + "px")

          let x = rangeRect.right
          let y = rangeRect.bottom

          const vw = document.documentElement.clientWidth
          // const uw = 300

          if (
            (rangeRect.x + rangeRect.width + DIALOG_WIDTH) > vw
          ) {
            const calc_offset = x - DIALOG_WIDTH + (vw - rangeRect.right)
            const click_offset = pageX > mouseDownRef.current.x ? pageX : mouseDownRef.current.x
          
            x = click_offset < calc_offset ? click_offset : calc_offset
          }

          wrap.style.setProperty('--offset-top', y + "px")
          wrap.style.setProperty('--offset-left', x + "px")

          setSelectedText(text);
        }
      }
    }

    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointerdown', handleMOuseDown)
    
    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointerdown', handleMOuseDown)
    }
  }, [])

  const dom = (
    <div className="wrap" ref={ref}>
      <div className='dialog' style={{ width: DIALOG_WIDTH }}>
        <h4>Translate</h4>
        <div>{selectedText}</div>
        <hr />
        <div>译文文本</div>
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
