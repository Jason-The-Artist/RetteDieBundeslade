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
import G0T2 from "@/components/game/g0/G0T2.vue";
import G0T3 from "@/components/game/g0/G0T3.vue";
import G0T4 from "@/components/game/g0/G0T4.vue";
import G0T5 from "@/components/game/g0/G0T5.vue";

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
  {
    path: '/g0/t2',
    component: G0T2
  },
  {
    path: '/g0/t3',
    component: G0T3
  },
  {
    path: '/g0/t4',
    component: G0T4
  },
  {
    path: '/g0/t5',
    component: G0T5
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router