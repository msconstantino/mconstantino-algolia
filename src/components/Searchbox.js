import { useSearchBox } from "react-instantsearch-hooks";
import { useState, useRef, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import { Row, Col } from "react-bootstrap";

export function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  function handleReset(event) {
    event.preventDefault();
    event.stopPropagation();

    setInputValue("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    if (query !== inputValue) {
      refine(inputValue);
    }
  }, [inputValue, refine, query]);

  useEffect(() => {
    if (document.activeElement !== inputRef.current && query !== inputValue) {
      setInputValue(query);
    }
  }, [inputValue, query]);

  return (
    <Row className="ais-SearchBox">
      <Col>
        <h1>Airport Database</h1>

        <form
          action=""
          className="ais-SearchBox-form"
          noValidate
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Search />
          <input
            ref={inputRef}
            className="ais-SearchBox-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={props.placeholder}
            spellCheck={false}
            maxLength={512}
            type="search"
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
          />
        </form>
      </Col>
    </Row>
  );
}
