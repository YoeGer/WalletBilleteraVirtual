<template>
  <div>
    <h3 class="text-center">Formulario para registro de transaccion</h3>
    <FormularioComponente
      :motivo="motivoForm"
      :movimiento="movimiento"
      @envioForm="registrarTransaccion"
    />
  </div>
</template>

<script>
import Consultas from '@/servicios/Consultas.js';
import FormularioComponente from '@/components/FormularioComponente.vue';
import routes from '@/router/index.js';
import { mapState } from 'vuex';
export default {
  name: 'RegistroVista',
  components: {
    FormularioComponente,
  },
  data() {
    return {
      movimiento: {
        transaccion: '',
        cripto: '',
        cantidad: '',
        precio: '',
        fecha: '',
        hora: '',
      },
      motivoForm: 'registrarTransaccion',
      popupFormVisible: false,
    };
  },
  computed: {
    ...mapState(['user_id']),
  },
  methods: {
    registrarTransaccion(movimiento) {
      Consultas.guardarTransacciones({
        user_id: this.user_id,
        action: movimiento.transaccion,
        crypto_code: movimiento.cripto,
        crypto_amount: movimiento.cantidad.toString(),
        money: movimiento.precio.toString(),
        datetime: movimiento.fecha + ' ' + movimiento.hora,
      })
        .then((respuesta) => {
          alert('Transaccion registrada con exito');
          console.log(respuesta);
          movimiento = {
            transaccion: '',
            cripto: '',
            cantidad: '',
            precio: '',
            fecha: '',
            hora: '',
          };
          routes.push('/historial');
        })
        .catch((error) => {
          alert('No se pudo registrar la transaccion');
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
