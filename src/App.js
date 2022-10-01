import './App.css';
import { Routes, Route, useNavigate, BrowserRouter as Router } from 'react-router-dom'
import Homepage from './Homepage';
import Navbar from './Navbar';
import NewReading from './NewReading';
import Results from './Results';

function App() {

  const navigate = useNavigate()


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Homepage
            navigate={navigate}
          />}
        />
        <Route
          path="/newreading"
          element={<NewReading
          />}
        />
        <Route
          path="/results"
          element={<Results
          />}
        />
      </Routes>

    </div>
  );
}

export default App;
