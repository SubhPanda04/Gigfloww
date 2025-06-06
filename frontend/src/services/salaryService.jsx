const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getSalaries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/salaries`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching salaries:', error);
    throw error;
  }
};

export const createSalary = async (salaryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/salaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(salaryData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating salary:', error);
    throw error;
  }
};

export const updateSalaryStatus = async (employeeId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/salaries/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId, status })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating salary status:', error);
    throw error;
  }
};