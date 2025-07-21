// Table columns for the main table view
export const IP_CALL_IN_CALLERID_TABLE_COLUMNS = [
  { key: 'check', label: 'Check' },
  { key: 'index', label: 'Index' },
  { key: 'callInitiator', label: 'Call Initiator' },
  { key: 'callerIdPrefix', label: 'CallerID Prefix' },
  { key: 'calleeIdPrefix', label: 'CalleeID Prefix' },
  { key: 'withOriginalCalleeId', label: 'With Original CalleeID' },
  { key: 'strippedLeft', label: 'Stripped Digits from Left' },
  { key: 'strippedRight', label: 'Stripped Digits from Right' },
  { key: 'reservedRight', label: 'Reserved Digits from Right' },
  { key: 'prefixToAdd', label: 'Prefix to Add' },
  { key: 'suffixToAdd', label: 'Suffix to Add' },
  { key: 'description', label: 'Description' },
  { key: 'modify', label: 'Modify' },
];

// Form fields for the modal
export const IP_CALL_IN_CALLERID_FIELDS = [
  { name: 'index', label: 'Index:', type: 'select', options: Array.from({length: 1}, (_, i) => ({ value: (i+1).toString(), label: (i+1).toString() })) },
  { name: 'callInitiator', label: 'Call Initiator:', type: 'select', options: [
    { value: 'sipTrunkGroup0', label: 'SIP Trunk Group [0]' },
    { value: 'sipTrunkGroup1', label: 'SIP Trunk Group [1]' },
    { value: 'sipTrunkGroup2', label: 'SIP Trunk Group [2]' },
    { value: 'sipTrunkGroup3', label: 'SIP Trunk Group [3]' },
    { value: 'sipTrunkGroup4', label: 'SIP Trunk Group [4]' },
  ] },
  { name: 'callerIdPrefix', label: 'CallerID Prefix:', type: 'text' },
  { name: 'calleeIdPrefix', label: 'CalleeID Prefix:', type: 'text' },
  { name: 'withOriginalCalleeId', label: 'With Original CalleeID:', type: 'select', options: [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' },
  ] },
  { name: 'strippedLeft', label: 'Stripped Digits from Left:', type: 'number' },
  { name: 'strippedRight', label: 'Stripped Digits from Right:', type: 'number' },
  { name: 'reservedRight', label: 'Reserved Digits from Right:', type: 'number' },
  { name: 'prefixToAdd', label: 'Prefix to Add:', type: 'text' },
  { name: 'suffixToAdd', label: 'Suffix to Add:', type: 'text' },
  { name: 'description', label: 'Description:', type: 'text' },
];

// Initial form state for the modal
export const IP_CALL_IN_CALLERID_INITIAL_FORM = {
  index: '1',
  callInitiator: 'sipTrunkGroup0',
  callerIdPrefix: '*',
  calleeIdPrefix: '*',
  withOriginalCalleeId: 'No',
  strippedLeft: '0',
  strippedRight: '0',
  reservedRight: '20',
  prefixToAdd: '',
  suffixToAdd: '',
  description: 'default',
};
