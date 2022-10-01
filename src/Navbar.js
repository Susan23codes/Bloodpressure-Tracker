import { Link } from 'react-router-dom'


export default function Navbar() {

    return (
        <div className="navbar">
            <h1 className="navbar-title">My Blood Pressure Tracker</h1>
            <div className="navbar-buttons">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>My Results</Link>
                <div className='home-logout-buttons'>
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
                    <span> &ensp; | &ensp; </span>
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>Logout</Link>
                </div>
            </div>
        </div >
    )
}