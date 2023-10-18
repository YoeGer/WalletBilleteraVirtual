<template>
  <div class="popup-overlay" v-if="estaAbiertoForm">
    <div class="popup-container">
      <div class="popup-content">
        <h3>Formulario para edicion de transaccion</h3>
        <FormularioComponente
          :key="movimiento._id"
          :motivo="motivoForm"
          :movimientoId="movimiento._id"
          @modificar="modificarMovimiento"
          @cancelarEdicion="cancelarEdicion"
        />
      </div>
    </div>
  </div>
</template>
<script>
import FormularioComponente from '@/components/FormularioComponente.vue';
import Consultas from '@/servicios/Consultas.js';
export default {
  name: 'EdicionComponente',
  components: {
    FormularioComponente,
  },
  props: {
    estaAbiertoForm: Boolean,
    movimiento: Object,
  },
  data() {
    return {
      motivoForm: 'editarTransaccion',
    };
  },
  methods: {
    modificarMovimiento(movimientoId, modificaciones) {
      console.log(movimientoId, modificaciones);
      Consultas.actualizarTransaccion(movimientoId, modificaciones)
        .then((respuesta) => {
          alert('Transacción modificada con éxito');
          console.log(respuesta);
          this.$emit('modificacionExitosa');
          this.$emit('cerrarEdicion');
        })
        .catch((error) => {
          alert('No se pudo modificar la transacción');
          console.log(error);
        });
    },
    cancelarEdicion() {
      this.$emit('cerrarEdicion');
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
