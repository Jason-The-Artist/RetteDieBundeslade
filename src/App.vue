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
    let dat = this.$cookies.get("control")
    if(dat === "true"){
      this.controlIcon = true
    }
  },
  data() {
    return {
      showControl: false,
      controlIcon: false
    }
  },

  updated() {
  },

  methods: {
    close(){

      this.showControl = false
    },

    open(){
      this.showControl = true
    }
  }
}
</script>

<template>
  <notifications />

  <ControlPopup :show="showControl" @close="close"/>

  <div class="absolute" style="top: 0" v-if="controlIcon">
    <img src="./assets/repair_icon.png" style="width: 30px; opacity: 0.5" @click="open">
  </div>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
</style>
