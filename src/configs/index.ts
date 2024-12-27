const config = {
  API_ROOT: import.meta.env.VITE_APP_URL ?? 'hhttp://10.10.2.40:3000/',
  FILE_URL: import.meta.env.VITE_APP_URL ?? 'http://10.10.2.40:3000',
  DEFAULT_APP_LANG: 'ru',
  ROLES: [],
  PERMISSIONS: []
};

export default config;
