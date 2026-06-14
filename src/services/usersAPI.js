import axios from "axios";

const API_URL =
  "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/users";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const usersAPI = {
  async fetchUsers() {
  const response = await axios.get(
    `${API_URL}?order=id.asc`,
    { headers }
  );

  return response.data;
},

  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async updateUser(id, data) {
  await axios.patch(
    `${API_URL}?id=eq.${id}`,
    data,
    { headers }
  );
},

async loginUser(email, password) {
  const response = await axios.get(
    `${API_URL}?select=*`,
    { headers }
  );

  console.log(response.data);

  return response.data.filter(
    (user) =>
      user.email === email &&
      user.password === password
  );
},

  async deleteUser(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async getUserById(id) {
  const response = await axios.get(
    `${API_URL}?id=eq.${id}&select=*`,
    { headers }
  );

  return response.data[0];
},

};