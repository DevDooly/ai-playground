import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CaseConverter from './components/CaseConverter';
import VimCheatsheet from './components/VimCheatsheet';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CaseConverter />} />
        <Route path="/vim" element={<VimCheatsheet />} />
      </Routes>
    </Layout>
  );
}

export default App;
