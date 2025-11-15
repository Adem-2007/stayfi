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

// API Helper functions
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default API_BASE_URL;
