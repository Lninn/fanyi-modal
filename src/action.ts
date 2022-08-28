import { TransItem } from "./type"

export type IMessage =
  | {
      type: "start"
    }
  | {
      type: "end"
      payload: TransItem
    }
  | {
      type: "error"
    }
  | {
      type: "load-content"
    }

export default {}
