import axios from 'axios'

const apiConnector = async (method, url, data = null, header = {}) => {
    try {
        const response = await axios({
            method, url, data, header, withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.error("API error:\n", error);
        throw error;
    }

}

export default apiConnector