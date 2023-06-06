import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Table from './Table';
import Conversations from './Conversations';
import Search from './Search'

function JustifiedExample() {
  return (
    <Tabs
      defaultActiveKey="conversations"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="adverts" title="Предложения">
        <Table />
      </Tab>
      <Tab eventKey="conversations" title="Переписки">
        <Conversations />
      </Tab>
      <Tab eventKey="search" title="Поиск">
        <Search />
      </Tab>
    </Tabs>
  );
}

export default JustifiedExample;