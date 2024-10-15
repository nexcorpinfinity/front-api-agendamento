import axios, { AxiosInstance } from 'axios';

const AxiosRequest: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
});

export default AxiosRequest;
