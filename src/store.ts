import React from 'react';

const enum Language {
  Cn,
  En,
}

/**
 * 页面执行的动作
 */
const enum PageActionType {
  InitialApp,
  DoTranslate,
  SetPosition,
  SwitchLanguage,
  CloseModal,
  ShowModal,
  ToggleTheme,
  Collect,
}

interface IAppState {
  to: Language;
  from: Language;
  src: string | null;
  dst: string | null;
  x: number;
  y: number;
  modalVisible: boolean;
}

const appState: IAppState = {
  to: Language.Cn,
  from: Language.En,
  src: null,
  dst: null,
  x: 0,
  y: 0,
  modalVisible: false,
};

type CreateActionType<T, P = unknown> = P extends { [x: string]: any }
  ? { type: T; payload: P }
  : { type: T };

type Initial = CreateActionType<PageActionType.InitialApp>;

type Translate = CreateActionType<PageActionType.DoTranslate, { x: number; y: number }>;

type Switch = CreateActionType<PageActionType.SwitchLanguage>;

type Postion = CreateActionType<PageActionType.SetPosition, { x: number; y: number }>;

type IPageAction = Initial | Translate | Switch | Postion;

function appReducer(state: IAppState, action: IPageAction) {
  switch (action.type) {
    case PageActionType.SwitchLanguage:
      return {
        ...state,
        to: state.from,
        from: state.to,
      };

    case PageActionType.SetPosition:
      return state;
  }

  return state;
}

type Listener = () => void;

type StateFn<S> = (state: S) => S;

interface IStore<S, A> {
  dispatch: (action: A) => void;
  getState: () => S;
  setState: (fn: S | StateFn<S>) => void;
  subscribe: (listener: Listener) => () => void;
}

function createStore<S, A>(reducer: (state: S, action: A) => S, initialState: S) {
  let state = initialState;

  const getState = () => state;

  const listeners = new Set<Listener>();

  const dispatch = (action: A) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  function setState(fn: S | StateFn<S>) {
    if (typeof fn === 'function') {
      state = (fn as StateFn<S>)(state);
    } else {
      state = { ...state, ...fn };
    }

    listeners.forEach((listener) => listener());
  }

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    dispatch,
    getState,
    setState,
    subscribe,
  } as IStore<S, A>;
}

const store = createStore(appReducer, appState);

export type Selector<
  // The state can be anything
  State = any,
  // The result will be inferred
  Result = unknown,
  // There are either 0 params, or N params
  Params extends never | readonly any[] = any[]
  // If there are 0 params, type the function as just State in, Result out.
  // Otherwise, type it as State + Params in, Result out.
> = [Params] extends [never]
  ? (state: State) => Result
  : (state: State, ...params: Params) => Result;

function useStore(selector: Selector) {
  return React.useSyncExternalStore(
    store.subscribe,
    React.useCallback(() => {
      const storeState = store.getState();

      const state: ReturnType<typeof selector> = selector(storeState);
      return state;
    }, [])
  );
}
