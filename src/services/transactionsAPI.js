import axios from "axios";

// Endpoint diarahkan ke tabel transactions sesuai gambar Supabase kamu
const API_URL =
  "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/transactions";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const transactionsAPI = {
  // GET ALL TRANSACTIONS (Urut berdasarkan ID terkecil)
  async fetchTransactions() {
    const response = await axios.get(
      `${API_URL}?select=*&order=id.asc`,
      { headers }
    );
    return response.data;
  },

  // CREATE TRANSACTION
  // Data payload otomatis mencakup: customer_id, product_id, metode_pembayaran, total_transaksi, tanggal_transaksi
  async createTransaction(data) {
    const response = await axios.post(
      API_URL,
      data,
      { headers }
    );
    return response.data;
  },

  // UPDATE TRANSACTION
  async updateTransaction(id, data) {
    await axios.patch(
      `${API_URL}?id=eq.${id}`,
      { ...data },
      { headers }
    );
  },

  // DELETE TRANSACTION
  async deleteTransaction(id) {
    await axios.delete(
      `${API_URL}?id=eq.${id}`,
      { headers }
    );
  },

  // GET TRANSACTION BY ID
  async getTransactionById(id) {
    const response = await axios.get(
      `${API_URL}?id=eq.${id}&select=*`,
      { headers }
    );
    return response.data[0];
  },
};