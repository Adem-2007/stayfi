import { auth } from './auth.js';
import { API_ENDPOINTS } from '../config/api.js';

// Helper to get auth headers
function getAuthHeaders() {
  const token = auth.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Submit application
export async function submitApplication(formData) {
  const response = await fetch(API_ENDPOINTS.SUBMIT_APPLICATION, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ formData })
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Server returned non-JSON response');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Submission failed');
  }

  return data;
}

// Get submissions
export async function getSubmissions(userType) {
  const url = userType 
    ? `${API_ENDPOINTS.GET_SUBMISSIONS}?userType=${userType}`
    : API_ENDPOINTS.GET_SUBMISSIONS;

  const response = await fetch(url, {
    headers: getAuthHeaders()
  });

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (response.ok) {
      return data;
    }
  }

  return { success: false, submissions: [] };
}

// Get submission by ID
export async function getSubmissionById(id) {
  const response = await fetch(API_ENDPOINTS.GET_SUBMISSION_BY_ID(id), {
    headers: getAuthHeaders()
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch submission');
  }

  return data;
}

// Send verification email
export async function sendVerificationEmail(email) {
  const response = await fetch(API_ENDPOINTS.SEND_VERIFICATION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to send verification email');
  }

  return data;
}

// Verify code
export async function verifyCode(email, code) {
  const response = await fetch(API_ENDPOINTS.VERIFY_CODE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Verification failed');
  }

  return data;
}
