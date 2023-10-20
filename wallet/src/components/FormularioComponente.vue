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
      movimientos: [],
      errores: [],
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
    async enviarForm() {
      //Llevo la lista de errores a cero
      this.errores = [];
      //Valido que los ingresos de cantidad o de precio no tengas coma, de tenerla la cambio a punto
      if (this.motivo === 'editarTransaccion' || this.motivo === 'registrarTransaccion') {
        this.validarPuntos();
      }
      //Si voy a registrar transaccion valido que si quiere vender tenga disponibilidad de esa criptomoneda
      if (this.motivo === 'registrarTransaccion') {
        if (this.movimiento.transaccion === 'sale') {
          await this.validarVentaParaRegistro();
        }
      }
      //Si voy a editar un movimiento valido que si quiere editar una venta tenga disponibilidad de esa cripto
      if (this.motivo === 'editarTransaccion') {
        await this.validarVentaParaEditar();
      }
      //Otras validaciones
      this.validarCamposCompletos();
      this.validarValoresNegativos();
      this.validarFecha();
      //Si hay errores sale de la funcion enviarForm, sino sigue
      if (this.errores.length > 0) {
        let mensaje = 'Errores:\n' + this.errores.join('\n'); // Concatenamos los errores en un solo mensaje
        alert(mensaje);
        return;
      }
      //Si no hubo errores emite metodos de acuerdo a su motivo, si registro o si modifico
      if (this.motivo === 'registrarTransaccion') {
        this.$emit('envioForm', this.movimiento);
      } else if (this.motivo === 'editarTransaccion') {
        this.$emit('modificar', this.movimientoId, this.modificaciones);
      }
    },
    validarPuntos() {
      if (this.movimiento.cantidad.includes(',')) {
        this.movimiento.cantidad = this.movimiento.cantidad.replace(',', '.');
      }
      if (this.movimiento.precio.includes('.')) {
        this.movimiento.precio = this.movimiento.precio.replace(',', '.');
      }
    },
    async validarVentaParaRegistro() {
      let compras = 0;
      let ventas = 0;
      try {
        let respuesta = await Consultas.recuperarTransacciones();
        this.movimientos = respuesta.data;

        for (let mov of this.movimientos) {
          if (this.movimiento.cripto === mov.crypto_code) {
            if (mov.action === 'purchase') {
              compras += parseFloat(mov.crypto_amount);
            } else if (mov.action === 'sale') {
              ventas += parseFloat(mov.crypto_amount);
            }
          }
        }
        let diferencia = compras - ventas;

        if (diferencia > 0 && diferencia < parseFloat(this.movimiento.cantidad)) {
          this.errores.push(
            'Solo tiene ' + diferencia + ' ' + this.movimiento.cripto + ' para vender'
          );
        } else if (diferencia <= 0) {
          this.errores.push('No tiene ' + this.movimiento.cripto + ' para vender');
        }
      } catch (error) {
        console.error('Error al recuperar las transacciones:', error);
      }
    },
    async validarVentaParaEditar() {
      let compras = 0;
      let ventas = 0;
      let diferencia = 0;
      try {
        let respuesta = await Consultas.recuperarTransacciones();
        this.movimientos = respuesta.data;
        //Primero calculo el total de compras y ventas sin considerar la transacción que se esta editando
        for (let mov of this.movimientos) {
          if (this.movimiento.cripto === mov.crypto_code) {
            if (mov.action === 'purchase') {
              compras += parseFloat(mov.crypto_amount);
            } else if (mov.action === 'sale') {
              ventas += parseFloat(mov.crypto_amount);
            }
          }
        }
        for (let mov of this.movimientos) {
          if (mov._id === this.movimientoId) {
            // Si la cantidad se modificó y si la transaccion era venta y no se modifico
            if (
              this.modificaciones['crypto_amount'] !== undefined &&
              this.modificaciones['action'] === undefined &&
              this.movimiento.transaccion === 'sale'
            ) {
              console.log(this.movimiento.cantidad);
              console.log(mov.crypto_amount);
              if (this.movimiento.cantidad > mov.crypto_amount) {
                ventas += parseFloat(this.movimiento.cantidad) - parseFloat(mov.crypto_amount);
                diferencia = compras - ventas;
              }
            }
            //Si la cantidad se modifico y a su vez se modifico el tipo de transaccion de compra a venta
            if (
              this.modificaciones['crypto_amount'] !== undefined &&
              this.modificaciones['action'] === 'sale'
            ) {
              compras -= mov.crypto_amount;
              ventas += this.movimiento.cantidad;
              diferencia = compras - ventas;
            }
            //Si la cantidad no se modifico pero se modifico el tipo de transaccion de compra a venta
            if (
              this.modificaciones['crypto_amount'] === undefined &&
              this.modificaciones['action'] === 'sale'
            ) {
              compras -= this.movimiento.cantidad;
              ventas += this.movimiento.cantidad;
              diferencia = compras - ventas;
            }
          }
        }
        if (diferencia > 0 && diferencia < parseFloat(this.movimiento.cantidad)) {
          this.errores.push(
            'Solo tiene ' + diferencia + ' ' + this.movimiento.cripto + ' para vender'
          );
        } else if (diferencia < 0) {
          this.errores.push('No tiene ' + this.movimiento.cripto + ' para vender');
        }
      } catch (error) {
        console.error('Error al recuperar las transacciones:', error);
      }
    },
    validarCamposCompletos() {
      for (let campo in this.movimiento) {
        if (this.movimiento[campo] === '') {
          this.errores.push('Debe completar el campo ' + campo);
        }
      }
    },
    validarValoresNegativos() {
      if (this.movimiento.cantidad < 0 || this.movimiento.precio < 0) {
        this.errores.push('Datos incorrectos, no se permiten valores negativos');
      }
    },
    validarFecha() {
      let fechaActual = new Date();
      let fechaIngresada = new Date(this.movimiento.fecha);
      if (fechaIngresada > fechaActual) {
        this.errores.push('Fecha incorrecta');
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
