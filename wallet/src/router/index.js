import { createRouter, createWebHistory } from 'vue-router';
import InicioSesionVista from '../views/InicioSesionVista.vue';
import RegistroVista from '../views/RegistroVista.vue';
import InicioVista from '../views/InicioVista.vue';
import HistorialVista from '../views/HistorialVista.vue';

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
