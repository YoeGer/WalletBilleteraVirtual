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
      transaccion: null,
      cripto: null,
      cantidad: '',
      precio: '',
      fecha: null,
      hora: null,
    };
  },
  methods: {
    envioForm() {
      if (
        this.transaccion === null ||
        this.cripto === null ||
        this.fecha === null ||
        this.hora === null ||
        this.cantidad === '' ||
        this.precio === ''
      ) {
        alert('Debe completar todos los campos para poder registrar la operacion');
        return;
      }
      if (this.cantidad < 0 || this.precio < 0) {
        alert('Datos incorrectos');
        return;
      }
      let fechaActual = new Date();
      let fechaIngresada = new Date(this.fecha);

      if (fechaIngresada > fechaActual) {
        alert('Fecha incorrecta');
        return;
      }
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
          this.transaccion = null;
          this.cripto = null;
          this.cantidad = '';
          this.precio = '';
          this.fecha = null;
          this.hora = null;
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
