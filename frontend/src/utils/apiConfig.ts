const LOCAL_API_BASE_URL = 'http://localhost:4000';
const DEPLOYED_API_BASE_URL = 'https://helpdesk-lovat.vercel.app';

export const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? LOCAL_API_BASE_URL
    : DEPLOYED_API_BASE_URL;
