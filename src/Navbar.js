import { Link } from 'react-router-dom'
import axios from 'axios'




export default function Navbar(props) {
    const { token, setAuth, isLoggedIn } = props

    const handleLogout = () => {
        axios
            .post(
                'http://127.0.0.1:8000/auth/token/logout',
                {},
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() =>
                setAuth('', null)
            )
    }

    return (
        <div className="navbar">
            <h1 className="navbar-title">My Blood Pressure Tracker</h1>
            {isLoggedIn &&
                <div className="navbar-buttons">
                    <Link to="/results" style={{ color: "white", textDecoration: "none" }}>My Results</Link>
                    <div className='home-logout-buttons'>
                        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
                        <span> &ensp; | &ensp; </span>
                        <Link to="/" onClick={handleLogout} style={{ color: "white", textDecoration: "none" }}>Logout</Link>
                    </div>
                </div>
            }
        </div >
    )
}