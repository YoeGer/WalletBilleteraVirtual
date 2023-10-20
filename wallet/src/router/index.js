import { createRouter, createWebHistory } from 'vue-router';
import InicioSesionVista from '../views/InicioSesionVista.vue';
import RegistroVista from '../views/RegistroVista.vue';
import InicioVista from '../views/InicioVista.vue';
import HistorialVista from '../views/HistorialVista.vue';
import EstadoVista from '../views/EstadoVista.vue';
import InversionesVista from '../views/InversionesVista.vue';

const routes = [
  {
    path: '/',
    name: 'InicioSesion',
    component: InicioSesionVista,
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: InicioVista,
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegistroVista,
  },
  {
    path: '/historial',
    name: 'Historial',
    component: HistorialVista,
  },
  {
    path: '/estado',
    name: 'Estado',
    component: EstadoVista,
  },
  {
    path: '/inversiones',
    name: 'Inversiones',
    component: InversionesVista,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
