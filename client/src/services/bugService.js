const API_BASE_URL = 'http://localhost:5000/api';

class BugService {
  async makeRequest(url, options = {}) {
    try {
      console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ API Error:', response.status, data);
        const error = new Error(data.message || 'API request failed');
        error.response = { data, status: response.status };
        throw error;
      }

      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('❌ Network Error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the server is running.');
      }
      throw error;
    }
  }

  async getBugs(filters = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/bugs${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest(url);
  }

  async getBug(id) {
    return this.makeRequest(`${API_BASE_URL}/bugs/${id}`);
  }

  async createBug(bugData) {
    return this.makeRequest(`${API_BASE_URL}/bugs`, {
      method: 'POST',
      body: JSON.stringify(bugData),
    });
  }

  async updateBug(id, bugData) {
    return this.makeRequest(`${API_BASE_URL}/bugs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bugData),
    });
  }

  async deleteBug(id) {
    return this.makeRequest(`${API_BASE_URL}/bugs/${id}`, {
      method: 'DELETE',
    });
  }
}

export const bugService = new BugService()