import axios from 'axios'

export default {
  async query ({page,size}) {
    const res = await axios.post('/party/admin/query', {page,size});
    return res.data;
  },

  async login ({username, password}) {
    const res = await axios.post(`/party/admin/login`, {username, password});
    return res.data;
  },
}