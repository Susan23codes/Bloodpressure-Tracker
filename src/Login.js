import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Login(props) {
    const {setAuth, isLoggedIn, navigate, username, setUsername} = props
    const [password, setPassword] = useState('')
    
    const [error, setError] = useState(null)

   

    function handleLogin(e) {
            e.preventDefault()
            setError(null)
            
            axios.post('http://127.0.0.1:8000/auth/token/login', {
                username: username,
                password: password,
            },
            )
            .then((res) => {
                const token = res.data.auth_token
                setAuth(username, token)
                
    
            })
            .catch((error) => {
                setError(error.message)
            })
        }
    

    return (
        <>
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
                        <input style={{color:"white", backgroundColor:"rgb(69, 118, 175)"}} id="submit" type="submit" value="Log In" />
                    </div>
                </form>
                <p>Don't have an account?  Click <Link to={'/registration'}>here</Link> to register.</p>
            </div>

        </>
    )
}