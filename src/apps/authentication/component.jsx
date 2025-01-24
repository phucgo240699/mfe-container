import { mount } from 'mfeAuthentication/AuthenticationApp';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthenticationContext } from '@/contexts/authentication';

const App = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { changeAccessToken } = React.useContext(AuthenticationContext);

  const handleTokenCallback = (token) => {
    changeAccessToken?.(token);
    navigate('/');
  };

  useEffect(() => {
    mount(ref.current, {
      tokenCallback: handleTokenCallback,
    });
  }, []);

  return <div ref={ref}></div>;
};

export default App;
