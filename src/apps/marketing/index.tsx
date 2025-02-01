import App from './component.jsx';
import UnavailableBoundary from '@/errorBoundaries/unavailable/index.jsx';

export default () => (
  <UnavailableBoundary>
    <App />
  </UnavailableBoundary>
);
