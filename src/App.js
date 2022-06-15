import { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';

function Foo() {
  useEffect(() => {
    console.log('Foo mounted');
  }, []);

  return <div>Foo</div>;
}

function Bar() {
  useEffect(() => {
    console.log('Bar mounted');
  }, []);

  return <div>Bar</div>;
}

function App() {
  return (
    <div className="App">
      <Tabs forceRenderTabPanel>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <p>This is tab 1</p>
          <Foo />
        </TabPanel>
        <TabPanel>
          <p>This is tab 2</p>
          <Bar />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
