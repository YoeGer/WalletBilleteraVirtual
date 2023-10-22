<template>
  <div>
    <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light" v-if="user_id">
      <router-link to="/inicio">
        <img id="logo" class="mt-1 m-3" src="../src/assets/wLogo.png" />
      </router-link>
      <ul class="navbar-nav">
        <li class="nav-item" :class="{ estoyAca: $route.name === 'Inicio' }">
          <router-link class="nav-link" :to="{ name: 'Inicio' }">Inicio</router-link>
        </li>
        <li class="nav-item" :class="{ estoyAca: $route.name === 'Registro' }">
          <router-link class="nav-link" :to="{ name: 'Registro' }">Registro</router-link>
        </li>
        <li class="nav-item" :class="{ estoyAca: $route.name === 'Historial' }">
          <router-link class="nav-link" :to="{ name: 'Historial' }">Historial</router-link>
        </li>
        <li class="nav-item" :class="{ estoyAca: $route.name === 'Estado' }">
          <router-link class="nav-link" :to="{ name: 'Estado' }">Estado</router-link>
        </li>
        <li class="nav-item" :class="{ estoyAca: $route.name === 'Inversiones' }">
          <router-link class="nav-link" :to="{ name: 'Inversiones' }">Inversiones</router-link>
        </li>
      </ul>
      <div class="user-info p-2 rounded ml-3" style="max-width: 200px; margin-right: 10px">
        <span>{{ user_id }}</span>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    user_id() {
      return this.$store.state.user_id;
    },
  },
};
</script>
<style>
#logo {
  width: 70px;
}
.user-info {
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: #cce5ff;
}
.estoyAca {
  border-bottom: 2px solid #cce5ff;
}
</style>
