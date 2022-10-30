import { Link } from 'react-router-dom'
import axios from 'axios'




export default function Navbar(props) {
    const { token, setAuth, isLoggedIn } = props

    const handleLogout = () => {
        axios
            .post(
                'https://blood-pressure-tracker.onrender.com/auth/token/logout',
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


    function handleOpenNav() {
        const mobileBtn = document.getElementById('mobile-cta')
        const nav = document.querySelector('nav')
       
            nav.classList.add('menu-btn')
    
    }

    function handleCloseNav() {
        const mobileBtnExit = document.getElementById('mobile-exit')
        const nav = document.querySelector('nav')
       
            nav.classList.remove('menu-btn')
    
    }

    return (
        // <div className="navbar">
        //     <h1 className="navbar-title">My Blood Pressure Tracker</h1>
        //     {isLoggedIn &&
        //         <div className="navbar-buttons">
        //             <div className='results-buttons'>
        //                 {/* <span style={{ color: "white", textDecoration: "underline" }}>Results:</span> */}
        //                 <Link to="/resultslist" style={{ color:"white", textDecoration: "none" }} className="results-list">All Readings</Link>
        //                 <Link to="/results" style={{ color:"white", textDecoration: "none" }} className="results-list">Data Visualization</Link>

        //             </div>
        //             <div className='home-logout-buttons'>
        //                 <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        //                 <span> &ensp; | &ensp; </span>
        //                 <Link to="/" onClick={handleLogout} style={{ color: "white", textDecoration: "none" }}>Logout</Link>
        //             </div>
        //         </div>
        //     }
        // </div >

        <div class="navbar">
            <div class="container">
                <Link to="/" class="title"> BloodPressure<span>Tracker</span></Link>

                <img id="mobile-cta" class="mobile-menu" src="/Hamburger_icon.svg" alt="close icon" onClick={handleOpenNav} />
                <nav>
                    <img id="mobile-exit" class="mobile-menu-exit" src="/close.svg" alt="close navigation" onClick={handleCloseNav} />
                    <ul class="primary-nav">
                        <li><Link to="/newreading" onClick={handleCloseNav} style={{ color: "white", textDecoration: "none" }}>New Reading</Link></li>
                        <li><Link to="/resultslist" onClick={handleCloseNav} style={{ color: "white", textDecoration: "none" }}>Results</Link></li>
                        <li><Link to="/results" onClick={handleCloseNav} style={{ color: "white", textDecoration: "none" }}>Data Visualization</Link></li>
                    </ul>

                    <ul class="secondary-nav">
                        <li><Link to="/" onClick={handleCloseNav} style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
                        <li><Link to="/" onClick={() => {handleLogout(); handleCloseNav()}} style={{ color: "white", textDecoration: "none" }}>Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}