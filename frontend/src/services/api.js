const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

export const api = {
  auth: {
    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(credentials),
      });
      return handleResponse(response);
    },
    forgotPassword: async (email) => {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });
      return handleResponse(response);
    },
    resetPassword: async (resetData) => {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(resetData),
      });
      return handleResponse(response);
    },
  },
  bills: {
    create: async (billData) => {
      const response = await fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(billData),
      });
      return handleResponse(response);
    },
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/bills`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/bills/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    update: async (id, billData) => {
      const response = await fetch(`${API_BASE_URL}/bills/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(billData),
      });
      return handleResponse(response);
    },
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/bills/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },
  customers: {
    create: async (customerData) => {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(customerData),
      });
      return handleResponse(response);
    },
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_BASE_URL}/customers${queryString ? '?' + queryString : ''}`,
        {
          headers: getHeaders(),
        }
      );
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    update: async (id, customerData) => {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(customerData),
      });
      return handleResponse(response);
    },
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },
  products: {
    create: async (productData) => {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(productData),
      });
      return handleResponse(response);
    },
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_BASE_URL}/products${queryString ? '?' + queryString : ''}`,
        {
          headers: getHeaders(),
        }
      );
      return handleResponse(response);
    },
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    update: async (id, productData) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(productData),
      });
      return handleResponse(response);
    },
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },
  reports: {
    getDashboardStats: async () => {
      const response = await fetch(`${API_BASE_URL}/reports/stats/dashboard`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    getMonthlyReport: async (year) => {
      const response = await fetch(
        `${API_BASE_URL}/reports/monthly${year ? '?year=' + year : ''}`,
        {
          headers: getHeaders(),
        }
      );
      return handleResponse(response);
    },
    getPaymentReport: async () => {
      const response = await fetch(`${API_BASE_URL}/reports/payment`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    getTopCustomersReport: async () => {
      const response = await fetch(`${API_BASE_URL}/reports/customers/top`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    getTaxReport: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_BASE_URL}/reports/tax${queryString ? '?' + queryString : ''}`,
        {
          headers: getHeaders(),
        }
      );
      return handleResponse(response);
    },
  },
};
