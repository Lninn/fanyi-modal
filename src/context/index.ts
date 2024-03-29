import React from 'react';
import { ActionType, TransItem } from '@/type';
import { copyTextToClip, playSound } from '@/utils';

const CLS_REEFIX = 'TRANSLATE-APP';

const enum Theme {
  Light,
  Dark,
}

type IAppCtx = {
  clsPrefix: string;
  theme: Theme;
  onCommand: (type: ActionType, text?: string) => void;
  toggleTheme: () => void;

  list: TransItem[];
};

const collectWord = (text?: string) => {
  console.log('collect word ', text);
};

const handleCommand = (type: ActionType, text?: string) => {
  switch (type) {
    case 'collect':
      collectWord(text);
      break;
    case 'copy':
      copyTextToClip(text);
      break;
    case 'sound':
      playSound(text);
      break;
  }
};

export const toggleTheme = (currentTheme: Theme) => {
  return currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
};

export const defaultAppCtx: IAppCtx = {
  clsPrefix: CLS_REEFIX,
  theme: Theme.Light,
  onCommand: handleCommand,
  toggleTheme() {
    return;
  },
  list: [],
};

export const AppCtx = React.createContext(defaultAppCtx);
