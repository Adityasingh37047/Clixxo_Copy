import React, { useState } from 'react';
import {
  SC_SECTIONS,
  SC_LABELS,
  SC_NETWORK_OPTIONS,
  SC_PCM_OPTIONS,
  SC_TS_OPTIONS,
  SC_BUTTONS,
  SC_NOTE,
} from '../constants/SignalingCaptureConstants';
import Button from '@mui/material/Button';

const blueBar = (title) => (
  <div className="w-full bg-gradient-to-b from-[#b3e0ff] via-[#7ecbfa] to-[#3b8fd6] h-12 rounded-t-lg flex items-center justify-center text-[22px] font-semibold text-gray-800 shadow mb-0 border-b border-[#b3e0ff]">
    {title}
  </div>
);

const legacyBtn =
  'bg-gradient-to-b from-[#5dc6f8] to-[#299fd6] text-white text-lg font-semibold rounded shadow border border-[#3bb6f5] px-8 py-1.5 min-w-[110px] transition hover:from-[#299fd6] hover:to-[#5dc6f8] active:scale-95';

const SignalingCapture = () => {
  // Data Capture state
  const [network, setNetwork] = useState(SC_NETWORK_OPTIONS[0].value);
  const [syslogEnabled, setSyslogEnabled] = useState(true);
  const [syslogDest, setSyslogDest] = useState('192.168.1.254');

  // TS Recording state
  const [ts1Pcm, setTs1Pcm] = useState(SC_PCM_OPTIONS[0].value);
  const [ts1Slot, setTs1Slot] = useState(SC_TS_OPTIONS[0].value);
  const [ts2Pcm, setTs2Pcm] = useState(SC_PCM_OPTIONS[0].value);
  const [ts2Slot, setTs2Slot] = useState(SC_TS_OPTIONS[1].value);

  // E1 Two-way Recording state
  const [e1aPcm, setE1aPcm] = useState(SC_PCM_OPTIONS[0].value);
  const [e1aSlot, setE1aSlot] = useState(SC_TS_OPTIONS[2].value);
  const [e1bPcm, setE1bPcm] = useState(SC_PCM_OPTIONS[0].value);
  const [e1bSlot, setE1bSlot] = useState(SC_TS_OPTIONS[3].value);

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

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-6 px-2">
      {/* Data Capture Section */}
      <div className="w-full max-w-4xl mb-8">
        {blueBar(SC_SECTIONS[0])}
        <div className="border border-gray-400 rounded-b-lg bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 flex flex-col gap-3 min-w-[220px]">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-[17px] text-gray-700 min-w-[270px]">{SC_LABELS.networkInterface}</label>
              <select
                className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-[220px]"
                value={network}
                onChange={e => setNetwork(e.target.value)}
              >
                {SC_NETWORK_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-[17px] text-gray-700 min-w-[270px]">{SC_LABELS.captureSyslog}</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={syslogEnabled}
                  onChange={e => setSyslogEnabled(e.target.checked)}
                  className="w-5 h-5 accent-blue-500"
                  id="syslog-enable"
                />
                <label htmlFor="syslog-enable" className="text-[17px] text-gray-700 select-none">{SC_LABELS.enable}</label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="text-[17px] text-gray-700 min-w-[270px]">{SC_LABELS.syslogDest}</label>
              <input
                type="text"
                value={syslogDest}
                onChange={e => setSyslogDest(e.target.value)}
                className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[220px]"
              />
            </div>
            <div className="mt-2">
              <span className="text-[15px] text-red-600 font-medium">{SC_NOTE}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center min-w-[120px]">
            <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.start}</Button>
            <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.stop}</Button>
          </div>
        </div>
      </div>

      {/* TS Recording Section */}
      <div className="w-full max-w-4xl mb-8">
        {blueBar(SC_SECTIONS[1])}
        <div className="border border-gray-400 rounded-b-lg bg-white p-6 flex flex-col gap-6">
          {[0, 1].map(i => (
            <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 min-w-[220px]">
                <label className="text-[17px] text-gray-700 min-w-[270px]">{SC_LABELS.pcmTs}</label>
                <select
                  className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[120px]"
                  value={i === 0 ? ts1Pcm : ts2Pcm}
                  onChange={e => (i === 0 ? setTs1Pcm(e.target.value) : setTs2Pcm(e.target.value))}
                >
                  {SC_PCM_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select
                  className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[180px]"
                  value={i === 0 ? ts1Slot : ts2Slot}
                  onChange={e => (i === 0 ? setTs1Slot(e.target.value) : setTs2Slot(e.target.value))}
                >
                  {SC_TS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-6 items-center min-w-[120px] justify-end">
                <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.start}</Button>
                <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.stop}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E1 Two-way Recording Section */}
      <div className="w-full max-w-4xl mb-8">
        {blueBar(SC_SECTIONS[2])}
        <div className="border border-gray-400 rounded-b-lg bg-white p-6 flex flex-col gap-6">
          {[0, 1].map(i => (
            <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 min-w-[220px]">
                <label className="text-[17px] text-gray-700 min-w-[270px]">{SC_LABELS.pcmTs}</label>
                <select
                  className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[120px]"
                  value={i === 0 ? e1aPcm : e1bPcm}
                  onChange={e => (i === 0 ? setE1aPcm(e.target.value) : setE1bPcm(e.target.value))}
                >
                  {SC_PCM_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select
                  className="border border-gray-400 rounded px-2 py-1 text-base text-gray-800 bg-white min-w-[180px]"
                  value={i === 0 ? e1aSlot : e1bSlot}
                  onChange={e => (i === 0 ? setE1aSlot(e.target.value) : setE1bSlot(e.target.value))}
                >
                  {SC_TS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-6 items-center min-w-[120px] justify-end">
                <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.start}</Button>
                <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.stop}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-8 mt-2 mb-8">
        <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.clean}</Button>
        <Button variant="contained" sx={buttonSx}>{SC_BUTTONS.download}</Button>
      </div>
    </div>
  );
};

export default SignalingCapture; 