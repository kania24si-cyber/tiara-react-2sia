import axios from "axios";

const API_URL = "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/products";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const productsAPI = {
  // GET ALL PRODUCTS
  async fetchProducts() {
    const response = await axios.get(`${API_URL}?order=id.asc`, { headers });
    return response.data;
  },

  // CREATE PRODUCT
  async createProduct(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  // UPDATE PRODUCT
  async updateProduct(id, data) {
    await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
  },

  // DELETE PRODUCT
  async deleteProduct(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  // GET PRODUCT BY ID
  async getProductById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}&select=*`, { headers });
    return response.data[0];
  },
};