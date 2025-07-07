export const SIP_TRUNK_GROUP_FIELDS = [
  { name: 'index', label: 'Index', type: 'select', options: Array.from({length: 16}, (_, i) => ({ value: String(i), label: String(i) })), defaultValue: '0' },
  { name: 'description', label: 'Description', type: 'text', defaultValue: 'default' },
  { name: 'sipTrunkSelectMode', label: 'SIP Trunk Select Mode', type: 'select', options: [
    { value: 'Increase', label: 'Increase' },
    { value: 'Random', label: 'Random' },
    { value: 'Priority', label: 'Priority' }
  ], defaultValue: 'Increase' },
  { name: 'outgoingCallRestriction', label: 'Outgoing Call Restriction', type: 'select', options: [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' }
  ], defaultValue: 'No' },
  { name: 'incomingCallRestriction', label: 'Incoming Call Restriction', type: 'select', options: [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' }
  ], defaultValue: 'No' },
  { name: 'ipToPstnOutgoingCallForbidden', label: 'IP->PSTN Outgoing Call Forbidden', type: 'select', options: [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' }
  ], defaultValue: 'No' },
  { name: 'sipTrunks', label: 'SIP Trunks', type: 'checkbox', options: [{ value: '0', label: '0' }], defaultValue: [] },
];

export const SIP_TRUNK_GROUP_INITIAL_FORM = SIP_TRUNK_GROUP_FIELDS.reduce((acc, field) => {
  if (field.type === 'checkbox') acc[field.name] = [];
  else acc[field.name] = field.defaultValue;
  return acc;
}, {});

export const SIP_TRUNK_GROUP_TABLE_COLUMNS = [
  { key: 'check', label: 'Check' },
  { key: 'index', label: 'Index' },
  { key: 'sipTrunks', label: 'SIP Trunks' },
  { key: 'sipTrunkSelectMode', label: 'SIP Trunk Select Mode' },
  { key: 'outgoingCallRestriction', label: 'Outgoing Call Restriction' },
  { key: 'incomingCallRestriction', label: 'Incoming Call Restriction' },
  { key: 'ipToPstnOutgoingCallForbidden', label: 'IP->PSTN Outgoing Call Forbidden' },
  { key: 'description', label: 'Description' },
  { key: 'modify', label: 'Modify' },
];
