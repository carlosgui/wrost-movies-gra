import { useState, useEffect } from "react";
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
import api from "../../services/api";

function Movielist() {
  const [allStudios, setAllStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [paginationItens, setPaginationItens] = useState([]);
  const [totalOfPages, setTotalOfPages] = useState(0);
  const [searchYear, setSearchYear] = useState("");
  const [movieYear, setMovieYear] = useState("");

  useEffect(() => {
    async function load() {
      const [allStudiosData] = await Promise.all([
        api.get(`?page=${activePage}&size=10${searchYear}`),
      ]);
      const { totalPages } = allStudiosData.data;

      let items = [];
      for (
        let number = activePage >= 3 ? activePage - 2 : 0;
        number <= (activePage < totalPages ? activePage + 2 : activePage);
        number++
      ) {
        if (number <= totalPages - 1) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === activePage}
              onClick={() => handleOnclickPageNumbers(number)}
            >
              {number + 1}
            </Pagination.Item>
          );
        }
      }

      setTotalOfPages(totalPages);
      setPaginationItens(items);
      setAllStudios(allStudiosData.data.content);
      setLoading(false);
    }

    load();
  }, [activePage, searchYear]);

  function handleNextPrevButton(isNext) {
    isNext ? setActivePage(activePage + 1) : setActivePage(activePage - 1);
  }

  function handleOnclickPageNumbers(pageClicked) {
    setActivePage(pageClicked);
  }

  function handleOnChange(e) {
    setMovieYear(e.target.value);
  }

  function handleOnSubmit() {
    setSearchYear(`&year=${movieYear}`);
    setActivePage(0);
  }

  return (
    <Container>
      <div className="mt-4">
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
                        value={movieYear}
                        onChange={handleOnChange}
                      />
                      <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        onClick={() => handleOnSubmit()}
                      >
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
              {loading ? (
                <>
                  <Spinner animation="border" /> Carregando Informações
                </>
              ) : (
                <Table
                  striped="true"
                  bordered={true}
                  hover={true}
                  responsive="sm"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Year</th>
                      <th>Title</th>
                      <th>Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudios.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{value.id}</td>
                          <td>{value.year}</td>
                          <td>{value.title}</td>
                          <td>{value.winner ? "Yes" : "No"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}

              <Row>
                <Col xs={12}>
                  <Pagination>
                    <Pagination.Prev
                      disabled={activePage === 0}
                      onClick={() => handleNextPrevButton(false)}
                    />
                    {activePage > 2 ? (
                      <>
                        <Pagination.Item
                          onClick={() => handleOnclickPageNumbers(0)}
                        >
                          {1}
                        </Pagination.Item>
                        {activePage > 3 ? <Pagination.Ellipsis /> : <></>}

                        {paginationItens}
                      </>
                    ) : (
                      <>{paginationItens}</>
                    )}

                    {activePage < totalOfPages - 3 ? (
                      <>
                        {activePage < totalOfPages - 4 ? (
                          <Pagination.Ellipsis />
                        ) : (
                          <></>
                        )}
                        <Pagination.Item
                          onClick={() =>
                            handleOnclickPageNumbers(totalOfPages - 1)
                          }
                        >
                          {totalOfPages}
                        </Pagination.Item>
                      </>
                    ) : (
                      <></>
                    )}

                    <Pagination.Next
                      disabled={activePage === totalOfPages - 1}
                      onClick={() => handleNextPrevButton(true)}
                    />
                  </Pagination>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Movielist;
