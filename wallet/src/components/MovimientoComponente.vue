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
            @click="pasarDatosALectura(movimiento)"
          >
            Leer
          </button>
          <button
            type="button"
            class="btn btn-info btn-sm me-2"
            @click="pasarDatosAEdicion(movimiento)"
          >
            Editar
          </button>
          <button
            type="button"
            class="btn btn-info btn-sm"
            @click="pasarDatosAEliminar(movimiento)"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
    <LecturaComponente
      :estaAbiertoLectura="popupLecturaVisible"
      :movimiento="movimientoSeleccionado"
      @cerrarLectura="popupLecturaVisible = false"
    />
    <EdicionComponente
      :estaAbiertoForm="popupFormVisible"
      :movimiento="movimientoSeleccionado"
      @cerrarEdicion="popupFormVisible = false"
      @modificacionExitosa="actualizarHistorial"
    />
    <EliminarComponente
      :estaAbiertoEliminar="popupEliminarVisible"
      :movimiento="movimientoSeleccionado"
      @cerrarEliminar="popupEliminarVisible = false"
      @eliminacionExitosa="actualizarHistorial"
    />
  </div>
</template>
<script>
import LecturaComponente from '@/components/LecturaComponente.vue';
import EdicionComponente from '@/components/EdicionComponente.vue';
import EliminarComponente from '@/components/EliminarComponente.vue';
import { computadaFormatearFecha } from '@/mixins/computadaFormatearFecha.js';

export default {
  name: 'MovimientoComponente',
  components: {
    LecturaComponente,
    EdicionComponente,
    EliminarComponente,
  },
  mixins: [computadaFormatearFecha],
  props: {
    movimiento: Object,
  },
  data() {
    return {
      movimientoSeleccionado: null,
      popupLecturaVisible: false,
      popupFormVisible: false,
      popupEliminarVisible: false,
    };
  },
  methods: {
    pasarDatosALectura(movimiento) {
      this.movimientoSeleccionado = movimiento;
      this.popupLecturaVisible = true;
    },
    pasarDatosAEdicion(movimiento) {
      this.movimientoSeleccionado = movimiento;
      this.popupFormVisible = true;
    },
    pasarDatosAEliminar(movimiento) {
      this.movimientoSeleccionado = movimiento;
      this.popupEliminarVisible = true;
    },
    actualizarHistorial() {
      this.$emit('actualizar');
    },
  },
};
</script>
