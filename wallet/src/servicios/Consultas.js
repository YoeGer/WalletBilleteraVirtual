import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://laboratorio-36cf.restdb.io/rest/',
  headers: { 'x-apikey': '64a5ccf686d8c5d256ed8fce' },
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
