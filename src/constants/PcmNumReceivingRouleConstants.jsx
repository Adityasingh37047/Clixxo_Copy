// Number Receiving Rule modal fields and initial state

export const NUM_RECEIVING_RULE_FIELDS = [
  {
    name: 'index',
    label: 'Index',
    type: 'select',
    options: Array.from({ length: 1 }, (_, i) => ({ value: i, label: i.toString() })),
  },
  {
    name: 'rule',
    label: 'Number-receiving Rule',
    type: 'text',
    placeholder: '0[6-9]xxxxxxxxxx',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'default',
  },
];

export const NUM_RECEIVING_RULE_INITIAL_FORM = {
  index: 0,
  rule: '',
  description: 'default',
};

export const NUM_RECEIVING_RULE_TABLE_COLUMNS = [
  { key: 'check', label: 'Check' },
  { key: 'index', label: 'Index' },
  { key: 'rule', label: 'Number-receiving Rule' },
  { key: 'description', label: 'Description' },
  { key: 'modify', label: 'Modify' },
];
