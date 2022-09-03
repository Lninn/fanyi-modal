import Action from '@/components/Action';
import { AppCtx } from '@/context';
import { createDoc } from '@/Document';
import { Lang } from '@/type';
import { copyTextToClip, playSound } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom/client';

import './Translate.less';

const LANGUAGE_MAP: Record<Lang, string> = {
  CN: '中文',
  EN: '英文',
};
const APP_ID = 'CE-FANYI-ID';
export const CLS_REEFIX = 'TRANSLATE-APP';

export const Translate = () => {
  const { theme, toggleTheme } = useContext(AppCtx);
  const [source] = useState(createDoc('CN'));
  const [target] = useState(createDoc('EN'));

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

  const rootCls = classNames('translate', [theme]);

  return (
    <div className={rootCls}>
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

const reject = () => {
  let rootDom = document.getElementById(APP_ID);

  if (!rootDom) {
    rootDom = document.createElement('div');
    rootDom.id = APP_ID;

    document.body.append(rootDom);
  }

  const root = ReactDOM.createRoot(rootDom);

  root.render(<Translate />);
};

export default reject;
