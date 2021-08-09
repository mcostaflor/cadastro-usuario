import axios from 'axios';
import config from '../../../config.json';

const instance = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;