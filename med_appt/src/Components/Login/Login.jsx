import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        setServerMessage(data.error);
                    } else {
                        // Assuming the server returns an auth token
                        sessionStorage.setItem('email', formData.email);
                        sessionStorage.setItem('auth-token', data.token);
                        // Redirect to Home page after successful login
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    setServerMessage("Login failed. Please try again.");
                });
        }
    };

    const handleReset = () => {
        setFormData({ email: '', password: '' });
        setErrors({});
        setServerMessage('');
    };

    return (
        <div className="container">
            <div className="login-grid">
                <div className="login-text">
                    <h2>Login</h2>
                </div>
                <div className="login-text">
                    Are you a new member?{" "}
                    <span>
                        <a href="/signup" style={{ color: "#2190FF" }}>
                            Sign Up Here
                        </a>
                    </span>
                </div>
                <br />
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <small className="error">{errors.email}</small>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <small className="error">{errors.password}</small>
                            )}
                        </div>
                        <div className="btn-group">
                            <button
                                type="submit"
                                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                            >
                                Login
                            </button>
                            <button
                                type="reset"
                                onClick={handleReset}
                                className="btn btn-danger mb-2 waves-effect waves-light"
                            >
                                Reset
                            </button>
                        </div>
                        <br />
                        <div className="login-text">Forgot Password?</div>
                        {serverMessage && <p>{serverMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;