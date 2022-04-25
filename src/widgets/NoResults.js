import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

const NoResults = ({ searchResults }) => {
  if (!searchResults || searchResults.nbHits > 0) {
    return null;
  }

  const hasRefinements = searchResults.getRefinements().length > 0;
  const description = hasRefinements
    ? 'Try to reset your applied filters.'
    : 'Please try another query.';

  return (
    <div className="hits-empty-state">

      <p className="hits-empty-state-title">
        Sorry, we can't find any matches to your query!
      </p>
      <p className="hits-empty-state-description">{description}</p>
    </div>
  );
};

export default connectStateResults(NoResults);
