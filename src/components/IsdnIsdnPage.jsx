import React, { useState } from 'react';
import { ISDN_FORM_FIELDS, ISDN_FORM_INITIAL_VALUES } from '../constants/IsdnIsdnConstants';

const sectionTitles = {
  global: 'ISDN Global Settings',
  user: 'ISDN User Side',
  network: 'ISDN Network Side',
};

const LOCAL_STORAGE_KEY = 'isdn_isdn_form';

const IsdnIsdnPage = () => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : ISDN_FORM_INITIAL_VALUES;
  });

  const handleChange = (name, value, type) => {
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? !prev[name] : value
    }));
  };

  const handleReset = () => {
    setForm(ISDN_FORM_INITIAL_VALUES);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
    alert('Settings saved!');
  };

  // Group fields by section
  const topFields = ISDN_FORM_FIELDS.filter(f => f.section === 'top' && f.name !== 'linkNo' && f.name !== 'logicalPcmNo');
  const globalFields = ISDN_FORM_FIELDS.filter(f => f.section === 'global');
  const userFields = ISDN_FORM_FIELDS.filter(f => f.section === 'user');
  const networkFields = ISDN_FORM_FIELDS.filter(f => f.section === 'network');

  // Helper for disabled select
  const disabledSelectStyle = {
    minWidth: 120,
    padding: 3,
    borderRadius: 4,
    border: '1px solid #888',
    fontSize: 13,
    background: '#eee',
    color: '#888',
    pointerEvents: 'none',
  };

  return (
    <div style={{
      background: '#fff',
      minHeight: 'calc(100vh - 128px)',
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 13,
      overflowX: 'auto',
    }}>
      <div style={{
        width: 1800,
        border: '2px solid #222',
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 2px 8px #0002',
        padding: 0,
        margin: '0 auto',
        position: 'relative',
      }}>
        <div style={{
          background: 'linear-gradient(to bottom, #7cc0f1, #3d92d0)',
          color: '#222',
          fontWeight: 600,
          fontSize: 17,
          textAlign: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottom: '2px solid #222',
          padding: '6px 0',
        }}>
          ISDN Settings
        </div>
        {/* Top two rows as in screenshot */}
        <div style={{ padding: '32px 32px 0 32px' }}>
          {/* Row 1 */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            {/* Link No. */}
            <div style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#666', fontWeight: 500 }}>Link No.</div>
              <div style={{ color: '#666', fontSize: 13 }}>User Side: 0</div>
            </div>
            {/* Logical PCM No. */}
            <div style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#666', fontWeight: 500 }}>Logical PCM No.</div>
              <div style={{ color: '#666', fontSize: 13 }}>0</div>
            </div>
            {/* TEI */}
            <div style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>TEI</label>
              <input
                type="text"
                value={form.tei}
                onChange={e => handleChange('tei', e.target.value, 'text')}
                style={{ minWidth: 60, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13 }}
              />
            </div>
            {/* Ch Identification */}
            <div style={{ minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Ch Identification</label>
              <select
                value={form.chIdentification}
                onChange={e => handleChange('chIdentification', e.target.value, 'select')}
                style={{ minWidth: 100, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13 }}
              >
                <option value="Number">Number</option>
              </select>
            </div>
            {/* Default Callee Type */}
            <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Default Callee Type</label>
              <select
                value={form.defaultCalleeType}
                onChange={e => handleChange('defaultCalleeType', e.target.value, 'select')}
                style={{ minWidth: 140, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13 }}
              >
                <option value="National number (0XA1)">National number (0XA1)</option>
              </select>
            </div>
            {/* Default Caller Type */}
            <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Default Caller Type</label>
              <select
                value={form.defaultCallerType}
                onChange={e => handleChange('defaultCallerType', e.target.value, 'select')}
                style={{ minWidth: 140, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13 }}
              >
                <option value="National number (0X21)">National number (0X21)</option>
              </select>
            </div>
            {/* CODEC */}
            <div style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>CODEC</label>
              <select
                value={form.codec}
                onChange={e => handleChange('codec', e.target.value, 'select')}
                style={{ minWidth: 80, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13 }}
              >
                <option value="A-Law">A-Law</option>
              </select>
            </div>
            {/* Auto Link Building */}
            <div style={{ minWidth: 140, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Auto Link Building</label>
              <select
                value={form.autoLinkBuilding}
                onChange={e => handleChange('autoLinkBuilding', e.target.value, 'select')}
                style={{ minWidth: 80, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13 }}
              >
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
            </div>
            {/* CRC Check */}
            <div style={{ minWidth: 100, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>CRC Check</label>
              <input
                type="checkbox"
                checked={form.crcCheck}
                onChange={() => handleChange('crcCheck', !form.crcCheck, 'checkbox')}
                style={{ width: 15, height: 15 }}
              />
            </div>
          </div>
          {/* Row 2 */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18, marginTop: 8 }}>
            {/* Link No. */}
            <div style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#666', fontWeight: 500 }}>Link No.</div>
              <div style={{ color: '#666', fontSize: 13 }}>User Side: 0</div>
            </div>
            {/* Logical PCM No. */}
            <div style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#666', fontWeight: 500 }}>Logical PCM No.</div>
              <div style={{ color: '#666', fontSize: 13 }}>0</div>
            </div>
            {/* Set Caller/Callee Type in case of Redirecting Num */}
            <div style={{ minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Set Caller/Callee Type in case of Redirecting Num</label>
              <input
                type="checkbox"
                checked={form.setCallerCalleeTypeRedirectingNum || false}
                onChange={() => handleChange('setCallerCalleeTypeRedirectingNum', !form.setCallerCalleeTypeRedirectingNum, 'checkbox')}
                style={{ width: 15, height: 15 }}
              />
            </div>
            {/* Callee Type (with Redirecting Num) */}
            <div style={{ minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Callee Type (with Redirecting Num)</label>
              <select
                value={form.calleeTypeWithRedirectingNum || 'National number'}
                onChange={e => handleChange('calleeTypeWithRedirectingNum', e.target.value, 'select')}
                disabled={!form.setCallerCalleeTypeRedirectingNum}
                style={{ minWidth: 140, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13, background: !form.setCallerCalleeTypeRedirectingNum ? '#eee' : '#fff', color: !form.setCallerCalleeTypeRedirectingNum ? '#888' : '#222' }}
              >
                <option value="National number">National number</option>
                <option value="International number">International number</option>
              </select>
            </div>
            {/* Caller Type (with Redirecting Num) */}
            <div style={{ minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Caller Type (with Redirecting Num)</label>
              <select
                value={form.callerTypeWithRedirectingNum || 'National number'}
                onChange={e => handleChange('callerTypeWithRedirectingNum', e.target.value, 'select')}
                disabled={!form.setCallerCalleeTypeRedirectingNum}
                style={{ minWidth: 140, padding: 3, borderRadius: 4, border: '1px solid #888', fontSize: 13, background: !form.setCallerCalleeTypeRedirectingNum ? '#eee' : '#fff', color: !form.setCallerCalleeTypeRedirectingNum ? '#888' : '#222' }}
              >
                <option value="National number">National number</option>
                <option value="International number">International number</option>
              </select>
            </div>
            {/* Synchronize Modification */}
            <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontWeight: 500 }}>Synchronize Modification</label>
              <input
                type="checkbox"
                checked={form.synchronizeModification}
                onChange={() => handleChange('synchronizeModification', !form.synchronizeModification, 'checkbox')}
                style={{ width: 15, height: 15 }}
              />
            </div>
          </div>
        </div>

        {/* ISDN Global Settings */}
        <div style={{ margin: '32px 0 6px 0', fontWeight: 600, fontSize: 15, marginLeft: 265 }}>{sectionTitles.global}</div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 64, marginLeft: 420, width: 900 }}>
          {/* Left column: labels and checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {globalFields.map(field => (
              <div key={field.name} style={{ display: 'flex', alignItems: 'center', minHeight: 38, marginBottom: 6 }}>
                {field.type === 'checkbox' ? (
                  <>
                    <input
                      type="checkbox"
                      checked={form[field.name]}
                      onChange={() => handleChange(field.name, !form[field.name], field.type)}
                      style={{ width: 16, height: 16, marginRight: 10 }}
                    />
                    <span style={{ fontWeight: 400 }}>{field.label}</span>
                  </>
                ) : (
                  <span style={{ fontWeight: 400 }}>{field.label}</span>
                )}
              </div>
            ))}
          </div>
          {/* Right column: input/select fields, empty for checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: 60 }}>
            {globalFields.map(field => (
              <div key={field.name} style={{ minHeight: 38, marginBottom: 6, display: 'flex', alignItems: 'center' }}>
                {field.type === 'select' ? (
                  <select
                    value={form[field.name]}
                    onChange={e => handleChange(field.name, e.target.value, field.type)}
                    style={{ width: 320, padding: 4, borderRadius: 4, border: '1px solid #888', fontSize: 15 }}
                  >
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'text' ? (
                  <input
                    type="text"
                    value={form[field.name]}
                    onChange={e => handleChange(field.name, e.target.value, field.type)}
                    style={{ width: 320, padding: 4, borderRadius: 4, border: '1px solid #888', fontSize: 15 }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* ISDN User Side */}
        <div style={{ margin: '32px 0 6px 0', fontWeight: 600, fontSize: 15, marginLeft: 300 }}>{sectionTitles.user}</div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 60, marginLeft: 420, marginBottom: 32, alignItems: 'flex-start' }}>
          {/* Column 1: Two checkboxes stacked vertically */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minWidth: 340, gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={form.userSendCalledPartyNumberComplete}
                onChange={() => handleChange('userSendCalledPartyNumberComplete', !form.userSendCalledPartyNumberComplete, 'checkbox')}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
              <span style={{ fontWeight: 400 }}>
                Send the 'Called Party Number Complete' Parameter
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={form.userSendChannelIdentification}
                onChange={() => handleChange('userSendChannelIdentification', !form.userSendChannelIdentification, 'checkbox')}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
              <span style={{ fontWeight: 400 }}>
                Send Channel Identification Message
              </span>
            </div>
          </div>
          {/* Column 2: Wait Confirm Time (T310) (s) and Set Cause Value Length to 2 bytes */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 340, gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 400, marginRight: 8 }}>Wait Confirm Time (T310) (s)</span>
              <input
                type="text"
                value={form.userWaitConfirmTime}
                onChange={e => handleChange('userWaitConfirmTime', e.target.value, 'text')}
                style={{ width: 70, padding: 4, borderRadius: 4, border: '1px solid #888', fontSize: 15, marginLeft: 4 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 0 }}>
              <input
                type="checkbox"
                checked={form.userSetCauseValueLength}
                onChange={() => handleChange('userSetCauseValueLength', !form.userSetCauseValueLength, 'checkbox')}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
              <span style={{ fontWeight: 400 }}>Set Cause Value Length to 2 bytes</span>
            </div>
          </div>
          {/* Column 3: Allow the Preferential Channel Selection, vertically centered */}
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 340, height: 76 }}>
            <input
              type="checkbox"
              checked={form.userAllowPreferentialChannel}
              onChange={() => handleChange('userAllowPreferentialChannel', !form.userAllowPreferentialChannel, 'checkbox')}
              style={{ width: 16, height: 16, marginRight: 10 }}
            />
            <span style={{ fontWeight: 400 }}>Allow the Preferential Channel Selection</span>
          </div>
        </div>

        {/* ISDN Network Side */}
        <div style={{ margin: '32px 0 6px 0', fontWeight: 600, fontSize: 15, marginLeft: 280 }}>{sectionTitles.network}</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '340px 340px 340px',
            gridTemplateRows: '38px 38px',
            gap: '0 60px',
            marginLeft: 420,
            marginBottom: 16,
            alignItems: 'center'
          }}
        >
          {/* Row 1 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={form.networkSendCalledPartyNumberComplete}
              onChange={() => handleChange('networkSendCalledPartyNumberComplete', !form.networkSendCalledPartyNumberComplete, 'checkbox')}
              style={{ width: 16, height: 16, marginRight: 10 }}
            />
            <span>Send the 'Called Party Number Complete' Parameter</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8 }}>Wait Confirm Time (T310) (s)</span>
            <input
              type="text"
              value={form.networkWaitConfirmTime}
              onChange={e => handleChange('networkWaitConfirmTime', e.target.value, 'text')}
              style={{ width: 70, padding: 4, borderRadius: 4, border: '1px solid #888', fontSize: 15, marginLeft: 4 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 76 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={form.networkAllowPreferentialChannel}
                onChange={() => handleChange('networkAllowPreferentialChannel', !form.networkAllowPreferentialChannel, 'checkbox')}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
              <span>Allow the Preferential Channel Selection</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 18 }}>
              <input
                type="checkbox"
                checked={form.networkEnable || false}
                onChange={() => handleChange('networkEnable', !form.networkEnable, 'checkbox')}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
              <span>Enable</span>
            </div>
          </div>
          {/* Row 2 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={form.networkSendChannelIdentification}
              onChange={() => handleChange('networkSendChannelIdentification', !form.networkSendChannelIdentification, 'checkbox')}
              style={{ width: 16, height: 16, marginRight: 10 }}
            />
            <span>Send Channel Identification Message</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={form.networkSetCauseValueLength}
              onChange={() => handleChange('networkSetCauseValueLength', !form.networkSetCauseValueLength, 'checkbox')}
              style={{ width: 16, height: 16, marginRight: 10 }}
            />
            <span>Set Cause Value Length to 2 bytes</span>
          </div>
          <div /> {/* Empty cell */}
        </div>

        {/* Send ISDN Redirecting Number text */}
        <div style={{ marginLeft: 420, marginBottom: 16, fontWeight: 500, color: '#444', fontSize: 13 }}>
          Send ISDN Redirecting Number
        </div>
      </div>
      {/* Save and Reset buttons outside the border */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32, marginBottom: 12 }}>
        <button
          type="button"
          onClick={handleSave}
          style={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            border: '1.2px solid #1976d2',
            borderRadius: 6,
            padding: '6px 32px',
            boxShadow: '0 2px 6px #0002',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{
            background: 'linear-gradient(to bottom, #3bb6f5 0%, #0e8fd6 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            border: '1.2px solid #1976d2',
            borderRadius: 6,
            padding: '6px 32px',
            boxShadow: '0 2px 6px #0002',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
      <div style={{ color: 'red', textAlign: 'center', fontSize: 13, marginBottom: 10, marginTop: -10 }}>
        Note 1: You shall restart the service to validate the settings on this page!
      </div>
    </div>
  );
};

export default IsdnIsdnPage;
