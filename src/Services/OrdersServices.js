import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/orderItem';

export const getAllOrders = () => axios.get(`${REST_API_BASE_URL}/getAll`);

export const addOrder = (order) => axios.post(`${REST_API_BASE_URL}/add`, order);

export const getOrderById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateOrderById = (id, order) => axios.put(`${REST_API_BASE_URL}/update/${id}`, order);

export const deleteOrder = (id) => axios.delete(`${REST_API_BASE_URL}/delete/${id}`);

export const deleteAllOrders = () => axios.delete(`${REST_API_BASE_URL}/deleteAll`);
