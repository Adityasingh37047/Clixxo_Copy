import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { RESTART_SECTIONS, RESTART_BUTTON_LABEL } from '../constants/RestartConstants';
import { systemRestart, servicePing, serviceRestart } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const blueBarStyle = {
  width: '100%',
  height: 36,
  background: 'linear-gradient(to bottom, #b3e0ff 0%, #6ec1f7 50%, #3b8fd6 100%)',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 22,
  color: '#444',
  justifyContent: 'center',
  boxShadow: '0 2px 8px 0 rgba(80,160,255,0.10)',
};
const sectionContainerStyle = {
  width: '100%',
  maxWidth: 1400,
  background: '#fff',
  border: '1px solid #888',
  borderRadius: 8,
  margin: '32px auto',
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
};
const contentRowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '48px 48px',
  gap: 24,
};
const instructionStyle = {
  fontSize: 20,
  color: '#666',
  textAlign: 'center',
  flex: 1,
};
const buttonSx = {
  background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '18px',
  borderRadius: 2,
  minWidth: 140,
  minHeight: 48,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
    color: '#fff',
  },
};

const Restart = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serviceSuccess, setServiceSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [loadingType, setLoadingType] = useState(''); // 'system' or 'service'
  const navigate = useNavigate();

  const handleRestart = async (sectionKey) => {
    setError('');
    if (sectionKey === 'system') {
      setLoading(true);
      setLoadingType('system');
      try {
        await systemRestart();
        setTimeout(async () => {
          let pinged = false;
          for (let i = 0; i < 20; i++) {
            try {
              await servicePing();
              pinged = true;
              break;
            } catch (e) {
              await new Promise(res => setTimeout(res, 10000));
            }
          }
          setLoading(false);
          setLoadingType('');
          if (pinged) {
            setSuccess(true);
            setShowModal(true);
          } else {
            setError('Server is not reachable. Please check your network or try again later.');
          }
        }, 5000);
      } catch (e) {
        setError('Failed to initiate system restart.');
        setLoading(false);
        setLoadingType('');
      }
    } else if (sectionKey === 'service') {
      setLoading(true);
      setLoadingType('service');
      try {
        await serviceRestart();
        setTimeout(async () => {
          let pinged = false;
          for (let i = 0; i < 20; i++) {
            try {
              await servicePing();
              pinged = true;
              break;
            } catch (e) {
              await new Promise(res => setTimeout(res, 1000));
            }
          }
          setLoading(false);
          setLoadingType('');
          if (pinged) {
            setServiceSuccess(true);
            setShowServiceModal(true);
          } else {
            setError('Server is not reachable. Please check your network or try again later.');
          }
        }, 5000);
      } catch (e) {
        setError('Failed to initiate service restart.');
        setLoading(false);
        setLoadingType('');
      }
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
      {RESTART_SECTIONS.map((section) => (
        <div key={section.key} style={sectionContainerStyle}>
          <div style={blueBarStyle}>{section.title}</div>
          <div style={{ ...contentRowStyle, flexDirection: 'row', padding: '48px 48px' }}>
            <div style={instructionStyle}>{section.instruction}</div>
            <Button
              sx={buttonSx}
              onClick={() => handleRestart(section.key)}
              disabled={loading && loadingType === section.key}
            >
              {RESTART_BUTTON_LABEL}
            </Button>
          </div>
        </div>
      ))}
      {error && (
        <div style={{ color: 'red', fontWeight: 600, fontSize: 18, marginTop: 24 }}>{error}</div>
      )}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.7)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#0e8fd6', marginBottom: 24 }}>
            {loadingType === 'system' ? 'System is restarting...' : 'Service is restarting...'}
          </div>
          <div className="loader" style={{ width: 48, height: 48, border: '6px solid #b3e0ff', borderTop: '6px solid #0e8fd6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
        </div>
      )}
      {showModal && success && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 40, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0e8fd6' }}>Restart successful</div>
            <div style={{ fontSize: 18, marginBottom: 32 }}>Now please login again.</div>
            <Button
              variant="contained"
              sx={{ ...buttonSx, minWidth: 100, fontSize: 18 }}
              onClick={() => {
                setShowModal(false);
                navigate('/login');
              }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
      {showServiceModal && serviceSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 40, minWidth: 320, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0e8fd6' }}>Service restart successful</div>
            <div style={{ fontSize: 18, marginBottom: 32 }}>The service has been restarted successfully.</div>
            <Button
              variant="contained"
              sx={{ ...buttonSx, minWidth: 100, fontSize: 18 }}
              onClick={() => {
                setShowServiceModal(false);
                setServiceSuccess(false);
              }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restart; 