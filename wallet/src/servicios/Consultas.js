import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://laboratorio-afe2.restdb.io/rest/',
  headers: { 'x-apikey': '650b53356888544ec60c00bf' },
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
