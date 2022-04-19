import { SearchBox } from "./components/Searchbox";
import { Hits } from "./components/Hits";
import { Hit } from "./components/Hit";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks";
import {Container} from 'react-bootstrap';

const searchClient = algoliasearch(
  "A68302HCS7",
  "d6dc59f689fcb2c0aa590e9fce6565fc"
);

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="airports">
      <Container>
        <SearchBox placeholder="Search for an airport" />
        <Hits hitComponent={Hit} />
      </Container>
    </InstantSearch>
  );
}
