import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://laboratorio3-5fc7.restdb.io/rest/',
  headers: { 'x-apikey': '64bdbc3386d8c5613ded91e7' },
});
export default {
  guardarTransacciones(datos) {
    return apiClient.post('/transactions', datos);
  },
  recuperarTransacciones() {
    return apiClient.get('/transactions?q={"user_id": "Yoana"}');
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
