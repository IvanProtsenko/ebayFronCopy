import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import Table from './Table';
import New from './ConversationFilters/New';

function Conversations() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="new">Новые</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="determinating">На распознавании</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="not_suitable">Не подходит</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="in_work">Обработано</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="new">
              <New />
            </Tab.Pane>
            <Tab.Pane eventKey="determinating">
              <div>На распознавании</div>
            </Tab.Pane>
            <Tab.Pane eventKey="not_suitable">
              <div>Не подходит</div>
            </Tab.Pane>
            <Tab.Pane eventKey="in_work">
              <div>Обработано</div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default Conversations;