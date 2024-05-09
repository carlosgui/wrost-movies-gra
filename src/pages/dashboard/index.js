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
import YearsAndWinners from "../components/yearsAndWinners";
import MaxMinInterval from "../components/maxMinInterval";

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

  function handleOnChange(e) {
    setMovieYear(e.target.value);
  }

  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        const [winByYear] = await Promise.all([
          api.get(`?winner=true&year=${movieYear}`),
        ]);

        setWinnersByYear(winByYear.data);
      }

      if (movieYear !== "") {
        submit();
      }
    },
    [movieYear]
  );

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} lg={6}>
          <YearsAndWinners
            multWinners={multWinners}
            loading={loading}
            changeTable={true}
          />
        </Col>
        <Col md={12} lg={6}>
          <YearsAndWinners
            topWinners={topWinners}
            loading={loading}
            changeTable={false}
          />
        </Col>
      </Row>

      <div className="mt-4">
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
                    <MaxMinInterval content={maxProjectionWin} />
                  </Col>
                  <Col lg={12}>
                    <Card.Text>Minimum</Card.Text>
                    <MaxMinInterval content={minProjectionWin} />
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
                  type="number"
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
                  Search
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
