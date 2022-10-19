import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'


export default function Login(props) {
    const { setAuth, isLoggedIn, navigate, username, setUsername } = props
    const [password, setPassword] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)

    const [error, setError] = useState(null)



    function handleLogin(e) {
        e.preventDefault()
        setError(null)
        setLoggingIn(true)
        axios.post('https://blood-pressure-tracker.onrender.com/auth/token/login/', {
            username: username,
            password: password,
        },
        )
            .then((res) => {
                const token = res.data.auth_token
                setAuth(username, token)
                setLoggingIn(false)

            })
            .catch((error) => {
                setError(error.message)
            })
    }


    return (
        <>
        {error}
            {loggingIn ? (
                <div className='loader'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="200"
                        visible={true}
                    />
                </div>
            ) : (
                <div className="entire-login-form">
                    <h2 className='login-form'>Please Log In!</h2>
                    {error && <div className='error'>{error}</div>}
                    <form id="login-form" onSubmit={handleLogin}>
                        <div className="form-controls">
                            <label htmlFor="username-field">Username&ensp;</label>
                            <input id="username-field" type="text" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-controls">
                            <label htmlFor="password-field">Password&ensp;&nbsp;</label>
                            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-submit">
                            <input style={{ color: "white", backgroundColor: "rgb(69, 118, 175)" }} id="submit" type="submit" value="Log In" />
                        </div>
                    </form>
                    <p>Don't have an account?  Click <Link to={'/register'}>here</Link> to register.</p>
                </div>
            )}
        </>
    )
}