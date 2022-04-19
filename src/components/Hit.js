export function Hit({ hit }) {
  return (
    <tr>
      <td>{hit.name}</td>
      <td>{hit.city}</td>
      <td>{hit.country}</td>
      <td>{hit.iata_code}</td>
      <td>{hit.links_count}</td>
    </tr>
  );
}
