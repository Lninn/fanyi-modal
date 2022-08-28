import React from "react"

export const createStore = (initialState: {
  visible: boolean
  loading: boolean
  left: number
  top: number
  src: string
  dst: string
}) => {
  let state = initialState
  const getState = () => state
  const listeners = new Set<Function>()
  const setState = (fn: any) => {
    if (typeof fn === "function") {
      state = fn(state)
    } else {
      state = { ...state, ...fn }
    }

    listeners.forEach((l) => l())
  }

  const subscribe = (listener: Function) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { getState, setState, subscribe }
}

export const useStore = (store: any) => {
  return React.useSyncExternalStore(
    store.subscribe,
    React.useCallback(() => store.getState(), [store]),
  )
}
