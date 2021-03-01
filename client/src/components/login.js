import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import DisplayError from './DisplayError'
import axios from 'axios'

function Login() {

    const [ data, setData ] = useState({
        username: '',
        password: ''
    })

    const [ errors, setErrors ] = useState([])

    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    const { username, password } = data

    const onSubmit = async (e) => {

        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = { username, password }

        try {
            const res = await axios.post('http://localhost:5000/', body, config)
            console.log(res)
            localStorage.setItem('token',res.data.token)
            setIsAuthenticated(true)
        } catch ( error ) {
            localStorage.removeItem('token')
            setErrors(error.response.data.errors)
            console.log(error.response.data.errors)
            setIsAuthenticated(false)
        }
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div class="form">
            <ul class="tab-group">
                <li class="tab active"><a href="/">Log In</a></li>
                <li class="tab"><a href="/signup">Sign Up</a></li>
            </ul>
            { errors.length!==0 && errors.map((error) => <DisplayError error={error.msg}/>) }
            <div class="tab-content">
                <div id="login">   
                    <h1>Welcome Back!</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div class="field-wrap">
                            <input 
                                type="text"  
                                value={username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                required 
                                autocomplete="off"                               
                            />
                            <label>
                                Username<span class="req">*</span>
                            </label>
                        </div>
                        <div class="field-wrap">
                            <input 
                                type="password"  
                                value={password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                required 
                                autocomplete="off"                              
                            />
                            <label>
                                Password<span class="req">*</span>
                            </label>
                        </div>
                        <p class="forgot"><a href="#">Forgot Password?</a></p>
                        <button type="submit" class="button button-block">Log In</button>                
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;