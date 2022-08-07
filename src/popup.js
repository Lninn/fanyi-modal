import React from 'react'
import ReactDOM from 'react-dom/client'

import { queryWords } from './db'

import './popup.less'


console.log('popup.js loading...')

const App = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true)
    queryWords().then(res => {
      setData(res);
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="popup">
      {loading ? (
        <div>content is loading...</div>
      ): null}

      {!loading ? (
        data.map((d, idx) => {
          return (
            <div key={idx}>{d.text}</div>
          )
        })
      ) : null}
    </div>
  );
}

let rootDom = document.getElementById('app')

const root = ReactDOM.createRoot(rootDom)
root.render(<App />)
