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
import G1S1 from "@/components/game/g1/G1S1.vue";
import G1S2 from "@/components/game/g1/G1S2.vue";

import G2T1 from "@/components/game/g2/G2T1.vue";
import G2T2 from "@/components/game/g2/G2T2.vue";
import G2T3 from "@/components/game/g2/G2T3.vue";
import G2T4 from "@/components/game/g2/G2T4.vue";
import G2T5 from "@/components/game/g2/G2T5.vue";
import G2T6 from "@/components/game/g2/G2T6.vue";
import G2T7 from "@/components/game/g2/G2T7.vue";
import G2T8 from "@/components/game/g2/G2T8.vue";
import G2T9 from "@/components/game/g2/G2T9.vue";
import G2T10 from "@/components/game/g2/G2T10.vue";
import G2T11 from "@/components/game/g2/G2T11.vue";
import G2T12 from "@/components/game/g2/G2T12.vue";
import G2T13 from "@/components/game/g2/G2T13.vue";
import G2S1 from "@/components/game/g2/G2S1.vue";
import PCPage from "@/components/PCPage.vue";

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
    path: '/pc',
    component: PCPage
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
  {
    path: '/g1/s1',
    component: G1S1
  },
  {
    path: '/g1/s2',
    component: G1S2
  },




  {
    path: '/g2/t1',
    component: G2T1
  },
  {
    path: '/g2/t2',
    component: G2T2
  },
  {
    path: '/g2/t3',
    component: G2T3
  },
  {
    path: '/g2/t4',
    component: G2T4
  },
  {
    path: '/g2/t5',
    component: G2T5
  },
  {
    path: '/g2/t6',
    component: G2T6
  },
  {
    path: '/g2/t7',
    component: G2T7
  },
  {
    path: '/g2/t8',
    component: G2T8
  },
  {
    path: '/g2/t9',
    component: G2T9
  },
  {
    path: '/g2/t10',
    component: G2T10
  },
  {
    path: '/g2/t11',
    component: G2T11
  },
  {
    path: '/g2/t12',
    component: G2T12
  },
  {
    path: '/g2/t13',
    component: G2T13
  },
  {
    path: '/g2/s1',
    component: G2S1
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router