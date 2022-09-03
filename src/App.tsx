import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { AppCtxProvider } from './feature/AppCtxProvider';
import { Dialog } from '@/components';
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
        <button onClick={showHistory}>showHistory</button>
        <button onClick={showTranslate}>showTranslate</button>
      </AppCtxProvider>
    </NiceModal.Provider>
  );
};

export default App;
