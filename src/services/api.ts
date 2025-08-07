interface AIResponse {
  action: string;
  speech: string;
}

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.vercel.app' // Replace with your actual backend URL
  : '/api';

export const analyzeImage = async (imageData: string): Promise<AIResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Validate response structure
    if (!result.action || !result.speech) {
      throw new Error('Invalid response format from OMI NAM');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to OMI NAM servers');
    }
    
    throw error;
  }
};

// Health check endpoint
export const checkHealth = async (): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};