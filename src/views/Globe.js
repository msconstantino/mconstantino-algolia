import React, { useRef, useState, memo } from "react";
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
import algoliasearch from "algoliasearch/lite";
import ReactTooltip from "react-tooltip";
import { Search } from "react-bootstrap-icons";
import { PriceSlider, NoResults, ResultsNumberMobile } from "../widgets";
import "../Custom.css";
import Navigation from "../components/Navigation";
import { Container, Col, Row } from "react-bootstrap";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGlobe,
  ZoomableGroup,
} from "react-simple-maps-globe";
import { geoCircle } from "d3-geo";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const searchClient = algoliasearch(
  "A68302HCS7",
  "d6dc59f689fcb2c0aa590e9fce6565fc"
);

const GlobeView = (props) => {
  const [content, setContent] = useState("");
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

  const circles = [
    geoCircle().center([3.4, 6.5]).radius(0.5)(),
    geoCircle().center([100.5, 13.7]).radius(0.5)(),
    geoCircle().center([-99.1, 19.4]).radius(0.5)(),
  ];



  const Hits = ({ hits }) => {

    const markers = []

    hits.map((hit) => {
      markers.push(geoCircle().center([hit._geoloc.lng, hit._geoloc.lat]).radius(0.5)())
    })

    return (
    <>
      <ComposableMap
        width={750}
        height={750}
        projection="orthographic"
        projectionConfig={{ scale: 330 }}
      >
        <ZoomableGlobe>
          <circle
            cx={375}
            cy={375}
            r={330}
            fill="transparent"
            stroke="#CFD8DC"
          />
          <Geographies disableOptimization geography={geoUrl}>
            {(geos, proj) =>
              geos.map((geo, i) => (
                <Geography
                  key={geo.id + i}
                  geography={geo}
                  projection={proj}
                  style={{
                    default: { fill: "#EAEAEC", stroke: "#fff" },
                  }}
                />
              ))
            }
          </Geographies>
          <Geographies geography={markers} disableOptimization>
          {(geos, proj) =>
            geos.map((geo, i) =>
              <Geography
                key={i}
                geography={geo}
                projection={proj}
                style={{
                  default: { fill: "red", stroke: "#FFF" }
                }}
              />
          )}
        </Geographies>
        </ZoomableGlobe>
      </ComposableMap>
    </>
    )
      };

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
                          label: "250 items",
                          value: 250,
                        },
                        {
                          label: "500 items",
                          value: 500,
                        },
                        {
                          label: "1000 items",
                          value: 1000,
                        },
                        {
                          label: "3282 items",
                          value: 3282,
                        },
                      ]}
                      defaultRefinement={250}
                    />
                  </header>
                </Col>
              </Row>

              <CustomHits />
              <NoResults />
            </section>
          </Col>
        </Row>
      </Container>
    </InstantSearch>
  );
};

export default GlobeView;
