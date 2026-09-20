/**
 * API Service
 * Handles all backend requests to the Express server.
 * Proxied in development via vite.config.js (/api -> http://localhost:5000/api)
 */

// Direct Backend URL
// NOTE: Change to 'https://careersense.onrender.com' for production
const BACKEND_URL = 'http://localhost:5000';
const API_BASE = `${BACKEND_URL}/api`;

const getHeaders = (withAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (withAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // --- Auth ---
  async sendOtp(email) {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error('Failed to send OTP');
    return res.json();
  },

  async verifyOtp(email, otp) {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, otp })
    });
    if (!res.ok) throw new Error('Failed to verify OTP');
    return res.json();
  },

  // --- Profiles ---
  async createProfile(profileData) {
    const res = await fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(profileData)
    });
    if (!res.ok) throw new Error('Failed to create profile');
    return res.json();
  },

  async getProfile(profileId) {
    const res = await fetch(`${API_BASE}/profiles/${profileId}`, {
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Profile not found');
    return res.json();
  },

  async getMyProfile() {
    const res = await fetch(`${API_BASE}/profiles/me`, {
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Profile not found');
    return res.json();
  },

  async updateProfile(profileId, updateData) {
    const res = await fetch(`${API_BASE}/profiles/${profileId}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updateData)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // --- Intelligence Analysis ---
  async triggerGapAnalysis(profileId) {
    const res = await fetch(`${API_BASE}/analysis/gap/${profileId}`, {
      method: 'POST',
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Analysis failed');
    return res.json();
  }
};
