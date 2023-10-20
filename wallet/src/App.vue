<template>
  <div>
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
        <li class="nav-item">
          <router-link class="nav-link" to="/estado">Estado</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/inversiones">Inversiones</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script></script>

<style>
#logo {
  width: 70px;
}
</style>
