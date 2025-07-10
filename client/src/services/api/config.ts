import { Configuration } from '../../generated/api';

// API Configuration for the generated OpenAPI client
export const apiConfig = new Configuration({
  basePath: 'http://localhost:8000',
  // Add any authentication configuration here if needed
  // accessToken: () => localStorage.getItem('token') || '',
});

// Export the base path for consistency
export const API_BASE_PATH = 'http://localhost:8000';
