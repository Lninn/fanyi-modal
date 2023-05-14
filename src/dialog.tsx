import './dialog.less'

import { CSSProperties, SVGProps, useEffect, useRef, useState } from 'react'
import { createPortal } from "react-dom"
import { createRoot } from 'react-dom/client'

// ref set variable
// https://css-tricks.com/updating-a-css-variable-with-javascript/

// icon
// ref https://icones.js.org/collection/svg-spinners

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
  const [loading, setLoading] = useState(true)
  const [resultText, setResultText] = useState('')

  const [isToggle, setIsToggle] = useState(false)
  
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

      console.log(
        is_closest_dialog(ev.target as any)
      )

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

  useEffect(() => {
    if (!selectedText) return

    setLoading(true)
    query(selectedText).then(res => {
      setResultText(res.text)
    }).finally(() => setLoading(false))
  }, [selectedText])

  const dialogStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    width: DIALOG_WIDTH,
  }

  const resultTextStl: CSSProperties = loading ? {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  } : {}

  const handleToggle = (ev: MouseEvent) => {
    setIsToggle(!isToggle)

    ev.stopPropagation()
  }

  const dom = (
    <div className="wrap" ref={wrapRef}>
      <div className='dialog' style={dialogStyle}>
        <div className='title select_title'>
          原文
          <div
            onClick={handleToggle}
            style={{ fontSize: 24 }}
          >
            {
              isToggle ? <BxToggleLeft /> : <BxToggleRight />
            }
          </div>
        </div>
        <div className='text'>{selectedText}</div>
        <hr />
        <div className='title'>译文</div>
        <div className='text' style={resultTextStl}>
          {
            loading ? (
              <SvgSpinnersEclipse />
            ) : resultText
          }
        </div>
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

function query(text: string) {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({ text})
    }, 1000)
  })
}

function SvgSpinnersEclipse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"><animateTransform attributeName="transform" dur="0.6s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
  )
}

function BxToggleLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M8 9c-1.628 0-3 1.372-3 3s1.372 3 3 3s3-1.372 3-3s-1.372-3-3-3z"></path><path fill="currentColor" d="M16 6H8c-3.3 0-5.989 2.689-6 6v.016A6.01 6.01 0 0 0 8 18h8a6.01 6.01 0 0 0 6-5.994V12c-.009-3.309-2.699-6-6-6zm0 10H8a4.006 4.006 0 0 1-4-3.99C4.004 9.799 5.798 8 8 8h8c2.202 0 3.996 1.799 4 4.006A4.007 4.007 0 0 1 16 16zm4-3.984l.443-.004l.557.004h-1z"></path></svg>
  )
}

function BxToggleRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M16 9c-1.628 0-3 1.372-3 3s1.372 3 3 3s3-1.372 3-3s-1.372-3-3-3z"></path><path fill="currentColor" d="M16 6H8c-3.296 0-5.982 2.682-6 5.986v.042A6.01 6.01 0 0 0 8 18h8c3.309 0 6-2.691 6-6s-2.691-6-6-6zm0 10H8a4.006 4.006 0 0 1-4-3.99C4.004 9.799 5.798 8 8 8h8c2.206 0 4 1.794 4 4s-1.794 4-4 4z"></path></svg>
  )
}
