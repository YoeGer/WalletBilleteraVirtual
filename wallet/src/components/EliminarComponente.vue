<template>
  <div class="popup-overlay" v-if="estaAbiertoEliminar">
    <div class="popup-container">
      <div class="popup-content">
        <h3>¿Esta seguro que desea eliminar esta transaccion?</h3>
        <div>
          <strong>Tipo de transacción:</strong>
          {{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}
        </div>
        <div class="my-2"><strong>Tipo de criptomoneda:</strong> {{ movimiento.crypto_code }}</div>
        <div class="my-2"><strong>Cantidad:</strong> {{ movimiento.crypto_amount }}</div>
        <div class="my-2"><strong>Precio:</strong> ${{ movimiento.money }}</div>
        <div class="my-2"><strong>Fecha y hora:</strong> {{ formatearFecha }}</div>
        <button type="submit" class="btn btn-info btn-sm me-2" @click="eliminarMovimiento">
          Eliminar
        </button>
        <button type="submit" class="btn btn-info btn-sm me-2" @click="cancelarEliminar">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { computadaFormatearFecha } from '@/mixins/computadaFormatearFecha.js';
import Consultas from '@/servicios/Consultas.js';
export default {
  name: 'EdicionComponente',
  mixins: [computadaFormatearFecha],
  props: {
    estaAbiertoEliminar: Boolean,
    movimiento: Object,
  },
  data() {
    return {
      motivoForm: 'editarTransaccion',
    };
  },
  methods: {
    eliminarMovimiento() {
      Consultas.eliminarTransaccion(this.movimiento._id)
        .then((respuesta) => {
          console.log(respuesta);
          alert('Transacción eliminada');
          this.$emit('eliminacionExitosa');
          this.$emit('cerrarEliminar');
        })
        .catch((error) => {
          alert('No se pudo eliminar la transacción');
          console.log(error);
        });
    },
    cancelarEliminar() {
      this.$emit('cerrarEliminar');
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.close-button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
