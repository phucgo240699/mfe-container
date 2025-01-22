import './App.css';
import { Header } from '@/components/Header';
import DashboardApp from '@/apps/dashboard/index.jsx';
import MarketingApp from '@/apps/marketing/index.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

const App = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Navigate to={'/dashboard'} />} />
          <Route path="/dashboard/*" element={<DashboardApp />} />
          <Route path="/marketing/*" element={<MarketingApp />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default App;
