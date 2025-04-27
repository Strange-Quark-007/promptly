import React, { Suspense } from 'react';

function withSuspense(Component) {
  return function WithSuspenseWrapper(props) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}

export default withSuspense;