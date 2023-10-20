import axios from 'axios';

const criptoApiClient = axios.create({
  baseURL: 'https://criptoya.com/api/',
});

export default {
  consultarCripto(exchange, coin, fiat, volumen) {
    return criptoApiClient.get(exchange + '/' + coin + '/' + fiat + '/' + volumen);
  },
};
