import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom/client';
import { mockParagraph, mockWord } from './Document';
// import { createStore, initialState, useStore } from './store';
import { Translate, History } from './feature';
import { TranslateProvider } from './feature/Translate';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const HistoryModal = NiceModal.create(() => {
  const modal = useModal();
  return <History clsPrefix="TRANSLATE-APP" visible={modal.visible} onCancel={modal.hide} />;
});

NiceModal.register('histroy', HistoryModal);

const APP_ID = 'CE-FANYI-ID';

// export const store = createStore(initialState);

const appState = {
  visible: false,
  loading: false,

  left: 300,
  top: 300,

  src: mockParagraph('CN'),
  dst: mockParagraph('EN'),
};

const App = () => {
  React.useEffect(() => {
    // store.setState({
    //   visible: true,
    //   left: 300,
    //   top: 300,
    //   src: mockParagraph('CN'),
    //   dst: mockParagraph('EN'),
    // });
  }, []);

  React.useEffect(() => {
    const handleUserClick = (evt: MouseEvent) => {
      // todo
      const target = evt.target as HTMLDivElement;

      if (!target) return;

      const clsSelector = `#${APP_ID}`;
      if (!target.closest(clsSelector)) {
        // TODO
        // store.setState({ visible: false })
      }
    };

    window.addEventListener('click', handleUserClick);

    return () => {
      window.removeEventListener('click', handleUserClick);
    };
  }, []);

  return (
    <TranslateProvider>
      <div style={{ display: 'flex' }}>
        <Translate appState={appState} visible={true} onClose={() => 1} />
      </div>
    </TranslateProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
