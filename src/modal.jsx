import React from 'react'
import { renderToString } from 'react-dom/server'

import './modal.less'


const createModal = (text) => {
  const clsPrefix = 'fanyi'

  const cls = `${clsPrefix}-modal`

  const handleUserClick = (evt) => {
    const target = evt.target


    const clsSelector = '#fanyi-modal'
    if (target.closest(clsSelector)) {
      console.log('ok')
    } else {
      console.log('not ok')
    }
  }

  window.addEventListener('click', handleUserClick)

  const modalELement = (
    <div className={cls}>
      {text}
    </div>
  )
  
  const htmlString = renderToString(modalELement)
  
  return htmlString
}

export {
  createModal
}
