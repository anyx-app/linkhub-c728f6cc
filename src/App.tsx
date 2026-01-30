import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import LinksPage from './pages/LinksPage';
import AnalyticsPage from './pages/AnalyticsPage';

// Placeholder for Settings
const SettingsPage = () => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-bold text-white mb-4">Settings</h1>
    <p className="text-slate-400">Manage your account preferences here.</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="links" element={<LinksPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
