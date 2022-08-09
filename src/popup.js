import React from 'react'
import ReactDOM from 'react-dom/client'

import { queryWords } from './db'

import './popup.less'


console.log('popup.js loading...')

export const useSource = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true)
    queryWords().then(res => {
      setData(res);
    }).finally(() => setLoading(false))
  }, [])

  return [data, loading]
}

const App = () => {
  const [dataSource, loading] = useSource()

  return (
    <div className="popup">
      <List dataSource={dataSource} loading={loading} />
    </div>
  );
}

let rootDom = document.getElementById('app')

const root = ReactDOM.createRoot(rootDom)
root.render(<App />)

const List = (props) => {
  const { dataSource, loading } = props

  const bodyContent = dataSource.map(
    (datum, idx) => {
      return (
        <tr key={idx}>
          <td>{idx}</td>
          <td>{datum.from}</td>
          <td>{datum.to}</td>
          <td>{datum.count}</td>
        </tr>
      )
    }
  )

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>From</th>
          <th>To</th>
          <th>Times</th>
        </tr>
      </thead>
      <tbody>
        {bodyContent}
      </tbody>
    </table>
  )
}
