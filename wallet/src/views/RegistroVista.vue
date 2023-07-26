<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <form>
        <h5 class="text-muted">
          Formulario para el registro de una transacción
        </h5>
        <br />
        <select class="form-select" aria-label="Default select example">
          <option selected>Selecciona el tipo de transacción</option>
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>
        <br />
        <select class="form-select" aria-label="Default select example">
          <option selected>Selecciona la criptomoneda</option>
          <option value="BITCOIN">BITCOIN</option>
          <option value="ETHEREUM">ETHEREUM</option>
          <option value="USDT">USDT</option>
          <option value="ADA">ADA</option>
        </select>
        <br />
        <label>Cantidad</label>
        <input type="text" class="form-control" placeholder="0.00" />
        <br />
        <label>Precio</label>
        <input type="text" class="form-control" placeholder="0.00" />
        <br />
        <label>Fecha</label>
        <br />
        <input type="date" name="fecha" class="form-control" />
        <br />
        <br />
        <label>Hora</label>
        <br />
        <input type="time" name="hora" class="form-control" />
        <br />
        <br />
        <button type="submit" class="btn btn-info">
          Registrar transacción
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovimientosVista",
};
</script>

<style></style>
