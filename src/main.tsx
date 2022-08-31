import React, { CSSProperties } from "react"
import ReactDOM from "react-dom/client"
import { mockParagraph } from "./Document"
import { Translate } from "./feature/Translate"
import History from "./History"
import { createStore, initialState, useStore } from "./store"

const APP_ID = "CE-FANYI-ID"
const CLS_REEFIX = "TRANSLATE-APP"

export const store = createStore(initialState)

const App = () => {
  const appState = useStore(store)

  React.useEffect(() => {
    store.setState({
      visible: true,
      left: 300,
      top: 300,
      src: mockParagraph("CN"),
      dst: mockParagraph("EN")
    })
  }, [])

  React.useEffect(() => {
    const handleUserClick = (evt: MouseEvent) => {
      // todo
      const target = evt.target as HTMLDivElement

      if (!target) return

      const clsSelector = `#${APP_ID}`
      if (!target.closest(clsSelector)) {
        // TODO
        // store.setState({ visible: false })
      }
    }

    window.addEventListener("click", handleUserClick)

    return () => {
      window.removeEventListener("click", handleUserClick)
    }
  }, [])

  const style: CSSProperties = {
    position: "absolute",
    left: appState.left,
    top: appState.top,
    display: appState.visible ? "block" : "none",
    zIndex: 9999,
  }

  return (
    <div style={{ display: "flex" }}>
      <Translate style={style} appState={appState} />
      <History clsPrefix={CLS_REEFIX} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
