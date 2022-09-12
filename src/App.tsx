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

const DrawerModal = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Drawer visible={modal.visible} onClose={modal.hide}>
      <History clsPrefix="TRANSLATE-APP" />
    </Drawer>
  );
});

NiceModal.register('histroy', HistoryModal);
NiceModal.register('translate', TranslateModal);
NiceModal.register('drawer', DrawerModal);

const App = () => {
  const showHistory = () => {
    NiceModal.show('histroy');
  };

  const showTranslate = () => {
    NiceModal.show('translate');
  };

  const showDrawer = () => {
    NiceModal.show('drawer');
  };

  return (
    <AppCtxProvider>
      <NiceModal.Provider>
        <div style={{ margin: 30, display: 'flex', gap: 20 }}>
          <Button onClick={showHistory}>showHistory</Button>
          <Button onClick={showTranslate}>showTranslate</Button>
          <Button onClick={showDrawer}>showDrawer</Button>
        </div>
      </NiceModal.Provider>
    </AppCtxProvider>
  );
};

export default App;
