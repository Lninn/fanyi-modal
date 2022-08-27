import Modal from '@/components/Modal';
import React from 'react';
import { createDoc } from './Document';

function App() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Modal
      clsPrefix='test' 
      visible={visible} 
      onCancel={() => setVisible(false)}
      mask={true}
    >
      Hello
    </Modal>
  )
}

export default App
