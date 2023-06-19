// dotenv-webpack plugin throws error if env variables are empty
export const API_URL = import.meta.env.VITE_API_URL as string;
export const SALESAI_API_URL = import.meta.env.VITE_SALESAI_API_URL as string;

export const REFRESH_TOKEN_URL = '/auth/token/refresh';
