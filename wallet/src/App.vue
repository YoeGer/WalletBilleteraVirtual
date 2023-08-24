<template>
  <nav class="container-fluid navbar navbar-expand-sm text-muted justify-content-between">
    <router-link to="/inicio">
      <img id="logo" class="mt-1 m-3" src="../src/assets/wLogo.png" />
    </router-link>
    <ul class="navbar-nav nav-tabs mt-1 m-3">
      <li class="nav-item">
        <router-link class="nav-link" to="/inicio">Inicio</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/registro">Registro</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/historial">Historial</router-link>
      </li>
    </ul>
  </nav>
  <router-view></router-view>
</template>
<script>
export default {
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

<style>
#logo {
  width: 70px;
}
</style>
