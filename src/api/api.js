import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

export const getSales = async (params = "") => {
  const response = await axios.get(`${API_URL}/sales/?name=`+params);
  return response.data;
};

export const getProductTypes = async () => {
  const response = await axios.get(`${API_URL}/product-types`);
  return response.data;
};

export const createSale = async (sale) => {
  const response = await axios.post(`${API_URL}/sales`, sale);
  return response.data;
};

export const updateSale = async (id, sale) => {
  const response = await axios.put(`${API_URL}/sales/${id}`, sale);
  return response.data;
};

export const deleteSale = async (id) => {
  const response = await axios.delete(`${API_URL}/sales/${id}`);
  return response.data;
};

export const createProductType = async (productType) => {
  const response = await axios.post(`${API_URL}/product-types`, productType);
  return response.data;
};

export const updateProductType = async (id, productType) => {
  const response = await axios.put(`${API_URL}/product-types/${id}`, productType);
  return response.data;
};

export const deleteProductType = async (id) => {
  const response = await axios.delete(`${API_URL}/product-types/${id}`);
  return response.data;
};
