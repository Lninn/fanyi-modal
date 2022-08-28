import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { creatTransItemList } from "./Document";
import { TransItem } from "./type";

import "./History.less"


type Fn = (...args: any[]) => any

function useEvent(callback: Fn) {
  const callbackRef = useRef<Fn | null>(null);

  callbackRef.current = callback;

  const event = useCallback((...args: any[]) => {
    if (callbackRef.current) {
      callbackRef.current.apply(null, args);
    }
  }, []);

  return event;
}

const usePagination = ({
  list,
}: {
  list: TransItem[]
}) => {
  const [current, setCurrent] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(list.length)
  }, [list])

  const totalPage = total / pageSize

  const onPrev = useEvent(() => {
    if (current > 1) {
      setCurrent(current -1)
    }
  })

  const onNext = useEvent(() => {
    if (current < totalPage - 1) {
      setCurrent(current + 1)
    }
  })

  const newList = list.slice(
    (current - 1),
    (current - 1) * pageSize
  )

  return {
    current,
    total,
    onNext,
    onPrev,
    list: newList,
  }
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
        <div>
          cn-en
        </div> 
        <div onClick={handleItemClick}>
          ✨
        </div> 
      </div>

      <div className={`${clsPrefix}-saveItem-src`}>
        {item.src}
      </div>
      <div className={`${clsPrefix}-saveItem-dst`}>
        {item.dst}
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

const History = ({
  clsPrefix
}: {
  clsPrefix: string
}) => {
  const [list] = useState<TransItem[]>(
    creatTransItemList()
  );

  const pagination = usePagination({ list })

  const handleItemClick = () => {
    console.log("handleItemClick")
  }

  return (
    <div className={`${clsPrefix}-history`}>
      <div>
        Header
      </div>

      <div
        className={`${clsPrefix}-history-pagination`}
      >
        <div>1-10</div>
        <div className={`${clsPrefix}-history-pagination-total`}>100</div>

        <div className={`${clsPrefix}-history-pagination-prev`}>
          prev
        </div>
        <div className={`${clsPrefix}-history-pagination-next`}>
          next
        </div>
      </div>

      <div>
        <ItemList
          list={list}
          onClick={handleItemClick}
          clsPrefix={clsPrefix}
        />
      </div>
    </div>
  )
}

export default History
