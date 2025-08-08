import React, { useEffect, useState, useRef } from 'react';
import { postTracerttest } from '../api/apiService';
import {
  TRACERT_TITLE,
  TRACERT_LABELS,
  TRACERT_SOURCE_OPTIONS,
  TRACERT_BUTTONS,
} from '../constants/TRACERTTestConstants';
import Button from '@mui/material/Button';

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
  return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}
function isValidJumps(val) {
  const num = Number(val);
  return Number.isInteger(num) && num >= 1 && num <= 255;
}

const TRACERTTest = () => {
  const [sourceIp, setSourceIp] = useState(TRACERT_SOURCE_OPTIONS[0].value);
  const [destIp, setDestIp] = useState('');
  const [maxJumps, setMaxJumps] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState(false);
  const [loadind, setLoading]= useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const intervalRef = useRef(null);
  const [sourceIpError, setSourceIpError] = useState('');
  const [destIpError, setDestIpError] = useState('');
  const [jumpsError, setJumpsError] = useState('');

  useEffect(()=>{
    if (alertMsg){
      const timer = setTimeout(()=>setAlertMsg(''),2000);
      return ()=> clearTimeout(timer);
    }
  },[alertMsg]);

  const startTracert = async () => {
    setSourceIpError('');
    setDestIpError('');
    setJumpsError('');
    let valid = true;
    if (!isValidIp(sourceIp)) {
      setSourceIpError('Please enter a valid IP address.');
      valid = false;
    }
    if (!isValidIp(destIp)) {
      setDestIpError('Please enter a valid IP address.');
      valid = false;
    }
    if (maxJumps && !isValidJumps(maxJumps)) {
      setJumpsError('Maximum Jumps must be between 1 and 255.');
      valid = false;
    }
    if (!valid) return;
    setLoading(true);
    if (!maxJumps) {
      // Interval mode: run every 2 seconds
      if (!intervalRef.current) {
        await handleTracert(); // Call once immediately
        intervalRef.current = setInterval(() => {
          handleTracert();
        }, 2000);
      }
    } else {
      // Single run mode
      await handleTracert();
      setLoading(false);
    }
  };

  const stopTracertInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLoading(false);
    setAlertMsg('Tracert stopped!');
  };

  const handleTracert = async()=> {
    setError(false);
    try{
        const Apiresponse = await postTracerttest({
        destIp,
        maxJumps,
        sourceIp,
      });
      console.log(Apiresponse.data);
      if (Apiresponse.data.response){
        if(maxJumps){
          // Single run mode: replace info
          setInfo(Apiresponse.data.responseData);
        }else{
          // Interval mode: append result
          const result = Apiresponse.data.responseData[0]?.result || '';
          setInfo(prev => prev ? prev + '\n' + result : result);
          console.log(result);
        }
      } else {
        setInfo(prev => prev ? prev + '\n' + Apiresponse.data.message : Apiresponse.data.message);
        setAlertMsg(Apiresponse.data.message);
        stopTracertInterval();
      }
    } catch (err){
      alert("Internal server error");
      setError(true);
      stopTracertInterval();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-4xl">
        {blueBar(TRACERT_TITLE)}
        <div className="border border-gray-400 rounded-b-lg bg-white p-8 flex flex-col items-center">
          {/* Form Row */}
          <form className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-center mb-8">
            <label className="text-[17px] text-gray-700 text-left">{TRACERT_LABELS.sourceIp}</label>
            <div className="flex flex-col w-full">
              <input
                type="text"
                className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px] max-w-[220px] h-12"
                value={sourceIp}
                onChange={e => {
                  setSourceIp(e.target.value);
                  setInfo('');
                  setSourceIpError('');
                }}
              />
              <div className="min-h-[20px]">
                {sourceIpError && (
                  <span className="text-red-600 text-sm">{sourceIpError}</span>
                )}
              </div>
            </div>

            <label className="text-[17px] text-gray-700 text-left">{TRACERT_LABELS.destIp}</label>
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

            <label className="text-[17px] text-gray-700 text-left">{TRACERT_LABELS.maxJumps}</label>
            <div className="flex flex-col w-full">
              <input
                type="number"
                className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px] max-w-[220px] h-12"
                value={maxJumps}
                onChange={e => {
                  setMaxJumps(e.target.value);
                  setInfo('');
                  setJumpsError('');
                }}
              />
              <div className="min-h-[20px]">
                {jumpsError && (
                  <span className="text-red-600 text-sm">{jumpsError}</span>
                )}
              </div>
            </div>
          </form>
          {/* Buttons Row */}
          <div className="w-full flex flex-row justify-center gap-12 mb-8">
            <Button variant="contained" sx={buttonSx} onClick={startTracert} disabled={loadind}>
              {loadind ? (TRACERT_BUTTONS.loading || 'Loading...') : (TRACERT_BUTTONS.start || 'Start')}
            </Button>
            <Button variant="contained" sx={buttonSx} onClick={stopTracertInterval}>{TRACERT_BUTTONS.end}</Button>
          </div>
          {/* Info Section */}
          <div className="w-full flex flex-col md:flex-row md:items-start gap-4">
            <label className="text-[17px] text-gray-700 min-w-[80px] md:pt-2">{TRACERT_LABELS.info}</label>
            <textarea
              className="w-full min-h-[180px] max-h-[320px] border border-gray-400 rounded bg-white text-[16px] p-2 font-mono resize-y"
              value={info}
              onChange={e => setInfo(e.target.value)}
              placeholder=""
            />
          </div>
        </div>
      </div>
      {/* Bottom Alert Message (add fade-in animation to your CSS) */}
      {alertMsg && (
        <div className="fixed bottom-35 left-1/2 transform -translate-x-1/2 z-50">
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

export default TRACERTTest; 