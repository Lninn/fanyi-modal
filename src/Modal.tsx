import React from 'react'
import ReactDOM from 'react-dom/client'
import classnames from 'classnames'

import './Modal.less'




const createStore = (initialState: { visible: boolean; loading: boolean; left: number; top: number; src: string; dst: string }) => {
  let state = initialState;
  const getState = () => state;
  const listeners = new Set<Function>();
  const setState = (fn: any) => {

    if (typeof fn === 'function') {
      state = fn(state);
    } else {
      state = { ...state, ...fn };
    }
    
    listeners.forEach((l) => l());
  }

  const subscribe = (listener: Function) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return {getState, setState, subscribe}
}

const useStore = (store: any) => {
  return React.useSyncExternalStore(
    store.subscribe,
    React.useCallback(
      () =>store.getState(),
      [store],
    )
  )
}

const rootId = 'id-fanyi'

const initialState = {
  visible: false,
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
