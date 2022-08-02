import React from 'react'
import { renderToString } from 'react-dom/server'

import './modal.less'


const modalELement = (
  <div className="modal">
    fanyi
  </div>
)

const htmlString = renderToString(modalELement)

export {
  htmlString
}
