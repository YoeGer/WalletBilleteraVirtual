<template>
  <div class="container-fluid">
    <div class="row m-3 ms-2">
      <div class="col">{{ movimiento.action }}</div>
      <div class="col">{{ movimiento.crypto_code }}</div>
      <div class="col">{{ movimiento.crypto_amount }}</div>
      <div class="col">{{ movimiento.money }}</div>
      <div class="col">Fecha y hora</div>
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
  name: "MovimientoComponente",
  props: {
    movimiento: Object,
  },
};
</script>
