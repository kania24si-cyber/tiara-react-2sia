import axios from "axios";

const API_URL =
  "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/customers";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const customersAPI = {
  // GET ALL CUSTOMERS
  async fetchCustomers() {
    const response = await axios.get(
      `${API_URL}?order=id.asc`,
      { headers }
    );

    return response.data;
  },

  async createCustomer(data) {
    const response = await axios.post(
      API_URL,
      data,
      { headers }
    );

    return response.data;
  },

  async updateCustomer(id, data, options = {}) {
    const loggedInUser = JSON.parse(localStorage.getItem("admin") || "{}");
    const isMember = options.byUserId || (loggedInUser.role === "member" && String(loggedInUser.id) === String(id));
    
    if (isMember) {
      // Check if the customer record exists for user_id = id
      const response = await axios.get(
        `${API_URL}?user_id=eq.${id}&select=*`,
        { headers }
      );
      if (response.data && response.data.length > 0) {
        // Update existing record
        await axios.patch(
          `${API_URL}?user_id=eq.${id}`,
          data,
          { headers }
        );
      } else {
        // Create new record
        await axios.post(
          API_URL,
          { ...data, user_id: id },
          { headers }
        );
      }
    } else {
      await axios.patch(
        `${API_URL}?id=eq.${id}`,
        data,
        { headers }
      );
    }
  },

  async deleteCustomer(id) {
    await axios.delete(
      `${API_URL}?id=eq.${id}`,
      { headers }
    );
  },

  async fetchCustomerById(id, options = {}) {
    const loggedInUser = JSON.parse(localStorage.getItem("admin") || "{}");
    const isMember = options.byUserId || (loggedInUser.role === "member" && String(loggedInUser.id) === String(id));
    const queryParam = isMember ? `user_id=eq.${id}` : `id=eq.${id}`;

    const response = await axios.get(
      `${API_URL}?${queryParam}&select=*`,
      { headers }
    );

    return response.data[0];
  }
};