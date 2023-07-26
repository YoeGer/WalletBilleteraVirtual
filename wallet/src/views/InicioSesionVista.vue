<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <form>
        <img
          class="mb-4 img-fluid"
          src="../assets/logo-wallet.png"
          id="logoGrande"
        />
        <div class="mb-3">
          <label class="form-label">
            Ingrese su nombre de usuario para comenzar
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="ayudaNombre"
          />
          <div id="ayudaNombre" class="form-text">
            El nombre debe tener 10 caracteres alfanumericos.
          </div>
        </div>
        <button type="submit" class="btn btn-info">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "InicioSesionVista",
};
</script>

<style>
#logoGrande {
  width: 400px;
}
</style>
