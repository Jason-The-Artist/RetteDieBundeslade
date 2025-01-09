<script>

import MainPage from "@/components/MainPage.vue";
import ControlPopup from "@/components/views/ControlPopup.vue";

export default {
  //npm run dev | npm run build
  name: "App",
  components: {ControlPopup, MainPage, WebSocket},

  created() {
  },

  mounted() {

  },
  data() {
    return {
    }
  },

  updated() {
  },

  methods: {


  }
}
</script>

<template>
  <notifications />

  <ControlPopup :show="true"/>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
</style>
