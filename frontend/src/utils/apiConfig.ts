const LOCAL_API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;
const DEPLOYED_API_BASE_URL = import.meta.env.VITE_DEPLOYED_API_BASE_URL;

export const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? LOCAL_API_BASE_URL
    : DEPLOYED_API_BASE_URL;
