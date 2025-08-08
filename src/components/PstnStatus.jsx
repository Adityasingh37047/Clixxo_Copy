import React, { useState } from 'react';
import {
  PSTN_SYNC_HEADERS,
  PSTN_SYNC_COLORS,
  PSTN_VOICE_PATH_HEADERS,
  PSTN_VOICE_PATH_STATS,
  PSTN_TIMESLOT_HEADERS,
  PSTN_TIMESLOT_DATA,
  PSTN_GATEWAY_LABEL,
  PSTN_GATEWAY_IP
} from '../constants/PstnConstants';

// Emoji placeholders for icons
const ICONS = [
  '📞', // Idle (use green phone)
  '📬', // Ringing (use gold bell)
  '🔵', // Wait Answer (use blue circle)
  '🔵', // Dialing (use blue circle)
  '📞', // Talking (use teal phone)
  '🔴', // Pending (use red phone)
  '🔵', // Wait Message (use blue circle)
  '🟣', // Local Block (use purple circle)
  '🟧', // Remote Block (use orange circle)
  '⚪', // Both Block (use gray circle)
  '🅁', // Circuit Reset (use gray R)
  '⚪', // Unusable (use gray circle)
];

const colorBlock = (color) => (
  <div className="w-3 h-3 mx-auto border border-gray-500" style={{ background: color, borderRadius: 0 }} />
);

const TOTAL_PAGES = 5;
const getStatisticsForPage = (page) => {
  return Array(12).fill(0).map((_, i) => (i + page) % 7 === 0 ? 30 : (page - 1) * 2 + i);
};

const PstnStatus = () => {
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setPageInput(String(page - 1));
    }
  };
  const handleNext = () => {
    if (page < TOTAL_PAGES) {
      setPage(page + 1);
      setPageInput(String(page + 1));
    }
  };
  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setPageInput(val);
  };
  const handleInputBlur = () => {
    let num = parseInt(pageInput, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > TOTAL_PAGES) num = TOTAL_PAGES;
    setPage(num);
    setPageInput(String(num));
  };
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const statistics = getStatisticsForPage(page);

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 sm:p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-full">
        {/* Sync & Signaling Status Table */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center font-semibold text-base shadow mb-0 pl-4" />
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white border-collapse mb-20 shadow-sm text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="border border-gray-400 bg-[#f8fafd] font-semibold py-2 px-3">{PSTN_SYNC_HEADERS[0]}</th>
                {PSTN_SYNC_HEADERS.slice(1).map((h, i) => (
                  <th key={i} className="border border-gray-400 bg-[#f8fafd] text-gray-800 font-semibold py-2 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 bg-[#f8fafd] font-semibold py-2 px-3 text-center">Color</td>
                {PSTN_SYNC_COLORS.map((c, i) => (
                  <td key={i} className="border border-gray-400 text-center py-2 px-3">{colorBlock(c.color)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Voice Path Status Table */}
        <div className="w-full h-9 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] rounded-t-lg flex items-center font-semibold text-base shadow mb-0 pl-4" />
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white border-collapse shadow-sm text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="border border-gray-400 bg-[#f8fafd] font-semibold py-2 px-3">{PSTN_VOICE_PATH_HEADERS[0]}</th>
                {PSTN_VOICE_PATH_HEADERS.slice(1).map((h, i) => (
                  <th key={i} className="border border-gray-400 bg-[#f8fafd] text-gray-800 font-semibold py-2 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 bg-[#f8fafd] font-semibold py-2 px-3 text-center">Icon</td>
                {ICONS.map((icon, i) => (
                  <td key={i} className="border border-gray-400 text-center py-2 px-3"><span className="text-lg">{icon}</span></td>
                ))}
              </tr>
              <tr>
                <td className="border border-gray-400 bg-[#f8fafd] font-semibold py-2 px-3 text-center">Statistics</td>
                {PSTN_VOICE_PATH_STATS[0].values.map((v, i) => (
                  <td key={i} className="border border-gray-400 text-center py-2 px-3">{v}</td>
                ))}
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={ICONS.length + 1} style={{ padding: 0, border: 'none', background: '#fff' }}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: 14, color: '#444', padding: '2px 8px 2px 0', marginBottom: '36px' }}>
                    <span style={{ marginRight: 4 }}>1/1 Previous Next Go to Page</span>
                    <select style={{ fontSize: 13, padding: '1px 4px', borderRadius: 2, border: '1px solid #bbb', background: '#fff', marginRight: 4 }} value={1} readOnly>
                      <option value={1}>1</option>
                    </select>
                    <span>Page</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Time Slot Table */}
        <div className="w-full h-10 bg-gradient-to-b from-[#b3e0ff] via-[#6ec1f7] to-[#3b8fd6] flex items-center justify-center text-gray-900 font-semibold text-base sm:text-lg shadow mb-0 rounded-t-lg">
          <span>
            {PSTN_GATEWAY_LABEL} &nbsp;·&nbsp; {PSTN_GATEWAY_IP}
          </span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white border-collapse shadow-sm text-xs">
            <thead>
              <tr>
                <th className="border border-gray-400 bg-[#f8fafd] font-semibold py-1 px-1 whitespace-nowrap text-xs w-20">Time Slot No.</th>
                {PSTN_TIMESLOT_HEADERS.slice(1).map((h, i) => (
                  <th key={i} className="border border-gray-400 bg-[#f8fafd] text-gray-800 font-semibold py-1 px-1 whitespace-nowrap text-xs w-8">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PSTN_TIMESLOT_DATA.map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-400 bg-[#f8fafd] font-semibold py-1 px-1 whitespace-nowrap text-xs w-20 text-center">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="border border-gray-400 text-center py-1 px-1 w-8">{v === 'red' ? colorBlock('#e53935') : colorBlock('#e0e0e0')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-red-600 text-center mt-3 text-sm">
          Note: If the icons display abnormally, please clear the cache and refresh this page.
        </div>
      </div>
    </div>
  );
};

export default PstnStatus;