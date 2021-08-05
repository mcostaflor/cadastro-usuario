import axios from '../utils/axios';

const controllerUrl = '/users';

const api = {
    list: async () => (await (axios.get(controllerUrl))).data,
    insert: async payload => (await axios.put(controllerUrl, payload)).data,
    delete: async (id) => (await axios.delete(`${controllerUrl}/${id}`)).data,
    update: async (id, payload) => (await axios.put(`${controllerUrl}/${id}`, payload)).data,
    get: async (id) => (await axios.get(`${controllerUrl}/${id}`)).data,
};

export default api;