<template>
  <div class="container-fluid">
    <div class="row m-3 ms-2">
      <div class="col">Tipo de transacción</div>
      <div class="col">Criptomoneda</div>
      <div class="col">Cantidad</div>
      <div class="col">Precio</div>
      <div class="col">Fecha y hora</div>
      <div class="col"></div>
    </div>
    <MovimientoComponente
      v-for="movimiento in movimientos"
      :key="movimiento.user_id"
      :movimiento="movimiento"
    />
  </div>
</template>
<script>
import MovimientoComponente from '@/components/MovimientoComponente.vue';
import Consultas from '@/servicios/Consultas.js';
export default {
  name: 'HistorialVista',
  components: {
    MovimientoComponente,
  },
  data() {
    return {
      movimientos: null,
    };
  },
  created() {
    Consultas.recuperarTransacciones().then((respuesta) => {
      this.movimientos = respuesta.data;
    });
  },
};
</script>
<style></style>
