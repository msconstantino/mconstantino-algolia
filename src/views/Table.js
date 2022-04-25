import React, { useRef } from "react";
import {
  InstantSearch,
  RefinementList,
  Pagination,
  ClearRefinements,
  connectHits,
  HitsPerPage,
  Panel,
  Configure,
  SearchBox,
} from "react-instantsearch-dom";
import { PriceSlider, NoResults, ResultsNumberMobile } from "../widgets";
import { Search } from "react-bootstrap-icons";
import { Container, Col, Row, Table } from "react-bootstrap";
import Navigation from "../components/Navigation";
import algoliasearch from "algoliasearch/lite";
import "../Custom.css";

const searchClient = algoliasearch(
  "A68302HCS7",
  "d6dc59f689fcb2c0aa590e9fce6565fc"
);

const TableView = (props) => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  function closeFilters() {
    document.body.classList.remove("filtering");
    containerRef.current.scrollIntoView();
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("click", onClick);
  }

  function onKeyUp(event) {
    if (event.key !== "Escape") {
      return;
    }

    closeFilters();
  }

  function onClick(event) {
    if (event.target !== headerRef.current) {
      return;
    }

    closeFilters();
  }

  const Hits = ({ hits }) => (
    <Table striped className="table-auto">
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
          <tr key={hit.name}>
            <td>{hit.name}</td>
            <td>{hit.city}</td>
            <td>{hit.country}</td>
            <td>
              <a
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${hit.iata_code}%20Airport`}
              >
                {hit.iata_code}
              </a>
            </td>
            <td>{hit.links_count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const CustomHits = connectHits(Hits);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="airports"
      searchState={props.searchState}
      createURL={props.createURL}
      onSearchStateChange={props.onSearchStateChange}
    >
      <Navigation />
      <Container>
        <Configure
          attributesToSnippet={["description:10"]}
          snippetEllipsisText="…"
          removeWordsIfNoResults="allOptional"
        />
        <Row>
          <Col sm={3}>
            <div className="container-wrapper">
              <section className="container-filters" onKeyUp={onKeyUp}>
                <div className="container-header">
                  <h2>Filters</h2>

                  <div className="clear-filters" data-layout="desktop">
                    <Row className="mb-3">
                      <Col>
                        <ResultsNumberMobile />
                      </Col>
                      <Col>
                        <ClearRefinements
                          translations={{
                            reset: <>Clear filters</>,
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="container-body">
                  <Panel header="Country">
                    <RefinementList
                      attribute="country"
                      searchable={true}
                      translations={{
                        placeholder: "Search by country",
                      }}
                    />
                  </Panel>

                  <Panel header="City">
                    <RefinementList
                      attribute="city"
                      searchable={true}
                      translations={{
                        placeholder: "Search by city",
                      }}
                    />
                  </Panel>
                  <Panel header="Total Connections">
                    <PriceSlider attribute="links_count" />
                  </Panel>
                </div>
              </section>
            </div>
          </Col>
          <Col sm={9}>
            <section className="container-results">
              <Row className="search-row">
                <Col>
                  <Row>
                    <Col sm={1}>
                      <Search />
                    </Col>

                    <Col>
                      <SearchBox
                        translations={{
                          placeholder: "Airport name, city, country...",
                        }}
                        submit={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 18 18"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.67"
                              transform="translate(1 1)"
                            >
                              <circle cx="7.11" cy="7.11" r="7.11" />
                              <path d="M16 16l-3.87-3.87" />
                            </g>
                          </svg>
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col className="searchbox">
                  <header className="container-header container-options">
                    <HitsPerPage
                      className="container-option"
                      items={[
                        {
                          label: "25 hits per page",
                          value: 25,
                        },
                        {
                          label: "50 hits per page",
                          value: 50,
                        },
                        {
                          label: "75 hits per page",
                          value: 75,
                        },
                        {
                          label: "100 hits per page",
                          value: 100,
                        },
                      ]}
                      defaultRefinement={25}
                    />
                  </header>
                </Col>
              </Row>

              <CustomHits />

              <NoResults />

              <footer className="container-footer">
                <Pagination
                  padding={2}
                  showFirst={false}
                  showLast={false}
                  translations={{
                    previous: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.143"
                        >
                          <path d="M9 5H1M5 9L1 5l4-4" />
                        </g>
                      </svg>
                    ),
                    next: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.143"
                        >
                          <path d="M1 5h8M5 9l4-4-4-4" />
                        </g>
                      </svg>
                    ),
                  }}
                />
              </footer>
            </section>
          </Col>
        </Row>
      </Container>
    </InstantSearch>
  );
};

export default TableView;
