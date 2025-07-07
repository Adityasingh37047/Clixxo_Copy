// Table columns for the main table view
export const PSTN_CALL_IN_CALLERID_TABLE_COLUMNS = [
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

// Form fields for the modal (per screenshot)
export const PSTN_CALL_IN_CALLERID_FIELDS = [
  { name: 'index', label: 'Index:', type: 'number' },
  { name: 'callInitiator', label: 'Call Initiator:', type: 'select', options: [
    { value: 'pcmTrunkGroup0', label: 'PCM Trunk Group [0]' },
    { value: 'pcmTrunkGroup1', label: 'PCM Trunk Group [1]' },
    { value: 'pcmTrunkGroup2', label: 'PCM Trunk Group [2]' },
    { value: 'pcmTrunkGroup3', label: 'PCM Trunk Group [3]' },
    { value: 'pcmTrunkGroup4', label: 'PCM Trunk Group [4]' },
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
export const PSTN_CALL_IN_CALLERID_INITIAL_FORM = {
  index: '',
  callInitiator: 'pcmTrunkGroup0',
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
