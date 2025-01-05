import App from './App';
import ReactDOM from 'react-dom/client';

const element = document.querySelector('#container-root');
if (element) {
  const root = ReactDOM.createRoot(element);
  root.render(<App />);
}
