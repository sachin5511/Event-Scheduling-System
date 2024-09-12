import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        sessionStorage.setItem("email", email);
        try {
            await axios.post('http://localhost:5000/api/login', { email });
            navigate('/availability');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <>
        <div className='login-div'>
            <div className="login-container">
                <h1>Login</h1>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
        </>
    );
};

export default Login;
