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
import G0T6 from "@/components/game/g0/G0T6.vue";
import G0T7 from "@/components/game/g0/G0T7.vue";
import G0T8 from "@/components/game/g0/G0T8.vue";
import G0T9 from "@/components/game/g0/G0T9.vue";
import G0T10 from "@/components/game/g0/G0T10.vue";

import G1T1 from "@/components/game/g1/G1T1.vue";
import G1T2 from "@/components/game/g1/G1T2.vue";
import G1T3 from "@/components/game/g1/G1T3.vue";
import G1T4 from "@/components/game/g1/G1T4.vue";
import G1T5 from "@/components/game/g1/G1T5.vue";
import G1T6 from "@/components/game/g1/G1T6.vue";
import G1T7 from "@/components/game/g1/G1T7.vue";
import G1T8 from "@/components/game/g1/G1T8.vue";
import G1T9 from "@/components/game/g1/G1T9.vue";
import G1T10 from "@/components/game/g1/G1T10.vue";
import G1T11 from "@/components/game/g1/G1T11.vue";
import G1T12 from "@/components/game/g1/G1T12.vue";

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
  {
    path: '/g0/t6',
    component: G0T6
  },
  {
    path: '/g0/t7',
    component: G0T7
  },
  {
    path: '/g0/t8',
    component: G0T8
  },
  {
    path: '/g0/t9',
    component: G0T9
  },
  {
    path: '/g0/t10',
    component: G0T10
  },



  {
    path: '/g1/t1',
    component: G1T1
  },
  {
    path: '/g1/t2',
    component: G1T2
  },
  {
    path: '/g1/t3',
    component: G1T3
  },
  {
    path: '/g1/t4',
    component: G1T4
  },
  {
    path: '/g1/t5',
    component: G1T5
  },
  {
    path: '/g1/t6',
    component: G1T6
  },
  {
    path: '/g1/t7',
    component: G1T7
  },
  {
    path: '/g1/t8',
    component: G1T8
  },
  {
    path: '/g1/t9',
    component: G1T9
  },
  {
    path: '/g1/t10',
    component: G1T10
  },
  {
    path: '/g1/t11',
    component: G1T11
  },
  {
    path: '/g1/t12',
    component: G1T12
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router