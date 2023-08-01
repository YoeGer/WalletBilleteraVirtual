<template>
  <div class="container-fluid">
    <div class="row m-3 ms-2">
      <div class="col">Tipo de transacción</div>
      <div class="col">Criptomoneda</div>
      <div class="col">Cantidad</div>
      <div class="col">Precio</div>
      <div class="col">Fecha y hora</div>
      <div class="col"></div>
    </div>
    <MovimientoComponente
      v-for="movimiento in movimientos"
      :key="movimiento.user_id"
      :movimiento="movimiento"
    />
  </div>
</template>
<script>
import MovimientoComponente from "@/components/MovimientoComponente.vue";

export default {
  name: "HistorialVista",
  components: {
    MovimientoComponente,
  },
  data() {
    return {
      movimientos: [
        {
          user_id: "valor_introducido_login",
          action: "sale",
          crypto_code: "usdc",
          crypto_amount: "1.01",
          money: "170.98",
          datetime: "19-07-2021 20:50",
        },
        {
          user_id: "valor_introducido_login",
          action: "sale",
          crypto_code: "usdc",
          crypto_amount: "1.01",
          money: "170.98",
          datetime: "19-07-2021 20:50",
        },
        {
          user_id: "valor_introducido_login",
          action: "sale",
          crypto_code: "usdc",
          crypto_amount: "1.01",
          money: "170.98",
          datetime: "19-07-2021 20:50",
        },
      ],
    };
  },
};
</script>
<style></style>
