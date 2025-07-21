export const ROUTE_PSTN_IP_FIELDS = [
  { key: 'index', label: 'Index', type: 'select', options: Array.from({length: 1}, (_, i) => i + 1) },
  { key: 'callInitiator', label: 'Call Initiator', type: 'select', options: ['PCM Trunk Group [0]', 'PCM Trunk Group [1]'] },
  { key: 'callerIdPrefix', label: 'CallerID Prefix', type: 'text' },
  { key: 'calleeIdPrefix', label: 'CalleeID Prefix', type: 'text' },
  { key: 'callDestination', label: 'Call Destination', type: 'select', options: ['SIP Trunk Group [0]', 'SIP Trunk Group [1]'] },
  { key: 'numberFilter', label: 'Number Filter', type: 'select', options: ['none', 'filter1', 'filter2'] },
  { key: 'description', label: 'Description', type: 'text' },
];

export const ROUTE_PSTN_IP_INITIAL_FORM = {
  index: 1,
  callInitiator: 'PCM Trunk Group [0]',
  callerIdPrefix: '*',
  calleeIdPrefix: '*',
  callDestination: 'SIP Trunk Group [0]',
  numberFilter: 'none',
  description: 'default',
};

export const ROUTE_PSTN_IP_TABLE_COLUMNS = [
  { key: 'index', label: 'Index' },
  { key: 'callInitiator', label: 'Call Initiator' },
  { key: 'callerIdPrefix', label: 'CallerID Prefix' },
  { key: 'calleeIdPrefix', label: 'CalleeID Prefix' },
  { key: 'callDestination', label: 'Call Destination' },
  { key: 'numberFilter', label: 'Number Filter' },
  { key: 'description', label: 'Description' },
];
