import axios from 'axios';
import store from '@/store';
const apiClient = axios.create({
  baseURL: 'https://laboratorio-afe2.restdb.io/rest/',
  headers: { 'x-apikey': '650b53356888544ec60c00bf' },
});
export default {
  guardarTransacciones(datos) {
    return apiClient.post('/transactions', datos);
  },
  recuperarTransacciones() {
    let user_id = store.state.user_id;
    return apiClient.get(`/transactions?q={"user_id": "${user_id}"}`);
  },
  recuperarTransaccion(id) {
    return apiClient.get('/transactions/' + id);
  },
  actualizarTransaccion(id, datos) {
    return apiClient.patch('/transactions/' + id, datos);
  },
  eliminarTransaccion(id) {
    return apiClient.delete('/transactions/' + id);
  },
};
