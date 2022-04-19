import { useHits } from "react-instantsearch-hooks";
import { Table } from "react-bootstrap";

export function Hits({ hitComponent: Hit }) {
  const { hits } = useHits();

  return (
    <Table striped class="table-auto">
      <thead>
        <tr>
          <th>Airport</th>
          <th>City</th>
          <th>Country</th>
          <th>IATA Code</th>
          <th>Connections</th>
        </tr>
      </thead>
      <tbody>
        {hits.map((hit) => (
          <Hit hit={hit} />
        ))}
      </tbody>
    </Table>
  );
}