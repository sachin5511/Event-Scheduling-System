import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Availability from './components/Availability';
// import AdminDashboard from './components/AdminDashboard';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';
import Dashboard from './pages/DashBoard/Dashborad';
import 'remixicon/fonts/remixicon.css';


const App: React.FC = () => {
    return (
        <Router>
             <div className="d-flex flex-column min-vh-100">
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/availability" element={<Availability />} />
                    <Route path="/admin" element={<Dashboard/>} />
                </Routes>
            </div> 
        </Router>
    );
};

export default App;
