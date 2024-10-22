import { createRouter, createWebHashHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router';
import MainPage from "../components/MainPage.vue";
import PlayerPage from "../components/PlayerPage.vue";
import MainOverlayPage from "@/components/MainOverlayPage.vue";
import KartePage from "@/components/KartePage.vue";
import MeetingPage from "@/components/MeetingPage.vue";
import LeinwandPage from "@/components/LeinwandPage.vue";
import QRGenerator from "@/components/QRGenerator.vue";
import G0T1 from "@/components/game/g0/G0T1.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/player',
    component: PlayerPage
  },
  {
    path: '/overlay',
    component: MainOverlayPage
  },
  {
    path: '/karte',
    component: KartePage
  },
  {
    path: '/meeting',
    component: MeetingPage
  },
  {
    path: '/leinwand',
    component: LeinwandPage
  },
  {
    path: '/qr',
    component: QRGenerator
  },







  {
    path: '/g0/t1',
    component: G0T1
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router