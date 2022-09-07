import React, { useEffect } from 'react';
import { AppCtx, defaultAppCtx, toggleTheme } from '@/context';
import { creatTransItemList } from '@/Document';

export const AppCtxProvider = ({ children }: { children?: React.ReactNode }) => {
  const [context, setContext] = React.useState(defaultAppCtx);

  useEffect(() => {
    const _toggleTheme = () => {
      setContext((prevCtx) => {
        return {
          ...prevCtx,
          theme: toggleTheme(prevCtx.theme),
        };
      });
    };

    setContext((p) => ({
      ...p,
      toggleTheme: _toggleTheme,
      list: creatTransItemList(),
    }));
  }, []);

  return <AppCtx.Provider value={context}>{children}</AppCtx.Provider>;
};
