import React, { useState } from 'react';
import {fetchTracerttest} from '../api/apiService';
import axios from 'axios';
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

const TRACERTTest = () => {
  const [sourceIp, setSourceIp] = useState(TRACERT_SOURCE_OPTIONS[0].value);
  const [destIp, setDestIp] = useState('');
  const [maxJumps, setMaxJumps] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState(false);

  const handleTracert = async()=> {
    setError (false);
    setInfo('');
    try{
      const Apiresponse = await axios.post("http://192.168.1.90:5000/api/tracert-test",
      {
        destIp,
        maxJumps,
        sourceIp,
      });
    console.log(Apiresponse)
    if (Apiresponse.data.response){
      setInfo(Apiresponse.data.responseData);
    }else {
      setInfo(Apiresponse.data.message);
     }
    } catch (err){
      alert("Internal server error")
      setError(true);

    }
    };




  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-4xl">
        {blueBar(TRACERT_TITLE)}
        <div className="border border-gray-400 rounded-b-lg bg-white p-8 flex flex-col items-center">
          {/* Form Row */}
          <form className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-center mb-8">
            <label className="text-[17px] text-gray-700 text-left">{TRACERT_LABELS.sourceIp}</label>
            <select
              className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px]"
              value={sourceIp}
              onChange={e => setSourceIp(e.target.value)}
            >
              {TRACERT_SOURCE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <label className="text-[17px] text-gray-700 text-left">{TRACERT_LABELS.destIp}</label>
            <input
              type="text"
              className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px]"
              value={destIp}
              onChange={e => setDestIp(e.target.value)}
            />

            <label className="text-[17px] text-gray-700 text-left">{TRACERT_LABELS.maxJumps}</label>
            <input
              type="number"
              className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px]"
              value={maxJumps}
              onChange={e => setMaxJumps(e.target.value)}
            />
          </form>
          {/* Buttons Row */}
          <div className="w-full flex flex-row justify-center gap-12 mb-8">
            <Button variant="contained" sx={buttonSx} onClick={handleTracert}>{TRACERT_BUTTONS.start}</Button>
            <Button variant="contained" sx={buttonSx}>{TRACERT_BUTTONS.end}</Button>
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
    </div>
  );
};

export default TRACERTTest; 