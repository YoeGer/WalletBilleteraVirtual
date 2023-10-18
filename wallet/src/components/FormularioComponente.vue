<template>
  <div class="row justify-content-center" v-if="movimiento">
    <div class="col-6">
      <form @submit.prevent>
        <!--Prevent: modificador que previene el comportamiento por defecto del nav de refrescar-->
        <br />
        <label class="mb-1">Selecciona el tipo de transaccion</label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="transaccion"
          v-model="movimiento.transaccion"
          @change="marcarCambio('transaccion')"
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
          v-model="movimiento.cripto"
          @change="marcarCambio('cripto')"
        >
          <option value="btc">BITCOIN</option>
          <option value="eth">ETHEREUM</option>
          <option value="usdt">USDT</option>
          <option value="ada">ADA</option>
        </select>
        <br />
        <label class="mb-1">Cantidad</label>
        <input
          type="text"
          class="form-control"
          id="cantidad"
          v-model="movimiento.cantidad"
          @input="marcarCambio('cantidad')"
        />
        <br />
        <label class="mb-1">Precio</label>
        <input
          type="text"
          class="form-control"
          id="precio"
          v-model="movimiento.precio"
          @input="marcarCambio('precio')"
        />
        <br />
        <label class="mb-1">Fecha</label>
        <br />
        <input
          type="date"
          name="fecha"
          class="form-control"
          id="fecha"
          v-model="movimiento.fecha"
          @input="marcarCambio('fecha')"
        />
        <br />
        <label class="mb-1">Hora</label>
        <br />
        <input
          type="time"
          name="hora"
          class="form-control"
          id="hora"
          v-model="movimiento.hora"
          @input="marcarCambio('hora')"
        />
        <br />
        <button type="submit" class="btn btn-info btn-sm me-2" @click="enviarForm">
          {{ motivo === 'registrarTransaccion' ? 'Registrar transaccion' : 'Guardar cambios' }}
        </button>
        <button
          type="submit"
          class="btn btn-info btn-sm me-2"
          v-if="motivo === 'editarTransaccion'"
          @click="cancelarEdicion"
        >
          Cancelar
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import Consultas from '@/servicios/Consultas.js';
import { computadaFormatearFecha } from '@/mixins/computadaFormatearFecha.js';
export default {
  name: 'FormularioComponente',
  props: {
    movimientoId: String,
    motivo: String,
  },
  mixins: [computadaFormatearFecha],
  data() {
    return {
      movimiento: {
        //Lo guardo en un nuevo objeto para poder editarlo
        transaccion: '',
        cripto: '',
        cantidad: '',
        precio: '',
        fecha: '',
        hora: '',
      },
      modificaciones: {},
    };
  },
  created() {
    if (this.motivo === 'editarTransaccion') {
      Consultas.recuperarTransaccion(this.movimientoId)
        .then((respuesta) => {
          this.movimiento.transaccion = respuesta.data.action;
          this.movimiento.cripto = respuesta.data.crypto_code;
          this.movimiento.cantidad = respuesta.data.crypto_amount;
          this.movimiento.precio = respuesta.data.money;
          let fechaAPI = new Date(respuesta.data.datetime);
          this.movimiento.fecha = fechaAPI.toISOString().split('T')[0];
          let fechaYHoraUTC = new Date(respuesta.data.datetime);
          this.movimiento.hora = fechaYHoraUTC.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC', // Asegura que la hora se muestre en UTC
          });
        })
        .catch((error) => {
          console.error('Error al recuperar la transaccion: ', error);
        });
    }
  },
  methods: {
    enviarForm() {
      //primero hago las validaciones
      let fechaActual = new Date();
      let fechaIngresada = new Date(this.movimiento.fecha);
      if (
        this.movimiento.transaccion === '' ||
        this.movimiento.cripto === '' ||
        this.movimiento.fecha === '' ||
        this.movimiento.cantidad === '' ||
        this.movimiento.precio === '' ||
        this.movimiento.hora === ''
      ) {
        alert('Debe completar todos los campos para poder registrar la operacion');
      } else if (this.movimiento.cantidad < 0 || this.movimiento.precio < 0) {
        alert('Datos incorrectos');
      } else if (fechaIngresada > fechaActual) {
        alert('Fecha incorrecta');
      } else if (this.motivo === 'registrarTransaccion') {
        //Si esta todo ok y vino por registro le envio el movimiento para registrarlo
        this.$emit('envioForm', this.movimiento);
      } else if (this.motivo === 'editarTransaccion') {
        //Si esta todo ok y vino por modificacion le envio el id y las modificaciones
        this.$emit('modificar', this.movimientoId, this.modificaciones);
      }
    },
    marcarCambio(campo) {
      if (campo === 'transaccion') {
        let nuevoValor = this.movimiento[campo];
        //Cada vez que se detecta un cambio viene aca y guarda el cambio dentro de las modificaciones como clave valor (campo nuevo valor)
        campo = 'action';
        this.modificaciones[campo] = nuevoValor;
      }
      if (campo === 'cripto') {
        let nuevoValor = this.movimiento[campo];
        campo = 'crypto_code';
        this.modificaciones[campo] = nuevoValor;
      }
      if (campo === 'cantidad') {
        let nuevoValor = this.movimiento[campo];
        campo = 'crypto_amount';
        this.modificaciones[campo] = nuevoValor;
      }
      if (campo === 'precio') {
        let nuevoValor = this.movimiento[campo];
        campo = 'money';
        this.modificaciones[campo] = nuevoValor;
      }
      if (campo === 'fecha') {
        let nuevoValor = this.movimiento[campo];
        campo = 'datetime';
        this.modificaciones[campo] = nuevoValor + ' ' + this.movimiento.hora;
      }
      if (campo === 'hora') {
        let nuevoValor = this.movimiento[campo];
        campo = 'datetime';
        this.modificaciones[campo] = this.movimiento.fecha + ' ' + nuevoValor;
      }
    },
    cancelarEdicion() {
      this.$emit('cancelarEdicion');
    },
  },
};
</script>
