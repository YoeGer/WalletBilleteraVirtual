<template>
  <div>
    <h3 class="text-center">Analisis de sus inversiones</h3>
    <br />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <table class="table">
            <thead>
              <tr>
                <th>Criptomoneda</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="this.resultados.resultadoBtc != 0">
                <td>BITCOIN</td>
                <td>${{ redondearNumero(this.resultados.resultadoBtc) }}</td>
              </tr>
              <tr v-if="this.resultados.resultadoEth != 0">
                <td>ETHEREUM</td>
                <td>${{ redondearNumero(this.resultados.resultadoEth) }}</td>
              </tr>
              <tr v-if="this.resultados.resultadoUsdt != 0">
                <td>USDT</td>
                <td>${{ redondearNumero(this.resultados.resultadoUsdt) }}</td>
              </tr>
              <tr v-if="this.resultados.resultadoAda != 0">
                <td>ADA</td>
                <td>${{ redondearNumero(this.resultados.resultadoAda) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Consultas from '@/servicios/Consultas.js';
import ConsultasCripto from '@/servicios/ConsultasCripto.js';
export default {
  name: 'InversionesVista',
  data() {
    return {
      movimientos: [],
      valoresActuales1Btc: {},
      valoresActuales1Eth: {},
      valoresActuales1Usdt: {},
      valoresActuales1Ada: {},
      resultados: {
        resultadoBtc: 0,
        resultadoEth: 0,
        resultadoUsdt: 0,
        resultadoAda: 0,
      },
    };
  },
  async created() {
    await Consultas.recuperarTransacciones()
      .then((respuesta) => {
        this.movimientos = respuesta.data;
      })
      .catch((error) => {
        console.error('Error al recuperar las transacciones:', error);
      });
    await ConsultasCripto.consultarCripto('satoshitango', 'BTC', 'ARS', 1)
      .then((respuesta) => {
        this.valoresActuales1Btc = respuesta.data;
      })
      .catch((error) => {
        console.error('Error en la solicitud a la API de criptomonedas:', error);
      });
    await ConsultasCripto.consultarCripto('satoshitango', 'ETH', 'ARS', 1)
      .then((respuesta) => {
        this.valoresActuales1Eth = respuesta.data;
      })
      .catch((error) => {
        console.error('Error en la solicitud a la API de criptomonedas:', error);
      });
    await ConsultasCripto.consultarCripto('satoshitango', 'USDT', 'ARS', 1)
      .then((respuesta) => {
        this.valoresActuales1Usdt = respuesta.data;
      })
      .catch((error) => {
        console.error('Error en la solicitud a la API de criptomonedas:', error);
      });
    await ConsultasCripto.consultarCripto('satoshitango', 'ADA', 'ARS', 1)
      .then((respuesta) => {
        this.valoresActuales1Ada = respuesta.data;
      })
      .catch((error) => {
        console.error('Error en la solicitud a la API de criptomonedas:', error);
      });
    this.calculoResultados();
  },
  methods: {
    calculoResultados() {
      let cantBtc = 0;
      let cantEth = 0;
      let cantUsdt = 0;
      let cantAda = 0;
      let pagueLaCompraBtc = 0;
      let pagueLaCompraEth = 0;
      let pagueLaCompraUsdt = 0;
      let pagueLaCompraAda = 0;
      for (let mov of this.movimientos) {
        if (mov.crypto_code === 'btc') {
          let costoDe1 = 0;
          let costoDeLoVendido = 0;
          let resultadoDeLaVenta = 0;
          if (mov.action === 'purchase') {
            this.resultados.resultadoBtc +=
              parseFloat(this.valoresActuales1Btc.totalBid) * parseFloat(mov.crypto_amount) -
              parseFloat(mov.money);
            cantBtc += parseFloat(mov.crypto_amount);
            pagueLaCompraBtc += parseFloat(mov.money);
          }
          if (mov.action === 'sale') {
            costoDe1 = pagueLaCompraBtc / cantBtc;
            costoDeLoVendido = parseFloat(mov.crypto_amount) * costoDe1;
            resultadoDeLaVenta = parseFloat(mov.money) - costoDeLoVendido;
            this.resultados.resultadoBtc += resultadoDeLaVenta;
          }
        }
        if (mov.crypto_code === 'eth') {
          let costoDe1 = 0;
          let costoDeLoVendido = 0;
          let resultadoDeLaVenta = 0;
          if (mov.action === 'purchase') {
            this.resultados.resultadoEth +=
              parseFloat(this.valoresActuales1Eth.totalBid) * parseFloat(mov.crypto_amount) -
              parseFloat(mov.money);
            cantEth += parseFloat(mov.crypto_amount);
            pagueLaCompraEth += parseFloat(mov.money);
          }
          if (mov.action === 'sale') {
            costoDe1 = pagueLaCompraEth / cantEth;
            costoDeLoVendido = parseFloat(mov.crypto_amount) * costoDe1;
            resultadoDeLaVenta = parseFloat(mov.money) - costoDeLoVendido;
            this.resultados.resultadoEth += resultadoDeLaVenta;
            console.log(this.resultados.resultadoEth);
          }
        }
        if (mov.crypto_code === 'usdt') {
          let costoDe1 = 0;
          let costoDeLoVendido = 0;
          let resultadoDeLaVenta = 0;
          if (mov.action === 'purchase') {
            this.resultados.resultadoUsdt +=
              parseFloat(this.valoresActuales1Usdt.totalBid) * parseFloat(mov.crypto_amount) -
              parseFloat(mov.money);
            cantUsdt += parseFloat(mov.crypto_amount);
            pagueLaCompraUsdt += parseFloat(mov.money);
          }
          if (mov.action === 'sale') {
            costoDe1 = pagueLaCompraUsdt / cantUsdt;
            costoDeLoVendido = parseFloat(mov.crypto_amount) * costoDe1;
            resultadoDeLaVenta = parseFloat(mov.money) - costoDeLoVendido;
            this.resultados.resultadoUsdt += resultadoDeLaVenta;
          }
        }
        if (mov.crypto_code === 'ada') {
          let costoDe1 = 0;
          let costoDeLoVendido = 0;
          let resultadoDeLaVenta = 0;
          if (mov.action === 'purchase') {
            this.resultados.resultadoAda +=
              parseFloat(this.valoresActuales1Ada.totalBid) * parseFloat(mov.crypto_amount) -
              parseFloat(mov.money);
            cantAda += parseFloat(mov.crypto_amount);
            pagueLaCompraAda += parseFloat(mov.money);
          }
          if (mov.action === 'sale') {
            costoDe1 = pagueLaCompraAda / cantAda;
            costoDeLoVendido = parseFloat(mov.crypto_amount) * costoDe1;
            resultadoDeLaVenta = parseFloat(mov.money) - costoDeLoVendido;
            this.resultados.resultadoAda += resultadoDeLaVenta;
          }
        }
      }
    },
    redondearNumero(numero) {
      let numeroRedondeado = parseFloat(numero).toFixed(2);
      return numeroRedondeado;
    },
  },
};
</script>
