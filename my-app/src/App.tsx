import './App.css';
import Dashboard from './Dashboard/dashboard';
import RightNav from './Navbar/right/rightnav';
import LeftNav from './Navbar/left/leftnav';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/login';
import React from 'react'; // Import React để dùng React.ReactNode
import Forgotpass from './Login/forgotpass/forgotpass';
import Resetpassword from './Login/resetpass/resetpass';

// Định nghĩa kiểu cho props, đặc biệt là kiểu của children
type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='app-container'>
      <div className='left-navbar'>
        <LeftNav />
      </div>
      <div className='main'>
        {children}
      </div>
      <div className='right-navbar'>
        <RightNav />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/login/quenmatkhau" element={<Forgotpass/>} />
        <Route path="/login/resetpassword" element={<Resetpassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
