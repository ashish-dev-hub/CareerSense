/**
 * API Service
 * Handles all backend requests to the Express server.
 * Proxied in development via vite.config.js (/api -> http://localhost:5000/api)
 */

const API_BASE = '/api';

export const api = {
  // --- Profiles ---
  async createProfile(profileData) {
    const res = await fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    if (!res.ok) throw new Error('Failed to create profile');
    return res.json();
  },

  async getProfile(profileId) {
    const res = await fetch(`${API_BASE}/profiles/${profileId}`);
    if (!res.ok) throw new Error('Profile not found');
    return res.json();
  },

  async updateProfile(profileId, updateData) {
    const res = await fetch(`${API_BASE}/profiles/${profileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // --- Intelligence Analysis ---
  async triggerGapAnalysis(profileId) {
    const res = await fetch(`${API_BASE}/analysis/gap/${profileId}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Analysis failed');
    return res.json();
  }
};
