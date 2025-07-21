import React, { useState } from 'react';
import { ISDN_FORM_FIELDS, ISDN_FORM_INITIAL_VALUES } from '../constants/IsdnIsdnConstants';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const sectionTitles = {
  global: 'ISDN Global Settings',
  user: 'ISDN User Side',
  network: 'ISDN Network Side',
};

const IsdnIsdnPage = () => {
  const [form, setForm] = useState(ISDN_FORM_INITIAL_VALUES);

  const handleChange = (name, value, type) => {
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? !prev[name] : value
    }));
  };

  const handleReset = () => {
    setForm(ISDN_FORM_INITIAL_VALUES);
  };
  const handleSave = () => {
    alert('Settings saved!');
  };

  // Group fields by section
  const topFields = ISDN_FORM_FIELDS.filter(f => f.section === 'top' && f.name !== 'linkNo' && f.name !== 'logicalPcmNo');
  const globalFields = ISDN_FORM_FIELDS.filter(f => f.section === 'global');
  const userFields = ISDN_FORM_FIELDS.filter(f => f.section === 'user');
  const networkFields = ISDN_FORM_FIELDS.filter(f => f.section === 'network');

  return (
    <div className="bg-white min-h-[calc(100vh-128px)] flex flex-col items-center box-border py-6 px-2 sm:px-6">
      <div className="w-full max-w-7xl mx-auto border-2 border-gray-300 rounded-lg bg-white shadow-lg p-0 relative overflow-x-auto">
        <div className="bg-gradient-to-b from-[#b3e0ff] to-[#3d92d0] text-[#222] font-semibold text-lg text-center rounded-t-lg border-b-2 border-gray-300 py-2">
          ISDN Settings
        </div>
        {/* Top two rows as in screenshot */}
        <div className="px-2 sm:px-8 pt-8 w-full">
          {/* Row 1 */}
          <div className="flex flex-wrap gap-4 justify-between mb-2 w-full">
            {/* Link No. */}
            <div className="min-w-[120px] flex flex-col items-center">
              <div className="text-gray-600 font-medium">Link No.</div>
              <div className="text-gray-600 text-sm">User Side: 0</div>
            </div>
            {/* Logical PCM No. */}
            <div className="min-w-[120px] flex flex-col items-center">
              <div className="text-gray-600 font-medium">Logical PCM No.</div>
              <div className="text-gray-600 text-sm">0</div>
            </div>
            {/* TEI */}
            <div className="min-w-[120px] flex flex-col items-center">
              <label className="font-medium">TEI</label>
              <TextField
                size="small"
                value={form.tei}
                onChange={e => handleChange('tei', e.target.value, 'text')}
                className="min-w-[60px]"
                sx={{ mt: 0.5 }}
              />
            </div>
            {/* Ch Identification */}
            <div className="min-w-[160px] flex flex-col items-center">
              <label className="font-medium">Ch Identification</label>
              <Select
                size="small"
                value={form.chIdentification}
                onChange={e => handleChange('chIdentification', e.target.value, 'select')}
                className="min-w-[100px]"
              >
                <MenuItem value="Number">Number</MenuItem>
              </Select>
            </div>
            {/* Default Callee Type */}
            <div className="min-w-[180px] flex flex-col items-center">
              <label className="font-medium">Default Callee Type</label>
              <Select
                size="small"
                value={form.defaultCalleeType}
                onChange={e => handleChange('defaultCalleeType', e.target.value, 'select')}
                className="min-w-[140px]"
              >
                <MenuItem value="National number (0XA1)">National number (0XA1)</MenuItem>
              </Select>
            </div>
            {/* Default Caller Type */}
            <div className="min-w-[180px] flex flex-col items-center">
              <label className="font-medium">Default Caller Type</label>
              <Select
                size="small"
                value={form.defaultCallerType}
                onChange={e => handleChange('defaultCallerType', e.target.value, 'select')}
                className="min-w-[140px]"
              >
                <MenuItem value="National number (0X21)">National number (0X21)</MenuItem>
              </Select>
            </div>
            {/* CODEC */}
            <div className="min-w-[120px] flex flex-col items-center">
              <label className="font-medium">CODEC</label>
              <Select
                size="small"
                value={form.codec}
                onChange={e => handleChange('codec', e.target.value, 'select')}
                className="min-w-[80px]"
              >
                <MenuItem value="A-Law">A-Law</MenuItem>
              </Select>
            </div>
            {/* Auto Link Building */}
            <div className="min-w-[140px] flex flex-col items-center">
              <label className="font-medium">Auto Link Building</label>
              <Select
                size="small"
                value={form.autoLinkBuilding}
                onChange={e => handleChange('autoLinkBuilding', e.target.value, 'select')}
                className="min-w-[80px]"
              >
                <MenuItem value="Enable">Enable</MenuItem>
                <MenuItem value="Disable">Disable</MenuItem>
              </Select>
            </div>
            {/* CRC Check */}
            <div className="min-w-[100px] flex flex-col items-center">
              <label className="font-medium">CRC Check</label>
              <Checkbox
                checked={form.crcCheck}
                onChange={() => handleChange('crcCheck', !form.crcCheck, 'checkbox')}
                sx={{ p: 0.5 }}
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex flex-wrap gap-4 justify-between mb-4 mt-2 w-full">
            {/* Link No. */}
            <div className="min-w-[120px] flex flex-col items-center">
              <div className="text-gray-600 font-medium">Link No.</div>
              <div className="text-gray-600 text-sm">User Side: 0</div>
            </div>
            {/* Logical PCM No. */}
            <div className="min-w-[120px] flex flex-col items-center">
              <div className="text-gray-600 font-medium">Logical PCM No.</div>
              <div className="text-gray-600 text-sm">0</div>
            </div>
            {/* Set Caller/Callee Type in case of Redirecting Num */}
            <div className="min-w-[260px] flex flex-col items-center">
              <label className="font-medium">Set Caller/Callee Type in case of Redirecting Num</label>
              <Checkbox
                checked={form.setCallerCalleeTypeRedirectingNum || false}
                onChange={() => handleChange('setCallerCalleeTypeRedirectingNum', !form.setCallerCalleeTypeRedirectingNum, 'checkbox')}
                sx={{ p: 0.5 }}
              />
            </div>
            {/* Callee Type (with Redirecting Num) */}
            <div className="min-w-[200px] flex flex-col items-center">
              <label className="font-medium">Callee Type (with Redirecting Num)</label>
              <Select
                size="small"
                value={form.calleeTypeWithRedirectingNum || 'National number'}
                onChange={e => handleChange('calleeTypeWithRedirectingNum', e.target.value, 'select')}
                className="min-w-[140px]"
                disabled={!form.setCallerCalleeTypeRedirectingNum}
              >
                <MenuItem value="National number">National number</MenuItem>
                <MenuItem value="International number">International number</MenuItem>
              </Select>
            </div>
            {/* Caller Type (with Redirecting Num) */}
            <div className="min-w-[200px] flex flex-col items-center">
              <label className="font-medium">Caller Type (with Redirecting Num)</label>
              <Select
                size="small"
                value={form.callerTypeWithRedirectingNum || 'National number'}
                onChange={e => handleChange('callerTypeWithRedirectingNum', e.target.value, 'select')}
                className="min-w-[140px]"
                disabled={!form.setCallerCalleeTypeRedirectingNum}
              >
                <MenuItem value="National number">National number</MenuItem>
                <MenuItem value="International number">International number</MenuItem>
              </Select>
            </div>
            {/* Synchronize Modification */}
            <div className="min-w-[180px] flex flex-col items-center">
              <label className="font-medium">Synchronize Modification</label>
              <Checkbox
                checked={form.synchronizeModification}
                onChange={() => handleChange('synchronizeModification', !form.synchronizeModification, 'checkbox')}
                sx={{ p: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* ISDN Global Settings */}
        <div className="mt-8 mb-2 font-semibold text-base px-2 sm:px-4">{sectionTitles.global}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 w-full max-w-full px-2 sm:px-4">
          {/* Left column: labels and checkboxes */}
          <div className="flex flex-col flex-1 w-full">
            {globalFields.map(field => (
              <div key={field.name} className="flex items-center min-h-[38px] mb-1 w-full">
                {field.type === 'checkbox' ? (
                  <>
                    <Checkbox
                      checked={form[field.name]}
                      onChange={() => handleChange(field.name, !form[field.name], field.type)}
                      sx={{ p: 0.5 }}
                    />
                    <span className="font-normal break-words whitespace-normal w-full">{field.label}</span>
                  </>
                ) : (
                  <span className="font-normal break-words whitespace-normal w-full">{field.label}</span>
                )}
              </div>
            ))}
          </div>
          {/* Right column: input/select fields, empty for checkboxes */}
          <div className="flex flex-col flex-1 ml-0 sm:ml-4 w-full">
            {globalFields.map(field => (
              <div key={field.name} className="min-h-[38px] mb-1 flex items-center w-full">
                {field.type === 'select' ? (
                  <Select
                    size="small"
                    value={form[field.name]}
                    onChange={e => handleChange(field.name, e.target.value, field.type)}
                    className="w-full max-w-xs"
                  >
                    {field.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                ) : field.type === 'text' ? (
                  <TextField
                    size="small"
                    value={form[field.name]}
                    onChange={e => handleChange(field.name, e.target.value, field.type)}
                    className="w-full max-w-xs"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* ISDN User Side */}
        <div className="mt-8 mb-2 font-semibold text-base px-2 sm:px-4">{sectionTitles.user}</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 mb-8 items-start w-full max-w-full px-2 sm:px-4">
          {/* Column 1: Two checkboxes stacked vertically */}
          <div className="flex flex-col min-w-0 gap-2 w-full">
            <div className="flex items-center">
              <Checkbox
                checked={form.userSendCalledPartyNumberComplete}
                onChange={() => handleChange('userSendCalledPartyNumberComplete', !form.userSendCalledPartyNumberComplete, 'checkbox')}
                sx={{ p: 0.5 }}
              />
              <span className="font-normal break-words whitespace-normal w-full">Send the 'Called Party Number Complete' Parameter</span>
            </div>
            <div className="flex items-center">
              <Checkbox
                checked={form.userSendChannelIdentification}
                onChange={() => handleChange('userSendChannelIdentification', !form.userSendChannelIdentification, 'checkbox')}
                sx={{ p: 0.5 }}
              />
              <span className="font-normal break-words whitespace-normal w-full">Send Channel Identification Message</span>
            </div>
          </div>
          {/* Column 2: Wait Confirm Time (T310) (s) and Set Cause Value Length to 2 bytes */}
          <div className="flex flex-col min-w-0 gap-2 w-full">
            <div className="flex items-center">
              <span className="font-normal mr-2 break-words whitespace-normal w-full">Wait Confirm Time (T310) (s)</span>
              <TextField
                size="small"
                value={form.userWaitConfirmTime}
                onChange={e => handleChange('userWaitConfirmTime', e.target.value, 'text')}
                className="w-[70px] max-w-xs ml-1"
              />
            </div>
            <div className="flex items-center mt-0">
              <Checkbox
                checked={form.userSetCauseValueLength}
                onChange={() => handleChange('userSetCauseValueLength', !form.userSetCauseValueLength, 'checkbox')}
                sx={{ p: 0.5 }}
              />
              <span className="font-normal break-words whitespace-normal w-full">Set Cause Value Length to 2 bytes</span>
            </div>
          </div>
          {/* Column 3: Allow the Preferential Channel Selection, vertically centered */}
          <div className="flex items-center min-w-0 h-[76px] w-full">
            <Checkbox
              checked={form.userAllowPreferentialChannel}
              onChange={() => handleChange('userAllowPreferentialChannel', !form.userAllowPreferentialChannel, 'checkbox')}
              sx={{ p: 0.5 }}
            />
            <span className="font-normal break-words whitespace-normal w-full">Allow the Preferential Channel Selection</span>
          </div>
        </div>

        {/* ISDN Network Side */}
        <div className="mt-8 mb-2 font-semibold text-base px-2 sm:px-4">{sectionTitles.network}</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 mb-4 items-center w-full max-w-full px-2 sm:px-4">
          {/* Row 1 */}
          <div className="flex items-center min-w-0 w-full">
            <Checkbox
              checked={form.networkSendCalledPartyNumberComplete}
              onChange={() => handleChange('networkSendCalledPartyNumberComplete', !form.networkSendCalledPartyNumberComplete, 'checkbox')}
              sx={{ p: 0.5 }}
            />
            <span className="break-words whitespace-normal w-full">Send the 'Called Party Number Complete' Parameter</span>
          </div>
          <div className="flex items-center min-w-0 w-full">
            <span className="mr-2 break-words whitespace-normal w-full">Wait Confirm Time (T310) (s)</span>
            <TextField
              size="small"
              value={form.networkWaitConfirmTime}
              onChange={e => handleChange('networkWaitConfirmTime', e.target.value, 'text')}
              className="w-[70px] max-w-xs ml-1"
            />
          </div>
          <div className="flex flex-col items-start min-h-[76px] min-w-0 w-full">
            <div className="flex items-center">
              <Checkbox
                checked={form.networkAllowPreferentialChannel}
                onChange={() => handleChange('networkAllowPreferentialChannel', !form.networkAllowPreferentialChannel, 'checkbox')}
                sx={{ p: 0.5 }}
              />
              <span className="break-words whitespace-normal w-full">Allow the Preferential Channel Selection</span>
            </div>
            <div className="flex items-center mt-3">
              <Checkbox
                checked={form.networkEnable || false}
                onChange={() => handleChange('networkEnable', !form.networkEnable, 'checkbox')}
                sx={{ p: 0.5 }}
              />
              <span className="break-words whitespace-normal w-full">Enable</span>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex items-center min-w-0 w-full">
            <Checkbox
              checked={form.networkSendChannelIdentification}
              onChange={() => handleChange('networkSendChannelIdentification', !form.networkSendChannelIdentification, 'checkbox')}
              sx={{ p: 0.5 }}
            />
            <span className="break-words whitespace-normal w-full">Send Channel Identification Message</span>
          </div>
          <div className="flex items-center min-w-0 w-full">
            <Checkbox
              checked={form.networkSetCauseValueLength}
              onChange={() => handleChange('networkSetCauseValueLength', !form.networkSetCauseValueLength, 'checkbox')}
              sx={{ p: 0.5 }}
            />
            <span className="break-words whitespace-normal w-full">Set Cause Value Length to 2 bytes</span>
          </div>
          <div /> {/* Empty cell */}
        </div>

        {/* Send ISDN Redirecting Number text */}
        <div className="px-2 sm:px-4 mb-4 font-medium text-gray-700 text-sm">Send ISDN Redirecting Number</div>
      </div>
      {/* Save and Reset buttons outside the border */}
      <div className="flex justify-center gap-6 mt-8 mb-3">
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '15px',
            borderRadius: 1.5,
            minWidth: 120,
            boxShadow: '0 2px 8px #b3e0ff',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
              color: '#fff',
            },
          }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '15px',
            borderRadius: 1.5,
            minWidth: 120,
            boxShadow: '0 2px 8px #b3e0ff',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(to bottom, #0e8fd6 0%, #3bb6f5 100%)',
              color: '#fff',
            },
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <div className="text-red-600 text-center text-sm mb-2 mt-[-10px]">
        Note 1: You shall restart the service to validate the settings on this page!
      </div>
    </div>
  );
};

export default IsdnIsdnPage;
