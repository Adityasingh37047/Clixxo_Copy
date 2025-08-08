import React, { useState, useRef, useEffect } from 'react';
import { postPingtest } from '../api/apiService';
import {
  PING_TITLE,
  PING_LABELS,
  PING_SOURCE_OPTIONS,
  PING_BUTTONS,
} from '../constants/PINGTestConstants';
import { TextField, Button, MenuItem } from '@mui/material';

const blueBar = (title) => (
  <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#7ecbfa] to-[#3b8fd6] h-12 rounded-t-lg flex items-center justify-center text-[22px] font-semibold text-gray-800 shadow mb-0 border-b border-[#b3e0ff]">
    {title}
  </div>
);

const buttonSx = {
  background: 'linear-gradient(to bottom, #5dc6f8 0%, #299fd6 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '16px',
  borderRadius: 0,
  minWidth: 90,
  px: 2,
  py: 0.5,
  boxShadow: '0 2px 8px #b3e0ff',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(to bottom, #299fd6 0%, #5dc6f8 100%)',
  },
};

function isValidIp(ip) {
  // Simple IPv4 validation
  return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}

function isValidCount(val) {
  const num = Number(val);
    return Number.isInteger(num) && num >= 1 && num <= 100;
}
function isValidLength(val) {
  const num = Number(val);
  return Number.isInteger(num) && num >= 56 && num <= 1024;
}

const PINGTest = () => {
  const [sourceIp, setSourceIp] = useState(PING_SOURCE_OPTIONS[0].value);
  const [destIp, setDestIp] = useState('');
  const [count, setCount] = useState('');
  const [length, setLength] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState(false);
  const [loadind, setLoading]= useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [destIpError, setDestIpError] = useState('');
  const [countError, setCountError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  const startpingTest = async () => {
    setDestIpError('');
    setCountError('');
    setLengthError('');
    let valid = true;

    if (!isValidIp(destIp)) {
      setDestIpError('Please enter a valid IP address.');
      valid = false;
    }
    if (count && !isValidCount(count)) {
      setCountError('Ping Count must be between 1 and 100.');
      valid = false;
    }
    if (length && !isValidLength(length)) {
      setLengthError('Package Length must be between 56 and 1024.');
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    if (!count && !length && destIp) {
      if (!intervalRef.current) {
        await handlePing(); // Call once immediately
        intervalRef.current = setInterval(() => {
          handlePing();
        }, 2000);
      }
    } else {
      await handlePing();
      setLoading(false);
    }
  };

  const stopPingInterval =()=>{
    if (intervalRef.current){
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLoading(false);
    setAlertMsg('Ping stopped!');
  };

  const handlePing = async () => {
    setError(false);
    try {
      const Apiresponse = await postPingtest(
        {
          destIp,
          count,
          length,
          sourceIp,
          type: "start"
        }
      );
      console.log(Apiresponse)
      if (Apiresponse.response) {
        if (length && count){
          setInfo(Apiresponse.responseData);
        }else{
        setInfo(prev => prev ? prev + '\n' + Apiresponse.responseData : Apiresponse.responseData);
      }} else {
        setAlertMsg(Apiresponse.message);
        // setInfo(prev => prev ? prev + '\n' + Apiresponse.data.message : Apiresponse.data.message);
        stopPingInterval();
      }
    } catch (err) {
      alert("Internal Server Error");
      setError(true);
      stopPingInterval();
    } finally {
      //setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-4xl">
        {blueBar(PING_TITLE)}
        <div className="border border-gray-400 rounded-b-lg bg-white p-8 flex flex-col items-center">
          {/* Form Row */}
          <form className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-center mb-8">
            <label className="text-[17px] text-gray-700 text-left">{PING_LABELS.sourceIp}</label>
            <select
              className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px] max-w-[220px] h-12"
              value={sourceIp}
              onChange={e => setSourceIp(e.target.value)}
            >
              {PING_SOURCE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <label className="text-[17px] text-gray-700 text-left">{PING_LABELS.destIp}</label>
            <div className="flex flex-col w-full">
              <input
                type="text"
                className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px] max-w-[220px] h-12"
                value={destIp}
                onChange={e => {
                  setDestIp(e.target.value);
                  setInfo('');
                  setDestIpError('');
                }}
              />
              <div className="min-h-[20px]">
                {destIpError && (
                  <span className="text-red-600 text-sm">{destIpError}</span>
                )}
              </div>
            </div>

            <label className="text-[17px] text-gray-700 text-left">{PING_LABELS.count}</label>
            <div className="flex flex-col w-full">
              <input
                type="number"
                className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px] max-w-[220px] h-12"
                value={count}
                onChange={e => {
                  setCount(e.target.value);
                  setInfo('');
                  setCountError('');
                }}
              />
              <div className="min-h-[20px]">
                {countError && (
                  <span className="text-red-600 text-sm">{countError}</span>
                )}
              </div>
            </div>

            <label className="text-[17px] text-gray-700 text-left">{PING_LABELS.length}</label>
            <div className="flex flex-col w-full">
              <input
                type="number"
                className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px] max-w-[220px] h-12"
                value={length}
                onChange={e => {
                  setLength(e.target.value);
                  setInfo('');
                  setLengthError('');
                }}
              />
              <div className="min-h-[20px]">
                {lengthError && (
                  <span className="text-red-600 text-sm">{lengthError}</span>
                )}
              </div>
            </div>
          </form>
          {/* Buttons Row */}
          <div className="w-full flex flex-row justify-center gap-12 mb-8">
            <Button variant="contained" sx={buttonSx} onClick={startpingTest} disabled={loadind}> {loadind ? PING_BUTTONS.loading:PING_BUTTONS.start}</Button>
            <Button variant="contained" sx={buttonSx} onClick={stopPingInterval}>{PING_BUTTONS.end}</Button>
          </div>
          {/* Info Section */}
          <div className="w-full flex flex-col md:flex-row md:items-start gap-4">
            <label className="text-[17px] text-gray-700 min-w-[80px] md:pt-2">{PING_LABELS.info}</label>
            <textarea
              className="w-full min-h-[180px] max-h-[320px] border border-gray-400 rounded bg-white text-[16px] p-2 font-mono resize-y"
              value={info}
              onChange={e => setInfo(e.target.value)}
              placeholder=""
              readOnly
            />
          </div>
        </div>
      </div>
      {/* Bottom Alert Message (add fade-in animation to your CSS) */}
      {alertMsg && (
        <div className="fixed left-1/2 bottom-32 transform -translate-x-1/2 z-50">
          <div className="flex items-center px-6 py-3 rounded shadow-lg text-white text-lg bg-green-500 animate-fade-in-up">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {alertMsg}
          </div>
        </div>
      )}
      {/*
      Add this to your global CSS (e.g., index.css):
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.4s cubic-bezier(0.4,0,0.2,1);
      }
      */}
    </div>
  );
};

export default PINGTest; 