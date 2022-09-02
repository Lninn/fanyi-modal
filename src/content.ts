import { log } from '@/utils';
import reject, { store } from './feature/Translate';
import { IMessage } from './type';

// https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api

const onRuntimeMessage = (
  message: IMessage,
  _: chrome.runtime.MessageSender,
  sendResponse: (response?: boolean) => void
) => {
  let appState;

  if (message.type === 'start') {
    appState = {
      visible: true,
      loading: true,
    };
  } else if (message.type === 'end') {
    appState = {
      loading: false,
      ...message.payload,
    };
  } else if (message.type === 'error') {
    appState = {
      visible: false,
      loading: false,
    };
  }

  if (appState) {
    store.setState(appState);
  }

  sendResponse(true);
};

const handleMouseUp = (evt: MouseEvent) => {
  const selection = document.getSelection();

  if (!selection || store.getState().visible) return;

  if (selection.type === 'Range') {
    const { pageX, pageY } = evt;

    store.setState({
      left: pageX,
      top: pageY,
    });
  }
};

const main = () => {
  console.log('loading content.js...');

  reject();

  chrome.runtime.sendMessage(
    {
      type: 'load-content',
    } as IMessage,
    function () {
      const err = chrome.runtime.lastError;

      if (err) {
        log.err(err.message);
      }
    }
  );

  chrome.runtime.onMessage.addListener(onRuntimeMessage);

  document.addEventListener('mouseup', handleMouseUp);
};

main();
