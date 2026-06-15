import axios from "axios";

// Menggunakan Environment Variables agar aman dan dinamis di Localhost maupun Vercel
const API_URL = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/users`
  : "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/users";

const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const usersAPI = {
  // 1. Ambil semua data user (diurutkan berdasarkan ID)
  async fetchUsers() {
    const response = await axios.get(`${API_URL}?order=id.asc`, { headers });
    return response.data;
  },

  // 2. Registrasi / Tambah User Baru
  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  // 3. Update Data User
  async updateUser(id, data) {
    await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
  },

  // 4. Fitur Login yang Sudah Diperbaiki (Langsung filter di database)
  async loginUser(email, password) {
    // Memanfaatkan parameter eq (equal) bawaan Supabase PostgREST
    const response = await axios.get(
      `${API_URL}?email=eq.${email}&password=eq.${password}&select=*`,
      { headers }
    );

    // Supabase akan langsung mengembalikan array berisi user yang cocok (atau array kosong jika salah)
    return response.data; 
  },

  // 5. Hapus User
  async deleteUser(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  // 6. Ambil Data User Berdasarkan ID
  async getUserById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}&select=*`, { headers });
    return response.data[0];
  },
};