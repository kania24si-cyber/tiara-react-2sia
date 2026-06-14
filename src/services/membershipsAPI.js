import axios from "axios";

const API_URL =
  "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/memberships";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const membershipsAPI = {
  // GET ALL MEMBERSHIPS
  async fetchMemberships() {
    const response = await axios.get(
      `${API_URL}?select=*&order=id.asc`,
      { headers }
    );

    return response.data;
  },

  // CREATE MEMBERSHIP
  async createMembership(data) {
    const response = await axios.post(
      API_URL,
      data,
      { headers }
    );

    return response.data;
  },

  // UPDATE MEMBERSHIP
  async updateMembership(id, data) {
    await axios.patch(
      `${API_URL}?id=eq.${id}`,
      data,
      { headers }
    );
  },

  // DELETE MEMBERSHIP
  async deleteMembership(id) {
    await axios.delete(
      `${API_URL}?id=eq.${id}`,
      { headers }
    );
  },

  // GET MEMBERSHIP BY ID
  async getMembershipById(id) {
    const response = await axios.get(
      `${API_URL}?id=eq.${id}&select=*`,
      { headers }
    );

    return response.data[0];
  },
};