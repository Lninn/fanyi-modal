import Dialog from "./components/Dialog"
import { createDoc } from "./Document"

function App() {
  return <Dialog source={createDoc("CN")}  target={createDoc("EN")}/>
}

export default App
