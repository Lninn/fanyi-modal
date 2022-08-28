import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { creatTransItemList } from "./Document"
import { TransItem } from "./type"
import StartIcon from "./assets/star"
import GreaterIcon from "./assets/greater"
import LessThanIcon from "./assets/lessThan"

import "./History.less"


type Fn = (...args: any[]) => any

function useEvent(callback: Fn) {
  const callbackRef = useRef<Fn | null>(null)

  callbackRef.current = callback

  const event = useCallback((...args: any[]) => {
    if (callbackRef.current) {
      callbackRef.current.apply(null, args)
    }
  }, [])

  return event
}

interface IPagination {
  current: number
  pageSize: number
  total: number,
  onPrev: () => void
  onNext: () => void
}

const usePagination = ({ list }: { list: TransItem[] }) => {
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(list.length)
  }, [list])

  const totalPage = total / pageSize

  const onPrev = useEvent(() => {
    if (current > 1) {
      setCurrent(current - 1)
    }
  })

  const onNext = useEvent(() => {
    if (current < totalPage - 1) {
      setCurrent(current + 1)
    }
  })

  return {
    current,
    pageSize,
    total,
    onNext,
    onPrev,
  }
}

const getPageNo = (pagination: IPagination) => {
  const { pageSize } = pagination
  const current = pagination.current - 1

  const start = current * pageSize + 1
  const end = (current + 1) * pageSize + 1

  return { start, end }
}

interface PaginationProps {
  clsPrefix: string
  pagination: IPagination
}

const Pagination = ({
  pagination,
  clsPrefix
}: PaginationProps) => {
  const { start, end } = getPageNo(pagination)

  return (
    <div className={`${clsPrefix}-pagination`}>
      <div className={`${clsPrefix}-pagination-no`}>
        <span>{start}</span>
        <span>-</span>
        <span>{end}</span>
      </div>

      <div className={`${clsPrefix}-pagination-total`}>
        {pagination.total}
      </div>

      <div
        className={`${clsPrefix}-pagination-prev`}
        onClick={pagination.onPrev}
      >
        <LessThanIcon />
      </div>

      <div
        className={`${clsPrefix}-pagination-next`}
        onClick={pagination.onNext}
      >
        <GreaterIcon />
      </div>
    </div>
  )
}


const Item = ({
  item,
  onClick,

  clsPrefix,
}: {
  item: TransItem
  onClick: (item: TransItem) => void
  clsPrefix: string
}) => {
  const handleItemClick = () => {
    onClick(item)
  }

  return (
    <div className={`${clsPrefix}-saveItem`}>
      <div className={`${clsPrefix}-saveItem-header`}>
        <div>中文 - English</div>
        <div
          className={`${clsPrefix}-saveItem-header-btn`}
          onClick={handleItemClick}
        >
          <StartIcon />
        </div>
      </div>

      <div className={`${clsPrefix}-saveItem-content`}>
        <div className={`${clsPrefix}-saveItem-src`}>{item.src}</div>
        <div className={`${clsPrefix}-saveItem-dst`}>{item.dst}</div>
      </div>
    </div>
  )
}

const ItemList = ({
  list,
  onClick,
  clsPrefix,
}: {
  list: TransItem[]
  onClick: (item: TransItem) => void
  clsPrefix: string
}) => {
  return (
    <div>
      {list.map((item, idx) => {
        return <Item item={item} onClick={onClick} key={idx} clsPrefix={clsPrefix} />
      })}
    </div>
  )
}

const History = ({ clsPrefix }: { clsPrefix: string }) => {
  const [list] = useState<TransItem[]>(creatTransItemList())

  const pagination = usePagination({ list })

  const handleItemClick = () => {
    console.log("handleItemClick")
  }

  return (
    <div className={`${clsPrefix}-history`}>
      <div>Header</div>

      <Pagination
        clsPrefix={clsPrefix}
        pagination={pagination}
      />

      <div>
        <ItemList
          clsPrefix={clsPrefix}
          list={list}
          onClick={handleItemClick}
        />
      </div>
    </div>
  )
}

export default History
