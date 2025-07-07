// Media Parameters field definitions and initial values for SIP Media Page

export const SIP_MEDIA_FIELDS = [
  { name: 'dtmfTransmitMode', label: 'DTMF Transmit Mode', type: 'select', options: [
    { value: 'RFC2833', label: 'RFC2833' },
    { value: 'SIP INFO', label: 'SIP INFO' },
    { value: 'Inband', label: 'Inband' },
  ]},
  { name: 'rfc2833Payload', label: 'RFC2833 Payload', type: 'text' },
  { name: 'rtpPortRange', label: 'RTP Port Range', type: 'text' },
  { name: 'silenceSuppression', label: 'Silence Suppression', type: 'select', options: [
    { value: 'Enable', label: 'Enable' },
    { value: 'Disable', label: 'Disable' },
  ]},
  { name: 'noiseReduction', label: 'Noise Reduction', type: 'select', options: [
    { value: 'Enable', label: 'Enable' },
    { value: 'Disable', label: 'Disable' },
  ]},
  { name: 'comfortNoise', label: 'Comfort Noise Generation', type: 'select', options: [
    { value: 'Enable', label: 'Enable' },
    { value: 'Disable', label: 'Disable' },
  ]},
  { name: 'jitterMode', label: 'JitterMode', type: 'select', options: [
    { value: 'Static Mode', label: 'Static Mode' },
    { value: 'Dynamic Mode', label: 'Dynamic Mode' },
  ]},
  { name: 'jitterBuffer', label: 'JitterBuffer(ms)', type: 'text' },
  { name: 'jitterUnderrunLead', label: 'JitterUnderrunLead(ms)', type: 'text' },
  { name: 'jitterOverrunLead', label: 'JitterOverrunLead(ms)', type: 'text' },
  { name: 'ipOutputLevelControl', label: 'IP side output Level Control Mode', type: 'select', options: [
    { value: 'Manual', label: 'Manual' },
    { value: 'Auto', label: 'Auto' },
  ]},
  { name: 'voiceGainOutput', label: 'Voice Gain Output from IP(dB)', type: 'text' },
  { name: 'packTimeDefault', label: 'PackTime when negotiation fails is default value', type: 'select', options: [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ]},
];

export const SIP_MEDIA_CODEC_FIELD = {
  name: 'codecSetting',
  label: 'Gateway Negotiation Coding Sequence',
  type: 'select',
  options: [
    { value: 'Default Priority', label: 'Default Priority' },
    { value: 'G.711', label: 'G.711' },
    { value: 'G.729', label: 'G.729' },
    { value: 'G.723', label: 'G.723' },
    { value: 'G.726', label: 'G.726' },
  ],
};

export const SIP_MEDIA_INITIAL_FORM = {
  dtmfTransmitMode: 'RFC2833',
  rfc2833Payload: '101',
  rtpPortRange: '6000,10000',
  silenceSuppression: 'Disable',
  noiseReduction: 'Enable',
  comfortNoise: 'Enable',
  jitterMode: 'Static Mode',
  jitterBuffer: '100',
  jitterUnderrunLead: '100',
  jitterOverrunLead: '50',
  ipOutputLevelControl: 'Manual',
  voiceGainOutput: '0',
  packTimeDefault: 'Yes',
  codecSetting: 'Default Priority',
};
