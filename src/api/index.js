import axios from 'axios'

export default {
  async query ({ page, size, field, value }) {
    const res = await axios.post('/party/admin/query', { page, size, field, value });
    return res.data;
  },

  async login ({username, password}) {
    const res = await axios.post(`/party/admin/login`, {username, password});
    return res.data;
  },

  async group ({ id, group }) {
    const res = await axios.post('/party/admin/group', { id, group });
    return res.data;
  },
}