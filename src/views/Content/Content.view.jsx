import React from 'react';

import Home from '../Home';

function Content({ videos, loading, error }) {
  return <Home videos={videos} loading={loading} error={error} />;
}

export default Content;
