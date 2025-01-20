import './App.css';
import { Header } from './components/Header';
import DashboardApp from './components/DashboardApp/index.jsx';
import MarketingApp from './components/MarketingApp/index.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

const App = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<DashboardApp />} />
          <Route path="/marketing/*" element={<MarketingApp />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default App;
