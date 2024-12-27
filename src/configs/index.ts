const config = {
  API_ROOT: import.meta.env.VITE_APP_NAME ?? 'https://staffapi.securesector.uz/',
  FILE_URL: import.meta.env.VITE_APP_URL ?? 'https://staffapi.securesector.uz',
  DEFAULT_APP_LANG: 'ru',
  ROLES: [],
  PERMISSIONS: []
};

export default config;
