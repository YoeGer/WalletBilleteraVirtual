<template>
  <h1>Bienvenido {{ user_id }}</h1>
</template>
<script>
export default {
  name: 'InicioVista',
  computed: {
    user_id() {
      return this.$store.state.user_id;
    },
  },
};
</script>
