import React, { useState } from 'react'
import './login.css'
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../Actions/userActions';
function Login() {
    const [state, setstate] = useState({ email: "", password: "" })
    const dispatch = useDispatch();

    const loginValidator = (event) => {
        event.preventDefault();
        console.log(state.email, state.password)
        dispatch(loginUser(state.email, state.password))

    }
    const handler = (event) => {
        const { name, value } = event.target;
        setstate({ ...state, [name]: value })
    }
    return (
        <div className="login">
            <form className="loginForm" onSubmit={loginValidator}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>
                    Social App
                </Typography>

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={state.email}
                    onChange={handler}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={state.password}
                    onChange={handler}
                />

                <Link to="/forgot/password">
                    <Typography>Forgot Password?</Typography>
                </Link>

                <Button type="submit">Login</Button>

                <Link to="/register">
                    <Typography>New User?</Typography>
                </Link>
            </form>
        </div >
    )
}

export default Login; 