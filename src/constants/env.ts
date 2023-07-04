// dotenv-webpack plugin throws error if env variables are empty
export const API_URL = import.meta.env.VITE_API_URL as string;
export const SALES_AI_URL = import.meta.env.VITE_SALES_AI_URL as string;

export const REFRESH_TOKEN_URL = '/auth/token/refresh';
