import axios from 'axios';

const apiConnector = async (method, url, data = null, headers = {}) => {
    try {
        const response = await axios({
            method, 
            url, 
            data, 
            headers, // Use 'headers' instead of 'header'
            withCredentials: true // This is correct for sending cookies along with requests
        });
        return response.data;
    } catch (error) {
        // Enhanced error handling
        if (error.response) {
            // Server responded with a status outside 2xx range
            console.error("API error:\n", error.response.data);
            throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
            // No response was received
            console.error("No response received:", error.request);
            throw new Error("API Error: No response received");
        } else {
            // Something else happened
            console.error("Request error:", error.message);
            throw new Error(`API Error: ${error.message}`);
        }
    }
};

export default apiConnector;
