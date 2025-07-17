import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // update if hosted
});

export default instance;
