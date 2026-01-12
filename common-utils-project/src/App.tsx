import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home'; // Import the new Home component
import CaseConverter from './components/CaseConverter';
import VimCheatsheet from './components/VimCheatsheet';
import JsonYamlFormatter from './components/JsonYamlFormatter';
import UnitConverter from './components/UnitConverter';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the root route */}
        <Route path="/case-converter" element={<CaseConverter />} /> {/* Move CaseConverter to its own route */}
        <Route path="/vim" element={<VimCheatsheet />} />
        <Route path="/json-yaml-formatter" element={<JsonYamlFormatter />} />
        <Route path="/unit-converter" element={<UnitConverter />} />
      </Routes>
    </Layout>
  );
}

export default App;
