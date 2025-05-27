import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PocketDex from "./PocketDex";
import PokemonDetails from './components/PokemonDetails';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PocketDex />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
