// PCM Trunk Group modal fields and initial state

export const PCM_TRUNK_GROUP_FIELDS = [
  {
    name: 'index',
    label: 'Index',
    type: 'select',
    options: Array.from({ length: 16 }, (_, i) => ({ value: i, label: i.toString() })),
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'default',
  },
  {
    name: 'selectMode',
    label: 'PCM Trunk Select Mode',
    type: 'select',
    options: [
      { value: 'Increase', label: 'Increase' },
      { value: 'Decrease', label: 'Decrease' },
      { value: 'Random', label: 'Random' },
    ],
  },
  {
    name: 'backupGroup',
    label: 'Backup Trunk Group',
    type: 'select',
    options: [
      { value: 'None', label: 'None' },
      // More options can be added dynamically if needed
    ],
  },
  // PCM Trunks handled separately as checkboxes
];

export const PCM_TRUNK_GROUP_INITIAL_FORM = {
  index: 0,
  description: 'default',
  selectMode: 'Increase',
  backupGroup: 'None',
  pcmTrunks: ['0'], // Array of selected PCM trunk numbers as strings
};

export const PCM_TRUNK_GROUP_TABLE_COLUMNS = [
  { key: 'check', label: 'Check' },
  { key: 'index', label: 'Index' },
  { key: 'pcmTrunks', label: 'PCM Trunks' },
  { key: 'selectMode', label: 'PCM Trunk Select Mode' },
  { key: 'backupGroup', label: 'Backup Trunk Group' },
  { key: 'description', label: 'Description' },
  { key: 'modify', label: 'Modify' },
];
