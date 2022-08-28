import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { creatTransItemList } from "./Document"
import { TransItem } from "./type"
import StartIcon from "./assets/star"
import GreaterIcon from "./assets/greater"
import LessThanIcon from "./assets/lessThan"
import classNames from "classnames"

import "./History.less"


type Fn = (...args: any[]) => any

function useEvent(callback: Fn) {
  const callbackRef = useRef<Fn>(callback)

  callbackRef.current = callback

  const event = useCallback((...args: any[]) => {
    if (callbackRef.current) {
      callbackRef.current.apply(null, args)
    }
  }, [])

  return event
}

interface IPagination<T> {
  list: T[]
  current: number
  pageSize: number
  total: number,
  onPrev: () => void
  onNext: () => void
}

const getPageNo = (pagination: Pick<IPagination<TransItem>, "current" | "pageSize">) => {
  const { pageSize } = pagination
  const current = pagination.current - 1

  const start = current * pageSize + 1
  const end = (current + 1) * pageSize

  return { start, end }
}

const canPrev = (current: number) => {
  return current > 1
}

const canNext = (
  { current, pageSize, total }: Pick<IPagination<TransItem>, "current" | "pageSize" | "total">
) => {
  const totalPage = total / pageSize

  return current < totalPage
}

const usePagination = ({ list }: { list: TransItem[] }): IPagination<TransItem> => {
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(list.length)
  }, [list])

  const onPrev = useEvent(() => {
    if (canPrev(current)) {
      setCurrent(current - 1)
    }
  })

  const onNext = useEvent(() => {
    if (canNext({ current, pageSize, total })) {
      setCurrent(current + 1)
    }
  })

  const { start, end } = getPageNo( { current, pageSize })

  return {
    current,
    pageSize,
    total,
    onNext,
    onPrev,
    list: list.slice(start, end)
  }
}

interface PaginationProps {
  clsPrefix: string
  pagination: IPagination<TransItem>
}

const Pagination = ({
  pagination,
  clsPrefix
}: PaginationProps) => {
  const { start, end } = getPageNo(pagination)

  const prevCls = classNames(
    `${clsPrefix}-pagination-prev`,
    { "disabled": !canPrev(pagination.current) }
  )

  const nextCls = classNames(
    `${clsPrefix}-pagination-next`,
    { "disabled": !canNext(pagination) }
  )

  return (
    <div className={`${clsPrefix}-pagination`}>
      <div className={`${clsPrefix}-pagination-no`}>
        <span>当前:</span>
        <span>{start}</span>
        <span>-</span>
        <span>{end}</span>
      </div>

      <div className={`${clsPrefix}-pagination-total`}>
        共 {pagination.total} 条
      </div>

      <div
        className={prevCls}
        onClick={pagination.onPrev}
        title="上一页"
      >
        <LessThanIcon />
      </div>

      <div
        className={nextCls}
        onClick={pagination.onNext}
        title="下一页"
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
    <div className={`${clsPrefix}-itemList`}>
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
      <Pagination
        clsPrefix={clsPrefix}
        pagination={pagination}
      />

      <ItemList
        clsPrefix={clsPrefix}
        list={pagination.list}
        onClick={handleItemClick}
      />
    </div>
  )
}

export default History
