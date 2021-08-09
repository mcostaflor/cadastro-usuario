import axios from '../utils/axios';

const controllerUrl = '/users';

const api = {
    list: async () => (await (axios.get(controllerUrl))).data,
    insert: async payload => (await axios.put(controllerUrl, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data,
    delete: async (id) => (await axios.delete(`${controllerUrl}/${id}`)).data,
    update: async (id, payload) => (await axios.put(`${controllerUrl}/${id}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data,
    get: async (id) => (await axios.get(`${controllerUrl}/${id}`)).data,
};

export default api;