import App from './component.jsx';
import ErrorBoundary from '@/components/ErrorBoundary/index.jsx';

export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
