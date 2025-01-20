import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    import('mfeMarketing/MarketingApp')
      .then(({ mount }) => {
        mount(ref.current);
      })
      .catch((err) => {
        console.error('Failed to load MarketingApp', err);
      });
  }, []);

  return <div ref={ref}></div>;
};
