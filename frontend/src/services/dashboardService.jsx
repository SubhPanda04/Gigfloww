const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getDashboardMetrics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/metrics`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    throw error;
  }
};

export const getEmployeeCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/people`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data.length : 0;
  } catch (error) {
    console.error('Error fetching employee count:', error);
    return 0;
  }
};