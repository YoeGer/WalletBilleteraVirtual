<template>
  <div class="row justify-content-center" v-if="user_id === ''">
    <div class="col-4">
      <form>
        <img class="mb-4 img-fluid" src="../assets/logo-wallet.png" id="logoGrande" />
        <div class="mb-3">
          <label class="form-label"> Ingrese su nombre de usuario para comenzar </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="ayudaNombre"
            v-model="user_idIngresado"
          />
          <div id="ayudaNombre" class="form-text">Debe tener 10 caracteres alfanumericos</div>
        </div>
        <button type="submit" class="btn btn-info" @click="ingresar">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
import routes from '@/router/index.js';
export default {
  name: 'InicioSesionVista',
  data() {
    return {
      user_idIngresado: '',
      sesionIniciada: false,
    };
  },
  computed: {
    user_id() {
      return this.$store.state.user_id;
    },
  },
  methods: {
    ingresar() {
      if (!this.esAlfanumericoConLetraYNumero(this.user_idIngresado)) {
        alert(
          'Nombre de usuario incorrecto. Debe ser alfanumerico y tener como minimo 10 caracteres'
        );
      } else {
        this.$store.commit('establecerId', this.user_idIngresado);
        this.sesionIniciada = true;
        routes.push('/inicio');
      }
    },
    esAlfanumericoConLetraYNumero(cadena) {
      const regex = /(?=.*[a-zA-Z])(?=.*[0-9])/;
      return cadena.length >= 10 && regex.test(cadena);
    },
  },
};
</script>

<style>
#logoGrande {
  width: 400px;
}
</style>
