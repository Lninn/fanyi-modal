import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { AppCtxProvider } from './feature/AppCtxProvider';
import { Button, Dialog, Drawer } from '@/components';
import { History, Translate } from './feature';

import './global.less';

const HistoryModal = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog visible={modal.visible} onClose={modal.hide} centered>
      <History clsPrefix="TRANSLATE-APP" />
    </Dialog>
  );
});

const TranslateModal = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog visible={modal.visible} onClose={modal.hide} centered>
      <Translate />
    </Dialog>
  );
});

NiceModal.register('histroy', HistoryModal);
NiceModal.register('translate', TranslateModal);

const App = () => {
  const showHistory = () => {
    NiceModal.show('histroy');
  };

  const showTranslate = () => {
    NiceModal.show('translate');
  };

  return (
    <NiceModal.Provider>
      <AppCtxProvider>
        <div style={{ margin: 30, display: 'flex', gap: 20 }}>
          <Button onClick={showHistory}>showHistory</Button>
          <Button onClick={showTranslate}>showTranslate</Button>
        </div>

        <Drawer />
      </AppCtxProvider>
    </NiceModal.Provider>
  );
};

export default App;
