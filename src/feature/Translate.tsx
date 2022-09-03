import Action from '@/components/Action';
import { AppCtx } from '@/context';
import { useTargetIn } from '@/hooks';
import { IDocument, Lang, TranslateAppState } from '@/type';
import { copyTextToClip, playSound } from '@/utils';
import classNames from 'classnames';
import React, { CSSProperties, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AppCtxProvider } from './AppCtxProvider';

import './Translate.less';

const LANGUAGE_MAP: Record<Lang, string> = {
  CN: '中文',
  EN: '英文',
};
const APP_ID = 'CE-FANYI-ID';
export const CLS_REEFIX = 'TRANSLATE-APP';

interface TranslateProps {
  appState: TranslateAppState;
  style?: CSSProperties;
  visible: boolean;
  onClose: () => void;
}

export const Translate = ({ appState, style, visible, onClose }: TranslateProps) => {
  const [ref] = useTargetIn({
    clickInArea() {
      onClose();
    },
  });

  const { theme, toggleTheme } = useContext(AppCtx);
  const source: IDocument = {
    lang: 'CN',
    text: appState.src,
  };

  const target: IDocument = {
    lang: 'EN',
    text: appState.dst,
  };

  const handleThemeClick = () => {
    toggleTheme();
  };

  const handleCopyClick = (text: string) => {
    copyTextToClip(text);
  };

  const handleVolumeClick = (text: string) => {
    playSound(text);
  };

  const handleArrowClick = () => {
    console.log('handleArrowClick');
  };

  const rootCls = classNames('translate', [theme], { visible: visible });

  return (
    <div className={rootCls} style={style} ref={ref}>
      <div className="translate-header">
        <div className="translate-header-language">
          {LANGUAGE_MAP[source.lang]}
          <Action iconType="arrow" onClick={() => handleArrowClick()} />
          {LANGUAGE_MAP[target.lang]}
        </div>

        <div className="translate-header-setting">
          <Action iconType="theme" onClick={handleThemeClick} />
        </div>
      </div>

      <div className="translate-content">
        <div className="translate-panel">
          <div className="translate-panel-content">{source.text}</div>

          <div className="translate-panel-actions">
            <Action iconType="copy" onClick={() => handleCopyClick(source.text)} />
            <Action iconType="volume" onClick={() => handleVolumeClick(source.text)} />
          </div>
        </div>

        <div className="line"></div>

        <div className="translate-panel">
          <div className="translate-panel-content">{target.text}</div>

          <div className="translate-panel-actions">
            <Action iconType="copy" onClick={() => handleCopyClick(target.text)} />
            <Action iconType="volume" onClick={() => handleVolumeClick(target.text)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const appState = {
    visible: false,
    loading: false,

    left: 0,
    top: 0,

    src: '-',
    dst: '-',
  };
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const handleUserClick = (evt: MouseEvent) => {
      // todo
      const target = evt.target as HTMLDivElement;

      if (!target) return;

      const clsSelector = `#${APP_ID}`;
      if (!target.closest(clsSelector)) {
        // store.setState({
        //   visible: false,
        // });
      }
    };

    window.addEventListener('click', handleUserClick);

    return () => {
      window.removeEventListener('click', handleUserClick);
    };
  }, []);

  const style: CSSProperties = {
    position: 'absolute',
    left: appState.left,
    top: appState.top,
    display: appState.visible ? 'block' : 'none',
    zIndex: 9999,
  };

  return (
    <AppCtxProvider>
      <Translate
        style={style}
        appState={appState}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </AppCtxProvider>
  );
};

const reject = () => {
  let rootDom = document.getElementById(APP_ID);

  if (!rootDom) {
    rootDom = document.createElement('div');
    rootDom.id = APP_ID;

    document.body.append(rootDom);
  }

  const root = ReactDOM.createRoot(rootDom);

  root.render(<App />);
};

export default reject;
