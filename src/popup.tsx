import './popup.less'

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { queryWords } from '@/service'

import { query } from '@/service/mock'


console.log('popup.js loading...')

export const useSource = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    query().then(
      result => {
        console.log('result ', result)
      }
    ).finally(() => setLoading(false))
  }, [])

  return [data, loading] as const
}

const App = () => {
  const [dataSource, loading] = useSource()

  useEffect(() => {
    console.log('[App] mounted')
  }, [])

  return (
    <div className="popup">
      <List dataSource={dataSource} loading={loading} />
    </div>
  );
}

interface IList {
  dataSource: any[];
  loading: boolean;
}

const List = (props: IList) => {
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

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
  <App />
)
