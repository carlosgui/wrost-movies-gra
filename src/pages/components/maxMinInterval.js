import { Table } from "react-bootstrap";

function MaxMinInterval({ content }) {
  return (
    <Table striped="true" bordered={true} hover={true} responsive="sm">
      <thead>
        <tr>
          <th>Producer</th>
          <th>Interval</th>
          <th>Previous Year</th>
          <th>Following Year</th>
        </tr>
      </thead>
      <tbody>
        {content.map(
          ({ producer, interval, previousWin, followingWin }, index) => {
            return (
              <tr key={index}>
                <td>{producer}</td>
                <td>{interval}</td>
                <td>{previousWin}</td>
                <td>{followingWin}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </Table>
  );
}

export default MaxMinInterval;
