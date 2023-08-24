export let computadaFormatearFecha = {
  computed: {
    //En la Api se guarda la hora en formato UTC, si no la formateo, cuando la recupero me lo hace con mi zona horaria y la cambia
    formatearFecha() {
      if (this.movimiento && this.movimiento.datetime) {
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
      } else {
        return 'Fecha no disponible';
      }
    },
  },
};
