import React from "react";
import { Card, Table, Spinner } from "react-bootstrap";

/**This test function should guarantee that the bouth table are correctly rendered
 * List years with multiple winners
 * and
 * Top 3 studios with winners
 */
function YearsAndWinners({ multWinners, loading, changeTable, topWinners }) {
  const cardTitle = [
    "List years with multiple winners",
    "Top 3 studios with winners",
  ];

  function handleRenderCorrectTable() {
    if (changeTable) {
      return multWinners.map(({ year, winnerCount }, index) => {
        return (
          <tr key={index}>
            <td>{year}</td>
            <td>{winnerCount}</td>
          </tr>
        );
      });
    } else {
      return topWinners.map(({ name, winCount }, index) => {
        return (
          <tr key={index}>
            <td>{name}</td>
            <td>{winCount}</td>
          </tr>
        );
      });
    }
  }

  return (
    <Card body>
      <Card.Title>{cardTitle[changeTable ? 0 : 1]}</Card.Title>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table
          striped="true"
          bordered={true}
          hover={true}
          responsive="sm"
          aria-label="List movie winners by year"
        >
          <thead>
            <tr>
              <th>{changeTable ? "Year" : "Name"}</th>
              <th>Win Count</th>
            </tr>
          </thead>
          <tbody>{handleRenderCorrectTable()}</tbody>
        </Table>
      )}
    </Card>
  );
}

export default YearsAndWinners;
