import axios from "axios"
import { useState } from 'react'


export default function Registration(props) {
    const { navigate, setAuth } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [confirmPass, setConfirmPass] = useState('')

    function handleRegistrationSubmit(event) {
        event.preventDefault()
        setError(null)
        if (password !== confirmPass) {
            alert("Passwords don't match!")
            
        }
        
        axios.post('https://blood-pressure-tracker.onrender.com/auth/users/', {
            username: username,
            password: password,

        }).then((res) => {      
            event.preventDefault()
            setError(null)
            console.log("got this far")
            
            axios.post('https://blood-pressure-tracker.onrender.com/auth/token/login/', {
                username: username,
                password: password,
            },
            )
            .then((res) => {
                const token = res.data.auth_token
                setAuth(username, token)
                navigate('/')
            })
            .catch((error) => {
                setError(error.message)
            })
        })
        // .catch((error) => {
        //     setError(Object.values(error.response.data))
        //     console.log(error)
        // })
    }


    return (
        <>
        {error && <div>{error}</div>}
    <form id="registration-form" onSubmit={handleRegistrationSubmit}>
            <div className="form-controls">
                <label htmlFor="username-field">Username&ensp; </label>
                <input id="username-field" type="text" placeholder="Create a username" onChange={(e) => setUsername(e.target.value)} required/> 
            </div>
            <div className="form-controls">
                <label htmlFor="password-field">Password &ensp;</label>
                <input id="password" type="password" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} required/> 
            </div>
            <div className="form-controls">
                <label htmlFor="confirm-password-field">Confirm Password&ensp; </label>
                <input id="confirm-password" type="password" placeholder="Confirm password" onChange={(e) => setConfirmPass(e.target.value)} required /> 
            </div>
            <div className="form-submit">
                <input style={{color:"white", backgroundColor:"rgb(69, 118, 175)"}} type="submit" id="submit" value="Register"/>
            </div>
        </form>
        </>
    )
}