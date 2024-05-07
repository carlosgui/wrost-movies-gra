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
  const [winnerStatus, setWinnerStatus] = useState("");
  const [winnerText, setWinnerText] = useState("Select Status");

  useEffect(() => {
    async function load() {
      const [allStudiosData] = await Promise.all([
        api.get(`?page=${activePage}&size=10${searchYear}${winnerStatus}`),
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
  }, [activePage, searchYear, winnerStatus]);

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
    if (movieYear !== "") {
      setSearchYear(`&year=${movieYear}`);
      setActivePage(0);
    }
  }

  function handleSwitchWinnerStatus(status) {
    if (status === "YES") {
      setWinnerStatus("&winner=true");
      setWinnerText("Winner");
    } else if (status === "NO") {
      setWinnerStatus("&winner=false");
      setWinnerText("Not Winner");
    } else {
      setWinnerStatus("");
      setWinnerText("Select Status");
    }
  }

  function clearFilters() {
    setWinnerStatus("");
    setWinnerText("Select Status");
    setSearchYear("");
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
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
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
                        Search
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={4}>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {winnerText}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <div onClick={() => handleSwitchWinnerStatus("ALL")}>
                            All
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div onClick={() => handleSwitchWinnerStatus("YES")}>
                            Yes
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div onClick={() => handleSwitchWinnerStatus("NO")}>
                            No
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col xs={12} md={2}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => clearFilters()}
                    >
                      Clear Filters
                    </div>
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
