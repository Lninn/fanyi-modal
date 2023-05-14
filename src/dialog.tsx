import './dialog.less'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from "react-dom"
import { createRoot } from 'react-dom/client'

// ref set variable
// https://css-tricks.com/updating-a-css-variable-with-javascript/

const DIALOG_WIDTH = 300
const VIEW_WIDTH = document.documentElement.clientWidth

function is_closest_dialog(el: HTMLElement | null) {
  
  while(el) {
    if (el.classList.contains('wrap')) {
      return true
    }

    el = el.parentElement
  }

  return false
}

function Dialog() {
  const wrapRef = useRef<HTMLDivElement | null>(null)

  const [selectedText, setSelectedText] = useState('')
  const selectedTextRef = useRef(selectedText)
  selectedTextRef.current = selectedText
  
  const [visible, setVisible] = useState(false)
  
  const openRef = useRef(visible)
  openRef.current = visible

  const downXRef = useRef(0)
  
  useEffect(() => {

    function handleMOuseDown(ev: PointerEvent) {
      downXRef.current = ev.pageX
    }
  
    function handlePointerUp(ev: PointerEvent) {
      const { pageX } = ev

      const target = ev.target as HTMLElement
      const wrap = wrapRef.current
      if (
        is_closest_dialog(target) ||
        !wrap
      ) {
        return
      }

      const select_info = get_select_info()
      if (!select_info) return
      
      const { text, rangeRect } = select_info
      
      const { x, y } = get_current_position(rangeRect, downXRef.current, pageX)
      wrap.style.setProperty('--offset-top', y + "px")
      wrap.style.setProperty('--offset-left', x + "px")

      setSelectedText(text)
      setVisible(true)
    }

    const handleClick = (ev: MouseEvent) => {
      const selection = window.getSelection()
      if (!selection) return

      if (is_closest_dialog(ev.target as any)) {
        return
      }
      
      if (openRef.current && selection.isCollapsed) {
        setVisible(false)
      }
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointerdown', handleMOuseDown)
    
    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointerdown', handleMOuseDown)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const stl: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    width: DIALOG_WIDTH,
  }

  const dom = (
    <div className="wrap" ref={wrapRef}>
      <div className='dialog' style={stl}>
        <h4>Translate</h4>
        <div>{selectedText}</div>
        <hr />
        <div>译文文本</div>
      </div>
    </div>
  )

  return dom
}

function get_select_info() {
  const selection = window.getSelection()
  if (!selection) return null

  const range = selection.getRangeAt(0)
  const rangeRect = range.getBoundingClientRect()

  const text = selection.toString()

  return {
    text,
    rangeRect,
  }
}

function get_current_position(
  rangeRect: DOMRect,
  downX: number,
  upX: number
) {
  let x = rangeRect.right

  if (
    (rangeRect.x + rangeRect.width + DIALOG_WIDTH) > VIEW_WIDTH
  ) {
    const calc_offset = x - DIALOG_WIDTH + (VIEW_WIDTH - rangeRect.right)
    const click_offset = upX > downX ? upX : downX
  
    x = click_offset < calc_offset ? click_offset : calc_offset
  }

  return { x, y: rangeRect.bottom }
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
