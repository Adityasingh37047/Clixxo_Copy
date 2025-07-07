export const CENTRALIZED_MANAGE_FIELDS = [
  { name: 'centralizedManage', label: 'Centralized Manage', type: 'checkbox' },
  { name: 'notificationSetting', label: 'Notification Setting:', type: 'checkbox' },
  { name: 'trapServerPort', label: 'Trap Server Port:', type: 'text' },
  { name: 'cpuUsage', label: 'CPU Usage Threshold(%):', type: 'text' },
  { name: 'memoryUsage', label: 'Memory Usage Threshold(%):', type: 'text' },
  { name: 'highCps', label: 'High CPS Threshold(%):', type: 'text' },
  { name: 'lowConnRate', label: 'Low Connection Rate Threshold(%):', type: 'text' },
  { name: 'autoChangeGateway', label: 'Auto Change Default Gateway:', type: 'checkbox' },
  { name: 'managementPlatform', label: 'Management Platform:', type: 'select' },
  { name: 'companyName', label: 'Company Name:', type: 'text' },
  { name: 'gatewayDesc', label: 'Gateway Description:', type: 'text' },
  { name: 'snmpServer', label: 'SNMP Server Address:', type: 'text' },
  { name: 'communityString', label: 'Community String:', type: 'text' },
  { name: 'authCode', label: 'Authorization Code :', type: 'text', placeholder: 'Please input authorization code' },
  { name: 'workingStatus', label: 'Working Status:', type: 'static', value: 'Requesting authentication' },
];

export const MANAGEMENT_PLATFORM_OPTIONS = [
  { value: 'DCMS', label: 'DCMS' },
  { value: 'Custom1', label: 'Custom1' },
  { value: 'Others', label: 'Others' },
];

export const CENTRALIZED_MANAGE_BUTTONS = [
  { name: 'save', label: 'Save' },
  { name: 'reset', label: 'Reset' },
  { name: 'download', label: 'Download MIB' },
];
