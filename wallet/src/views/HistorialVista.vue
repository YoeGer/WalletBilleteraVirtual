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
    <div v-for="movimiento in movimientos" :key="movimiento._id">
      <MovimientoComponente :movimiento="movimiento" />
    </div>
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
      movimientos: [],
    };
  },
  created() {
    Consultas.recuperarTransacciones()
      .then((respuesta) => {
        this.movimientos = respuesta.data;
      })
      .catch((error) => {
        console.error('Error al recuperar las transacciones:', error);
      });
  },
};
</script>
<style></style>
