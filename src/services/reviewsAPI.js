import axios from "axios";

const API_URL = "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/reviews";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const reviewsAPI = {
  // GET ALL REVIEWS
  async fetchReviews() {
    const response = await axios.get(
      // UBAH DISINI: products(name) -> products(nama_produk) ✨
      `${API_URL}?select=*,products(nama_produk),customers(nama_lengkap)&order=id.desc`,
      { headers }
    );

    return response.data;
  },

  // DELETE REVIEW
  async deleteReview(id) {
    await axios.delete(
      `${API_URL}?id=eq.${id}`,
      { headers }
    );
  }
};