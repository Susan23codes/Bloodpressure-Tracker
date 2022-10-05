import './App.css';
import { Routes, Route, useNavigate, BrowserRouter as Router } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'
import Homepage from './Homepage';
import Navbar from './Navbar';
import NewReading from './NewReading';
import Results from './Results';
import Login from './Login';
import Registration from './Registration';

function App() {
  const [token, setToken] = useLocalStorageState('bloodpressureToken', null)
  const [username, setUsername] = useLocalStorageState('bloodpressureUsername', '')

  const navigate = useNavigate()
  const isLoggedIn = username && token

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  return (
    <div className="App">
      <Navbar 
      token={token}
      setAuth={setAuth}
      isLoggedIn={isLoggedIn}
      />
      <Routes>
        {!isLoggedIn &&
      <Route
            path="/"
            element={<Login
              setAuth={setAuth}
              isLoggedIn={isLoggedIn}
              navigate={navigate}
              username={username}
              setUsername={setUsername}
            />}
          />
          }
          <Route
            path="/register"
            element={<Registration
              setAuth={setAuth}
              isLoggedIn={isLoggedIn}
              navigate={navigate}
              username={username}
              setUsername={setUsername}
            />}
          />
        <Route
          path="/"
          element={<Homepage
            navigate={navigate}
          />}
        />
        <Route
          path="/newreading"
          element={<NewReading
            token={token}
            navigate={navigate}
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
