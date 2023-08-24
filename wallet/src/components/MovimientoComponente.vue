<template>
  <div>
    <div class="container-fluid">
      <div class="row m-3 ms-2">
        <div class="col">{{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</div>
        <div class="col">{{ movimiento.crypto_code }}</div>
        <div class="col">{{ movimiento.crypto_amount }}</div>
        <div class="col">${{ movimiento.money }}</div>
        <div class="col">{{ formatearFecha }}</div>
        <div class="col">
          <button
            type="button"
            class="btn btn-info btn-sm me-2"
            @click="pasarMovimiento(movimiento)"
          >
            Leer
          </button>
          <button type="button" class="btn btn-info btn-sm me-2">Editar</button>
          <button type="button" class="btn btn-info btn-sm">Eliminar</button>
        </div>
      </div>
    </div>
    <LecturaComponente
      :estaAbierto="popupVisible"
      :movimiento="movimientoSeleccionado"
      @cerrar="popupVisible = false"
    />
  </div>
</template>
<script>
import LecturaComponente from '@/components/LecturaComponente.vue';
import { computadaFormatearFecha } from '@/mixins/computadaFormatearFecha.js';
export default {
  name: 'MovimientoComponente',
  components: {
    LecturaComponente,
  },
  mixins: [computadaFormatearFecha],
  props: {
    movimiento: Object,
  },
  data() {
    return {
      movimientoSeleccionado: null,
      popupVisible: false,
    };
  },
  methods: {
    pasarMovimiento(movimiento) {
      this.movimientoSeleccionado = movimiento;
      this.popupVisible = true;
    },
  },
};
</script>
