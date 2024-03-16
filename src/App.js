import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CheckJobStatus from './components/CheckJobStatus';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav>
        <h1>Syriatel App</h1>
        <Link to="/">Login</Link>
        <Link to="/check">Check Job Status</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/check" element={<CheckJobStatus />} />
      </Routes>
    </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
