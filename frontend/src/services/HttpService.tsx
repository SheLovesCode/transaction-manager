import axios from 'axios';
import API_URL from '../config/Config.tsx';
import { NewTransaction } from '../types/Transaction.ts';

const httpService = {
  createTransaction: async (transactionData: NewTransaction) => {
    try {
      const response = await axios.post(`${API_URL}/api/transactions`, transactionData);
      return response.data;
    } catch (err) {
      console.error('Error creating transaction:', err);
      throw err;
    }
  },

  getTransactions: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/transactions`);
      return response.data;
    } catch (err) {
      console.error('Error fetching transactions:', err);
      throw err;
    }
  },

  getTransaction: async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/api/transactions/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching transaction:', err);
      throw err;
    }
  },

  updateTransaction: async (id: number, transactionData: NewTransaction) => {
    try {
      const response = await axios.put(`${API_URL}/api/transactions/${id}`, transactionData);
      return response.data;
    } catch (err) {
      console.error('Error updating transaction:', err);
      throw err;
    }
  },

  deleteTransaction: async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/api/transactions/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error deleting transaction:', err);
      throw err;
    }
  },
};

export default httpService;