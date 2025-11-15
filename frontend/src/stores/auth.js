import { writable } from 'svelte/store';
import { push } from 'svelte-spa-router';

const API_URL = 'http://localhost:3001/api';
const SESSION_CHECK_INTERVAL = 30000; // Check every 30 seconds
const ACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

let sessionCheckInterval = null;
let activityTimeout = null;
let lastActivity = Date.now();

function createAuthStore() {
  const { subscribe, set, update } = writable({
    isAuthenticated: false,
    admin: null,
    token: null,
    loading: true
  });

  function resetActivityTimer() {
    lastActivity = Date.now();
    
    if (activityTimeout) {
      clearTimeout(activityTimeout);
    }
    
    activityTimeout = setTimeout(() => {
      handleSessionExpired();
    }, ACTIVITY_TIMEOUT);
  }

  function handleSessionExpired() {
    console.log('Session expired - logging out');
    authStore.logout();
    push('/login');
  }

  function startSessionMonitoring() {
    // Clear any existing intervals
    if (sessionCheckInterval) {
      clearInterval(sessionCheckInterval);
    }

    // Start activity timer
    resetActivityTimer();

    // Monitor user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetActivityTimer);
    });

    // Periodically check session validity
    sessionCheckInterval = setInterval(async () => {
      const timeSinceActivity = Date.now() - lastActivity;
      
      if (timeSinceActivity >= ACTIVITY_TIMEOUT) {
        handleSessionExpired();
        return;
      }

      // Verify token is still valid
      const token = sessionStorage.getItem('stayfi_token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/verify-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            handleSessionExpired();
          }
        } catch (error) {
          console.error('Session check failed:', error);
        }
      }
    }, SESSION_CHECK_INTERVAL);
  }

  function stopSessionMonitoring() {
    if (sessionCheckInterval) {
      clearInterval(sessionCheckInterval);
      sessionCheckInterval = null;
    }
    
    if (activityTimeout) {
      clearTimeout(activityTimeout);
      activityTimeout = null;
    }

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.removeEventListener(event, resetActivityTimer);
    });
  }

  const authStore = {
    subscribe,
    
    requestLogin: async (email) => {
      try {
        const response = await fetch(`${API_URL}/auth/request-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send verification code');
        }

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    verifyLogin: async (email, code) => {
      try {
        const response = await fetch(`${API_URL}/auth/verify-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        // Store in sessionStorage (not localStorage)
        sessionStorage.setItem('stayfi_token', data.token);
        sessionStorage.setItem('stayfi_admin', JSON.stringify(data.admin));

        set({
          isAuthenticated: true,
          admin: data.admin,
          token: data.token,
          loading: false
        });

        // Start session monitoring
        startSessionMonitoring();

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    logout: async () => {
      const token = sessionStorage.getItem('stayfi_token');
      
      if (token) {
        try {
          await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
      }

      // Stop session monitoring
      stopSessionMonitoring();

      // Clear storage
      sessionStorage.removeItem('stayfi_token');
      sessionStorage.removeItem('stayfi_admin');
      
      set({
        isAuthenticated: false,
        admin: null,
        token: null,
        loading: false
      });
    },

    checkAuth: async () => {
      const token = sessionStorage.getItem('stayfi_token');
      const adminData = sessionStorage.getItem('stayfi_admin');

      if (!token || !adminData) {
        set({
          isAuthenticated: false,
          admin: null,
          token: null,
          loading: false
        });
        return false;
      }

      try {
        const response = await fetch(`${API_URL}/auth/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          set({
            isAuthenticated: true,
            admin: JSON.parse(adminData),
            token,
            loading: false
          });

          // Start session monitoring
          startSessionMonitoring();

          return true;
        } else {
          sessionStorage.removeItem('stayfi_token');
          sessionStorage.removeItem('stayfi_admin');
          set({
            isAuthenticated: false,
            admin: null,
            token: null,
            loading: false
          });
          return false;
        }
      } catch (error) {
        set({
          isAuthenticated: false,
          admin: null,
          token: null,
          loading: false
        });
        return false;
      }
    },

    getToken: () => {
      return sessionStorage.getItem('stayfi_token');
    }
  };

  return authStore;
}

export const auth = createAuthStore();
