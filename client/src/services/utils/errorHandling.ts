export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (typeof error === 'object' && error && 'message' in error) {
    return String(error.message);
  }
  
  return 'An unknown error occurred';
};
