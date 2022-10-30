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

        <div class="navbar">
            <div class="container">
                <Link to="/" class="title"> BloodPressure<span>Tracker</span></Link>
                {isLoggedIn &&
                    <>
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
                                <li><Link to="/" onClick={() => { handleLogout(); handleCloseNav() }} style={{ color: "white", textDecoration: "none" }}>Logout</Link></li>
                            </ul>
                        </nav>
                    </>
                }
            </div>
        </div>
    )
}
