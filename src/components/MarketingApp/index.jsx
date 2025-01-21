import React, { useRef, useEffect, useState } from 'react';

export default () => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('mfeMarketing/MarketingApp')
      .then(({ mount }) => {
        mount(ref.current);
      })
      .catch((err) => {
        console.error('Failed to load MarketingApp', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <div ref={ref}>{loading ? <div>Loading...</div> : <></>}</div>;
};
