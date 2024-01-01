import { createRouter, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import MainPage from "../components/MainPage.vue";
import PlayerPage from "../components/PlayerPage.vue";
import MainOverlayPage from "@/components/MainOverlayPage.vue";
import KartePage from "@/components/KartePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/player',
    name: 'PlayerPage',
    component: PlayerPage
  },
  {
    path: '/overlay',
    name: 'MainOverlayPage',
    component: MainOverlayPage
  },
  {
    path: '/karte',
    name: 'KartePage',
    component: KartePage
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router