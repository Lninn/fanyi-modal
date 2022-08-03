import React from 'react'
import { renderToString } from 'react-dom/server'

import './modal.less'


const createModal = (text) => {
  const modalELement = (
    <div className="modal">
      {text}
    </div>
  )
  
  const htmlString = renderToString(modalELement)
  
  return htmlString
}

export {
  createModal
}
