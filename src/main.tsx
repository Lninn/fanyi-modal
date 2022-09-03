import React from 'react';
import ReactDOM from 'react-dom/client';
import { mockParagraph } from './Document';
import { History } from './feature';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { AppCtxProvider } from './feature/AppCtxProvider';

const HistoryModal = NiceModal.create(() => {
  const modal = useModal();
  return <History clsPrefix="TRANSLATE-APP" visible={modal.visible} onCancel={modal.hide} />;
});

NiceModal.register('histroy', HistoryModal);

const APP_ID = 'CE-FANYI-ID';

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

    NiceModal.show('histroy');
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
    <NiceModal.Provider>
      <AppCtxProvider />;
    </NiceModal.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
