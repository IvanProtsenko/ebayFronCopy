import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from './Table';
import NavsLeft from './ConversationFilters/NavsLeft';
import Search from './Search';
import Chat from './ConversationFilters/Chat';
import Stats from './Stats';

function JustifiedExample(props) {
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
        <Row>
          <Col sm={3}>
            <NavsLeft />
          </Col>
          <Col sm={9}>
            <Chat status={props.status} />
          </Col>
        </Row>
      </Tab>
      <Tab eventKey="search" title="Поиск">
        <Search />
      </Tab>
      <Tab eventKey="stats" title="Статистика">
        <Stats />
      </Tab>
    </Tabs>
  );
}

export default JustifiedExample;
