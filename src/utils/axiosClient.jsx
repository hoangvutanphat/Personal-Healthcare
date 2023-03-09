import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BE_URL,
    headers: {
        'content-type': 'application/json',
    },
});

export default axiosClient;