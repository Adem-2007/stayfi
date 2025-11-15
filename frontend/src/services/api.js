import { auth } from '../stores/auth.js';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  // Helper to get auth headers
  getAuthHeaders() {
    const token = auth.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  },

  // Submissions
  async submitApplication(formData) {
    const response = await fetch(`${API_BASE_URL}/submit-application`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
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
  },

  async getSubmissions(userType) {
    const url = userType 
      ? `${API_BASE_URL}/submissions?userType=${userType}`
      : `${API_BASE_URL}/submissions`;

    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    });

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
    }

    return { success: false, submissions: [] };
  },

  async getSubmissionById(id) {
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      headers: this.getAuthHeaders()
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch submission');
    }

    return data;
  }
};
