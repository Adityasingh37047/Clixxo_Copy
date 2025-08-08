export const MANAGEMENT_SECTIONS = [
  {
    section: 'WEB Management',
    fields: [
      { name: 'webPort', label: 'WEB Port', type: 'text', initial: '' },
      { name: 'webAccess', label: 'Access Setting', type: 'select', options: [
        { value: 'all', label: 'Allow All IPs' },
        { value: 'whitelist', label: 'Whitelist Only' }
      ], initial: 'all' },
      { name: 'webTimeout', label: 'Time to Log out', type: 'text', initial: '' },
      { name: 'webWhitelist', label: 'WEB whitelist address', type: 'textarea', initial: '' },
    ]
  },
  {
    section: 'SSH Management Config',
    fields: [
      { name: 'sshEnable', label: 'SSH', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
      { name: 'sshPort', label: 'SSH Port', type: 'text', initial: '' },
      { name: 'sshWhitelist', label: 'SSH whitelist address', type: 'textarea', initial: '' },
    ]
  },
  {
    section: 'Remote Data Capture Config',
    fields: [
      { name: 'remoteDataCapture', label: 'Remote Data Capture', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
    ]
  },
  {
    section: 'FTP Config',
    fields: [
      { name: 'ftpEnable', label: 'FTP', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
      { name: 'ftpWhitelist', label: 'FTP whitelist address', type: 'textarea', initial: '' },
    ]
  },
  {
    section: 'Telnet Config',
    fields: [
      { name: 'telnetEnable', label: 'Telnet', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
      { name: 'telnetWhitelist', label: 'TELNET whitelist address', type: 'textarea', initial: '' },
    ]
  },
  {
    section: 'Watchdog Setting',
    fields: [
      { name: 'watchdogEnable', label: 'Enable Watchdog', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
    ]
  },
  {
    section: 'SYSLOG Parameters',
    fields: [
      { name: 'syslogEnable', label: 'SYSLOG', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
    ]
  },
  {
    section: 'CDR Parameters',
    fields: [
      { name: 'cdrEnable', label: 'Send CDR', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
      { name: 'cdrHangup', label: 'Add hangup side', type: 'checkbox', initial: false },
      { name: 'cdrAddLanIp', label: 'add lan1,2 IPv4 address', type: 'checkbox', initial: false },
      { name: 'cdrSendNumberClass', label: 'Send Number Classification Data', type: 'checkbox', initial: false },
      { name: 'cdrKeepRouting', label: 'Keep Routing in Server Error', type: 'checkbox', initial: false },
      { name: 'cdrDebugPhp', label: 'Interface of debug.php', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
      { name: 'cdrAllowDeny', label: 'Allow/Deny', type: 'radio', options: ['Allow', 'Deny'], initial: 'Allow' },
    ]
  },
  {
    section: 'Access to the interface',
    fields: [
      { name: 'accessDebugPhp', label: 'Interface of debug.php', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
    ]
  },
  {
    section: 'Time Parameters',
    fields: [
      { name: 'ntpEnable', label: 'NTP', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
      { name: 'dailyRestart', label: 'Daily Restart', type: 'radio', options: ['Yes', 'No'], initial: 'Yes' },
      { name: 'systemTime', label: 'System Time', type: 'text', initial: '' },
      { name: 'modifyTime', label: 'Modify', type: 'checkbox', initial: false },
      { name: 'timeZone', label: 'Time Zone', type: 'select', options: [
          { value: 'GMT+5:30', label: 'GMT+5:30 (India)' },
      ], initial: 'GMT+5:30' },
    ]
  },
];

export const MANAGEMENT_INITIAL_FORM = MANAGEMENT_SECTIONS.reduce((acc, section) => {
  section.fields.forEach(field => {
    acc[field.name] = field.initial;
  });
  return acc;
}, { modifyTimeValue: '' });
