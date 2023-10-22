<template>
  <div>
    <h2 class="mt-4 ms-4">Bienvenido.</h2>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h4>¿Dónde comprar o vender?</h4>
          <br />
          <form @submit.prevent>
            <label class="mb-1">Selecciona la criptomoneda</label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="cripto"
              v-model="cripto"
            >
              <option value="btc">BITCOIN</option>
              <option value="eth">ETHEREUM</option>
              <option value="usdt">USDT</option>
              <option value="ada">ADA</option>
            </select>
            <br />
            <label class="mb-1">Selecciona el tipo de transaccion</label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="transaccion"
              v-model="tipoTransaccion"
            >
              <option value="purchase">Compra</option>
              <option value="sale">Venta</option>
            </select>
            <br />
            <button type="submit" class="btn btn-info btn-sm me-2" @click="buscar">Buscar</button>
          </form>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="d-flex justify-content-center">
      <div class="table-responsive" style="max-width: 400px">
        <h5
          v-if="mejorExchange != null"
          style="text-align: center; font-size: 1.5rem; font-weight: bold"
        >
          Mejor exchange para
          {{ tipoTransaccion === 'purchase' ? 'comprar ' + cripto : 'vender ' + cripto }}
        </h5>
        <table class="table" v-if="mejorExchange != null">
          <thead>
            <tr>
              <th>Exchange</th>
              <th>Precio de Compra</th>
              <th>Precio de Venta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ mejorExchange.exchange }}</td>
              <td>{{ mejorExchange.precioCompra }}</td>
              <td>{{ mejorExchange.precioVenta }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import ConsultasCripto from '@/servicios/ConsultasCripto.js';

export default {
  name: 'InicioVista',
  data() {
    return {
      cripto: '',
      tipoTransaccion: '',
      exchanges: [
        'argenbtc',
        'astropay',
        'belo',
        'binance',
        'bitmonedero',
        'bitsoalpha',
        'buenbit',
        'bybit',
        'calypso',
        'copter',
        'cryptomkt',
        'decrypto',
        'eluter',
        'fiwind',
        'kriptonmarket',
        'latamex',
        'lemoncash',
        'letsbit',
        'pluscrypto',
        'ripio',
        'ripioexchange',
        'saldo',
        'satoshitango',
        'tiendacrypto',
        'trubit',
      ],
      mejorExchange: null,
    };
  },
  computed: {
    user_id() {
      return this.$store.state.user_id;
    },
  },
  methods: {
    async buscar() {
      this.mejorExchange = null;
      for (let exchange of this.exchanges) {
        try {
          let respuesta = await ConsultasCripto.consultarCripto(
            exchange,
            this.cripto.toUpperCase(),
            'ARS',
            1
          );
          let totalBid = respuesta.data.totalBid;
          let totalAsk = respuesta.data.totalAsk;
          if (totalBid !== undefined && totalAsk !== undefined) {
            if (this.mejorExchange === null) {
              this.mejorExchange = {
                exchange,
                precioVenta: totalBid,
                precioCompra: totalAsk,
              };
            } else {
              if (this.tipoTransaccion === 'sale') {
                if (totalBid > this.mejorExchange.precioVenta) {
                  this.mejorExchange = {
                    exchange,
                    precioVenta: totalBid,
                    precioCompra: totalAsk,
                  };
                }
              } else if (this.tipoTransaccion === 'purchase') {
                if (totalAsk < this.mejorExchange.precioCompra) {
                  this.mejorExchange = {
                    exchange,
                    precioVenta: totalBid,
                    precioCompra: totalAsk,
                  };
                }
              }
            }
          }
        } catch (error) {
          console.error('Error en la solicitud a la API de criptomonedas:', error);
        }
      }
    },
  },
};
</script>
