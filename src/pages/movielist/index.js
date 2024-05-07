import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

function Movielist() {
  let active = 2;
  let items = [];

  useEffect(() => {
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }
  });

  return (
    <Container>
      <div class="mt-4">
        <Row>
          <Col xs={12}>
            <Card body>
              <Card.Title>List years with multiple winners</Card.Title>
              <Card.Body>
                <Row>
                  <Col>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Search by year"
                        aria-label="Search by year"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-secondary" id="button-addon2">
                        Buscar
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Winner (Yes / No)
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>All</Dropdown.Item>
                        <Dropdown.Item>Yes</Dropdown.Item>
                        <Dropdown.Item>No</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Card.Body>
              <Spinner animation="border" /> Carregando Informações
              <Table
                striped="true"
                bordered={true}
                hover={true}
                responsive="sm"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Year Filter</th>
                    <th>Title</th>
                    <th>Winner Yes or No (filter)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1990</td>
                    <td>Can't Stop the Music</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>1990</td>
                    <td>Can't Stop the Music</td>
                    <td>Yes</td>
                  </tr>
                </tbody>
              </Table>
              <Row>
                <Col xs={12} md={4}></Col>
                <Col xs={12} md={4}>
                  <Pagination size="sm">{items}</Pagination>
                  <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                  </Pagination>
                </Col>
              </Row>
              <div></div>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Movielist;
