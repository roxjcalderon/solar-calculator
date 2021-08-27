import './App.css';
import Map from './Map.js';

function App() {
  // if this was actually going into production we'd want a secure backend to store these keys. 
  const api_keys = {
    google_api_key: process.env.REACT_APP_GOOGLE_API_KEY
  };
  return (
    <div className="App">
      <header className="App-header">
        <p> Nominal Power - Solar Calculator </p>
      </header>
      <Map {...api_keys} />
    </div>
  );
}

export default App;
