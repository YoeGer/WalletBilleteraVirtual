<template>
  <div>
    <h3 class="text-center">Estado actual de sus activos</h3>
    <br />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <table class="table">
            <thead>
              <tr>
                <th>Criptomoneda</th>
                <th>Cantidad</th>
                <th>Dinero</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="criptos.btc.cantidad > 0">
                <td>BITCOIN</td>
                <td>{{ criptos.btc.cantidad }}</td>
                <td>${{ redondearNumero(criptos.btc.dinero) }}</td>
              </tr>
              <tr v-if="criptos.eth.cantidad > 0">
                <td>ETHEREUM</td>
                <td>{{ criptos.eth.cantidad }}</td>
                <td>${{ redondearNumero(criptos.eth.dinero) }}</td>
              </tr>
              <tr v-if="criptos.usdt.cantidad > 0">
                <td>USDT</td>
                <td>{{ criptos.usdt.cantidad }}</td>
                <td>${{ redondearNumero(criptos.usdt.dinero) }}</td>
              </tr>
              <tr v-if="criptos.ada.cantidad > 0">
                <td>ADA</td>
                <td>{{ criptos.ada.cantidad }}</td>
                <td>${{ redondearNumero(criptos.ada.dinero) }}</td>
              </tr>
              <tr v-if="totalDinero > 0">
                <td><strong>TOTAL</strong></td>
                <td></td>
                <td>
                  <strong>${{ redondearNumero(totalDinero) }}</strong>
                </td>
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
  name: 'EstadoVista',
  data() {
    return {
      movimientos: [],
      movimientosBtc: [],
      movimientosEth: [],
      movimientosUsdt: [],
      movimientosAda: [],
      cantBtc: 0,
      cantEth: 0,
      cantUsdt: 0,
      cantAda: 0,
      valoresActuales1Btc: {},
      valoresActuales1Eth: {},
      valoresActuales1Usdt: {},
      valoresActuales1Ada: {},
      criptos: {
        btc: {
          cantidad: 0,
          dinero: null,
        },
        eth: {
          cantidad: 0,
          dinero: null,
        },
        usdt: {
          cantidad: 0,
          dinero: null,
        },
        ada: {
          cantidad: 0,
          dinero: null,
        },
      },
      totalDinero: null,
    };
  },
  async created() {
    try {
      let respuesta = await Consultas.recuperarTransacciones();
      this.movimientos = respuesta.data;
      this.clasificarMovimientosPorCripto();
      await this.obtenerValoresActuales();
      this.calcularTotalCantidadPorCripto();
      this.calculoDeDineroPorCripto();
      this.calculoTotalDinero();
    } catch (error) {
      console.error('Error al recuperar las transacciones:', error);
    }
  },
  methods: {
    clasificarMovimientosPorCripto() {
      for (let mov of this.movimientos) {
        if (mov.crypto_code === 'btc') {
          this.movimientosBtc.push(mov);
        }
        if (mov.crypto_code === 'eth') {
          this.movimientosEth.push(mov);
        }
        if (mov.crypto_code === 'usdt') {
          this.movimientosUsdt.push(mov);
        }
        if (mov.crypto_code === 'ada') {
          this.movimientosAda.push(mov);
        }
      }
    },
    calcularTotalCantidadPorCripto() {
      for (let mov of this.movimientosBtc) {
        if (mov.action === 'purchase') {
          this.cantBtc += parseFloat(mov.crypto_amount);
        } else {
          this.cantBtc -= parseFloat(mov.crypto_amount);
        }
      }
      for (let mov of this.movimientosEth) {
        if (mov.action === 'purchase') {
          this.cantEth += parseFloat(mov.crypto_amount);
        } else {
          this.cantEth -= parseFloat(mov.crypto_amount);
        }
      }
      for (let mov of this.movimientosUsdt) {
        if (mov.action === 'purchase') {
          this.cantUsdt += parseFloat(mov.crypto_amount);
        } else {
          this.cantUsdt -= parseFloat(mov.crypto_amount);
        }
      }
      for (let mov of this.movimientosAda) {
        if (mov.action === 'purchase') {
          this.cantAda += parseFloat(mov.crypto_amount);
        } else {
          this.cantAda -= parseFloat(mov.crypto_amount);
        }
      }
    },
    async obtenerValoresActuales() {
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
    },
    calculoDeDineroPorCripto() {
      if (this.cantBtc > 0) {
        this.criptos.btc.cantidad = this.cantBtc;
        this.criptos.btc.dinero =
          parseFloat(this.criptos.btc.cantidad) * parseFloat(this.valoresActuales1Btc.totalBid);
      }
      if (this.cantEth > 0) {
        this.criptos.eth.cantidad = this.cantEth;
        this.criptos.eth.dinero =
          parseFloat(this.criptos.eth.cantidad) * parseFloat(this.valoresActuales1Eth.totalBid);
      }
      if (this.cantUsdt > 0) {
        this.criptos.usdt.cantidad = this.cantUsdt;
        this.criptos.usdt.dinero =
          parseFloat(this.criptos.usdt.cantidad) * parseFloat(this.valoresActuales1Usdt.totalBid);
      }
      if (this.cantAda > 0) {
        this.criptos.ada.cantidad = this.cantAda;
        this.criptos.ada.dinero =
          parseFloat(this.criptos.ada.cantidad) * parseFloat(this.valoresActuales1Ada.totalBid);
      }
    },
    calculoTotalDinero() {
      if (this.criptos.btc.dinero > 0) {
        this.totalDinero += parseFloat(this.criptos.btc.dinero);
      }
      if (this.criptos.eth.dinero > 0) {
        this.totalDinero += parseFloat(this.criptos.eth.dinero);
      }
      if (this.criptos.usdt.dinero > 0) {
        this.totalDinero += parseFloat(this.criptos.usdt.dinero);
      }
      if (this.criptos.ada.dinero > 0) {
        this.totalDinero += parseFloat(this.criptos.ada.dinero);
      }
    },
    redondearNumero(numero) {
      let numeroRedondeado = parseFloat(numero).toFixed(2);
      return numeroRedondeado;
    },
  },
};
</script>
<style></style>
