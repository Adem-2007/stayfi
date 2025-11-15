// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Verification
  SEND_VERIFICATION: `${API_BASE_URL}/send-verification`,
  VERIFY_CODE: `${API_BASE_URL}/verify-code`,
  
  // Submissions
  SUBMIT_APPLICATION: `${API_BASE_URL}/submit-application`,
  GET_SUBMISSIONS: `${API_BASE_URL}/submissions`,
  GET_SUBMISSION_BY_ID: (id) => `${API_BASE_URL}/submissions/${id}`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;
