import React from 'react'
import ReactDOM from 'react-dom/client'
import classnames from 'classnames'
import { createStore, useStore } from './store'

import './Modal.less'


const rootId = 'id-fanyi'

const initialState = {
  visible: true,
  loading: false,

  left: 0,
  top: 0,

  src: '-',
  dst: '-',
}

export const store = createStore(initialState);

export const rejectModal = () => {
  let rootDom = document.getElementById(rootId)
  
  if (!rootDom) {
    rootDom = document.createElement('div')
    rootDom.id = rootId

    document.body.append(rootDom)
  }

  const root = ReactDOM.createRoot(rootDom)
  root.render(<App />)
}

const App = () => {
  const appState = useStore(store)
  console.log('appState ', appState)

  const clsPrefix = 'fanyiModal'
  const cls = classnames(
    clsPrefix,
    [appState.visible ? 'show': 'hide']
  )

  React.useEffect(() => {
    const handleUserClick = (evt: { target: any }) => {
      const target = evt.target
    
      const clsSelector = `#${rootId}`
      if (!target.closest(clsSelector)) {
        store.setState({ visible: false })
      }
    }

    window.addEventListener('click', handleUserClick)

    return () => {
      window.removeEventListener('click', handleUserClick)
    }
  }, [])

  const style = {
    left: appState.left,
    top: appState.top,
  }

  return (
    <div className={cls} style={style}>
      <div className={`${clsPrefix}-from`}>
        {appState.src}
      </div>

      <div className={`${clsPrefix}-split-line`} />

      <div className={`${clsPrefix}-to`}>
        {appState.dst}
      </div>
    </div>
  );
}

// https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
