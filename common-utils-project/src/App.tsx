import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CaseConverter from './components/CaseConverter';
import VimCheatsheet from './components/VimCheatsheet';
import JsonYamlFormatter from './components/JsonYamlFormatter';
import UnitConverter from './components/UnitConverter'; // Import the new component

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CaseConverter />} />
        <Route path="/vim" element={<VimCheatsheet />} />
        <Route path="/json-yaml-formatter" element={<JsonYamlFormatter />} />
        <Route path="/unit-converter" element={<UnitConverter />} /> {/* Add the new route */}
      </Routes>
    </Layout>
  );
}

export default App;
