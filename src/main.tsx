import React, {
  CSSProperties,
} from 'react'
import ReactDOM from 'react-dom/client'
import {
  mockParagraph,
  mockWord,
} from './Document'
import {
  createStore,
  initialState,
  useStore,
} from './store'
import { Translate } from './feature'
import { TranslateProvider } from './feature/Translate'

const APP_ID = 'CE-FANYI-ID'

export const store = createStore(
  initialState,
)

const App = () => {
  const appState = useStore(store)

  React.useEffect(() => {
    store.setState({
      visible: true,
      left: 300,
      top: 300,
      src: mockWord('CN'),
      dst: mockWord('EN'),
    })
  }, [])

  var a="asd"
  
  React.useEffect(() => {
    const handleUserClick = (
      evt: MouseEvent,
    ) => {
      // todo
      const target =
        evt.target as HTMLDivElement

      if (!target) return

      const clsSelector = `#${APP_ID}`
      if (
        !target.closest(clsSelector)
      ) {
        // TODO
        // store.setState({ visible: false })
      }
    }

    window.addEventListener(
      'click',
      handleUserClick,
    )

    return () => {
      window.removeEventListener(
        'click',
        handleUserClick,
      )
    }
  }, [])

  const style: CSSProperties = {
    position: 'absolute',
    left: appState.left,
    top: appState.top,
    display: appState.visible
      ? 'block'
      : 'none',
    zIndex: 9999,
  }

  return (
    <TranslateProvider>
      <div style={{ display: 'flex' }}>
        <Translate
          style={style}
          appState={appState}
        />
      </div>
    </TranslateProvider>
  )
}

ReactDOM.createRoot(
  document.getElementById(
    'root',
  ) as HTMLElement,
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
