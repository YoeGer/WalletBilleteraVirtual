<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <form @submit.prevent>
        <!--Prevent: modificador que previene el comportamiento por defecto del nav de refrescar-->
        <h5 class="text-muted">Formulario para el registro de una transacción</h5>
        <br />
        <label class="mb-1">Selecciona el tipo de transaccion</label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="transaccion"
          v-model="transaccion"
        >
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>
        <br />
        <label class="mb-1">Selecciona la criptomoneda</label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="cripto"
          v-model="cripto"
        >
          <option value="btc">BITCOIN</option>
          <option value="eth">ETHEREUM</option>
          <option value="usdt">USDT</option>
          <option value="ada">ADA</option>
        </select>
        <br />
        <label class="mb-1">Cantidad</label>
        <input type="text" class="form-control" id="cantidad" v-model="cantidad" />
        <br />
        <label class="mb-1">Precio</label>
        <input type="text" class="form-control" id="precio" v-model="precio" />
        <br />
        <label class="mb-1">Fecha</label>
        <br />
        <input type="date" name="fecha" class="form-control" id="fecha" v-model="fecha" />
        <br />
        <label class="mb-1">Hora</label>
        <br />
        <input type="time" name="hora" class="form-control" id="hora" v-model="hora" />
        <br />
        <button type="submit" class="btn btn-info" @click="envioForm">Registrar transacción</button>
      </form>
    </div>
  </div>
</template>

<script>
import Consultas from '@/servicios/Consultas.js';
export default {
  name: 'RegistroVista',
  data() {
    return {
      transaccion: '',
      cripto: '',
      cantidad: '',
      precio: '',
      fecha: '',
      hora: '',
    };
  },
  methods: {
    validarDatosForm() {
      if (
        this.transaccion === '' ||
        this.cripto === '' ||
        this.fecha === '' ||
        this.cantidad === '' ||
        this.precio === '' ||
        this.hora === ''
      ) {
        alert('Debe completar todos los campos para poder registrar la operacion');
        return false;
      }
      if (this.cantidad < 0 || this.precio < 0) {
        alert('Datos incorrectos');
        return false;
      }
      let fechaActual = new Date();
      let fechaIngresada = new Date(this.fecha);
      if (fechaIngresada > fechaActual) {
        alert('Fecha incorrecta');
        return false;
      }
      return true;
    },
    envioForm() {
      if (this.validarDatosForm()) {
        Consultas.guardarTransacciones({
          user_id: 'Yoana',
          action: this.transaccion,
          crypto_code: this.cripto,
          crypto_amount: this.cantidad.toString(),
          money: this.precio.toString(),
          datetime: this.fecha + ' ' + this.hora,
        })
          .then((respuesta) => {
            alert('Transaccion registrada con exito');
            console.log(respuesta);
            this.transaccion = '';
            this.cripto = '';
            this.cantidad = '';
            this.precio = '';
            this.fecha = '';
            this.hora = '';
          })
          .catch((error) => {
            alert('No se pudo registrar la transaccion');
            console.log(error);
          });
      }
    },
  },
};
</script>

<style></style>
