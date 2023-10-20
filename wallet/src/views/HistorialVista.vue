<template>
  <div>
    <h3 class="text-center">Historial de sus transacciones</h3>
    <br />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <th>Tipo de transacción</th>
                <th>Criptomoneda</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Fecha y hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <MovimientoComponente
                v-for="movimiento in movimientos"
                :key="movimiento._id"
                :movimiento="movimiento"
                @actualizar="actualizar"
              />
            </tbody>
          </table>
        </div>
      </div>
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
    this.actualizar();
  },
  methods: {
    actualizar() {
      Consultas.recuperarTransacciones()
        .then((respuesta) => {
          this.movimientos = respuesta.data;
        })
        .catch((error) => {
          console.error('Error al recuperar las transacciones:', error);
        });
    },
  },
};
</script>
<style></style>
