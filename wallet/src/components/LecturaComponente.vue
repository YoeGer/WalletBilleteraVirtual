<template>
  <div class="popup-overlay" v-if="estaAbierto">
    <div class="popup-container">
      <div class="popup-content">
        <h2>Detalle</h2>
        <div>
          <strong>Tipo de transacción:</strong>
          {{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}
        </div>
        <div><strong>Tipo de criptomoneda:</strong> {{ movimiento.crypto_code }}</div>
        <div><strong>Cantidad:</strong> {{ movimiento.crypto_amount }}</div>
        <div><strong>Precio:</strong> ${{ movimiento.money }}</div>
        <div><strong>Fecha y hora:</strong> {{ formatearFecha }}</div>
        <button @click="cerrarPopup" class="close-button btn btn-info">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computadaFormatearFecha } from '@/mixins/computadaFormatearFecha.js';
export default {
  name: 'PopupComponent',
  props: {
    estaAbierto: Boolean,
    movimiento: Object,
  },
  mixins: [computadaFormatearFecha],
  methods: {
    cerrarPopup() {
      this.$emit('cerrar');
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
