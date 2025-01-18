import { BrowserRouter } from 'react-router';
import './App.css';
import MarketingApp from './components/MarketingApp/index.jsx';
import { Header } from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header>
        <MarketingApp />
      </Header>
    </BrowserRouter>
  );
};

export default App;
