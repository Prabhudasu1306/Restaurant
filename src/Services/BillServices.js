// BillServices.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/Bills'; // Update the base URL

export const addBill = async (billData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, billData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBills = () => axios.get(`${BASE_URL}/getAll`);

export const getBillById = (id) => axios.get(`${BASE_URL}/${id}`);

export const updateBillById = (id, bill) => axios.put(`${BASE_URL}/update/${id}`, bill);

export const deleteBillById = (id) => axios.delete(`${BASE_URL}/delete/${id}`);

export const deleteAllBills = () => axios.delete(`${BASE_URL}/deleteAll`);
