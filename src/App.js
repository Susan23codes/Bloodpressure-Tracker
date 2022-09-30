import './App.css';
import { Routes, Route, useNavigate, BrowserRouter as Router } from 'react-router-dom'
import Homepage from './Homepage';
import NewReading from './NewReading';

function App() {

  const navigate = useNavigate()


  return (
    <div className="App">
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

      </Routes>

    </div>
  );
}

export default App;
