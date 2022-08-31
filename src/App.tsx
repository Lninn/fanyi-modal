import Translate from "./feature/Translate"
import { initialState } from "./store"

function App() {
  return <Translate appState={initialState} />
}

export default App
