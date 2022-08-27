import { TransItem } from "./type"



export type IMessage = {
  type: 'start'
} | {
  type: 'end',
  payload: TransItem
} | {
  type: 'error'
}


export default {}
