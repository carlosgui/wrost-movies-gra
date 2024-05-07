import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import api from "../../services/api";

function Dashboard() {
  const [movieYear, setMovieYear] = useState("");
  const [multWinners, setMultWinners] = useState([]);
  const [winnersByYear, setWinnersByYear] = useState([]);
  const [topWinners, setTopWinners] = useState([]);
  const [minProjectionWin, setMinProjectionWin] = useState([]);
  const [maxProjectionWin, setMaxProjectionWin] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [mutipleWinners, topStudiosWinner, minMaxProjection] =
        await Promise.all([
          api.get(`?projection=years-with-multiple-winners`),
          api.get(`?projection=studios-with-win-count`),
          api.get(`?projection=max-min-win-interval-for-producers`),
        ]);

      const onlyTop3Studios = topStudiosWinner.data.studios.slice(0, 3);

      setMultWinners(mutipleWinners.data.years);
      setTopWinners(onlyTop3Studios);
      setMinProjectionWin(minMaxProjection.data.min);
      setMaxProjectionWin(minMaxProjection.data.max);
      setLoading(false);
    }

    load();
  }, []);

  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        const [winByYear] = await Promise.all([
          api.get(`?winner=true&year=${movieYear}`),
        ]);

        setWinnersByYear(winByYear.data);
      }

      submit();
    },
    [winnersByYear]
  );

  useEffect(() => {
    console.log(movieYear);
  }, [movieYear]);

  function handleOnChange(e) {
    setMovieYear(e.target.value);
  }

  return (
    <Container>
      <div class="mt-4">
        <Row>
          <Col md={12} lg={6}>
            <Card body>
              <Card.Title>List years with multiple winners</Card.Title>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Table
                  striped="true"
                  bordered={true}
                  hover={true}
                  responsive="sm"
                >
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Win Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {multWinners.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{value.year}</td>
                          <td>{value.winnerCount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
          <Col md={12} lg={6}>
            <Card body>
              <Card.Title>Top 3 studios with winners</Card.Title>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Table
                  striped="true"
                  bordered={true}
                  hover={true}
                  responsive="sm"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Win Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topWinners.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{value.name}</td>
                          <td>{value.winCount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
        </Row>
      </div>

      <div class="mt-4">
        <Row>
          <Col md={12} lg={6}>
            <Card body>
              <Card.Title>
                Producer with longest and shortest interval between wins
              </Card.Title>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Row>
                  <Col lg={12}>
                    <Card.Text>Maximum</Card.Text>
                    <Table
                      striped="true"
                      bordered={true}
                      hover={true}
                      responsive="sm"
                    >
                      <thead>
                        <tr>
                          <th>Producer</th>
                          <th>Interval</th>
                          <th>Previous Year</th>
                          <th>Following Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {maxProjectionWin.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.producer}</td>
                              <td>{value.interval}</td>
                              <td>{value.previousWin}</td>
                              <td>{value.followingWin}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                  <Col lg={12}>
                    <Card.Text>Minimum</Card.Text>

                    <Table
                      striped="true"
                      bordered={true}
                      hover={true}
                      responsive="sm"
                    >
                      <thead>
                        <tr>
                          <th>Producer</th>
                          <th>Interval</th>
                          <th>Previous Year</th>
                          <th>Following Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {minProjectionWin.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{value.producer}</td>
                              <td>{value.interval}</td>
                              <td>{value.previousWin}</td>
                              <td>{value.followingWin}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
          <Col md={12} lg={6}>
            <Card body>
              <Card.Title>List movie winners by year</Card.Title>

              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search by year"
                  aria-label="Search by year"
                  aria-describedby="basic-addon2"
                  value={movieYear}
                  onChange={handleOnChange}
                />
                <Button
                  onClick={handleOnSubmit}
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  Buscar
                </Button>
              </InputGroup>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Table
                  striped="true"
                  bordered={true}
                  hover={true}
                  responsive="sm"
                >
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Year</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winnersByYear.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{value.id}</td>
                          <td>{value.year}</td>
                          <td>{value.title}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Dashboard;
