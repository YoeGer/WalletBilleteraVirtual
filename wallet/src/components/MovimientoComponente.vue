<template>
  <div class="container-fluid">
    <div class="row m-3 ms-2">
      <div class="col">{{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</div>
      <div class="col">{{ movimiento.crypto_code }}</div>
      <div class="col">{{ movimiento.crypto_amount }}</div>
      <div class="col">${{ movimiento.money }}</div>
      <div class="col">{{ formatearFecha }}</div>
      <div class="col">
        <button type="submit" class="btn btn-info btn-sm me-2">Leer</button>
        <button type="submit" class="btn btn-info btn-sm me-2">Editar</button>
        <button type="submit" class="btn btn-info btn-sm">Eliminar</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MovimientoComponente',
  props: {
    movimiento: Object,
  },
  computed: {
    //En la Api se guarda la hora en formato UTC, si no la formateo, cuando la recupero me lo hace con mi zona horaria y la cambia
    formatearFecha() {
      let opciones = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      };
      let fechaYHoraUTC = new Date(this.movimiento.datetime);
      return fechaYHoraUTC.toLocaleString('es-ES', opciones);
    },
  },
};
</script>
