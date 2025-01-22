import { mount } from 'mfeMarketing/MarketingApp';
import React, { useRef, useEffect, useState } from 'react';

export default () => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref}></div>;
};
