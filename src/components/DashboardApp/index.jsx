import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    import('mfeDashboard/DashboardApp').then(({ mount }) => {
      mount(ref.current);
    });
  }, []);

  return <div ref={ref}></div>;
};
