import React, { useEffect, useState } from 'react';
import LOGO from "../assets/Clixxo.png";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();

  const handleLogout = () => {
    if (window.confirm('Are you sure to log out?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className='fixed w-full z-50'>
      {/* First row: Logo */}
      <div className='bg-black flex items-center relative' style={{ height: 40, padding: '0 12px' }}>
        <img src={LOGO} className='h-8 w-auto cursor-pointer' alt="Logo"  onClick={() => navigate("/")}/>
        {/* Equalizer Bars Effect */}
        <div style={{ position: 'absolute', right: 0, top: 0, height: 40, width: 520, display: 'flex', alignItems: 'flex-end', gap: 2, pointerEvents: 'none' }}>
          {/* Extended static blue bars, heights chosen to match the screenshot */}
          {[10, 14, 18, 24, 28, 32, 30, 26, 20, 16, 12, 8, 12, 18, 25, 30, 32, 30, 28, 22, 16, 10, 6, 10, 16, 22, 28, 32, 28, 22, 16, 12, 8, 12, 18].map((h, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: h * 1.2,
                background: 'linear-gradient(to top, #00eaff 0%, #3bb6f5 100%)',
                borderRadius: 2,
                marginLeft: 1,
                marginRight: 1,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>

      {/* Second row: Date, Time, User, Logout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-black min-h-[36px] py-1 bg-[#f5f6fa] px-2 sm:px-6 gap-2 md:gap-0">
        <div className='flex flex-row gap-2'>
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>

        <div className='flex items-center gap-4'>
          <div>
            <p className='text-red-500' style={{ fontSize: 12 }}> Web SSH Ftp Telnet exist the risk , please close or set the whitelsit address</p>
          </div>
          <div>
            Current User: <span className="font-bold text-purple-500">{user?.username || 'admin'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="clixxo-logout-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f7f7fa',
              color: '#222',
              fontSize: 13,
              padding: '1px 6px 1px 6px',
              border: '1.2px solid #bbb',
              borderRadius: 16,
              boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
              cursor: 'pointer',
              fontWeight: 500,
              gap: 6,
              outline: 'none',
              minWidth: 70,
              marginLeft: 2,
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
          >
            Logout
            <PowerSettingsNewIcon style={{ marginLeft: 4, fontSize: 18, color: '#888' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;