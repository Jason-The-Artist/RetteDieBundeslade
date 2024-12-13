<template>
<div class="center-horizontal">
  <h1>Task freigeschaltet</h1>
</div>
  <div class="center-horizontal">
    <p>Du hast eine neue Task freigeschaltet. Schaue auf die Karte, um zu sehen wo sie liegt.</p>
  </div>
  <div class="center-horizontal">
    <UIButton title="OK" @clicked="onClick"/>
  </div>
</template>


<script>

import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "ScanForLocation",
    components: {UIButton},
    data() {
        return {
          socket: null
        };
    },

    created() {

    },
    mounted() {

      this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

      this.socket.addEventListener('open', (event) => {
        let dat = {
          type: "register",
          func: "replaceClient",
          player: this.getCookies("username")
        };
        this.send(dat)

        let arr = this.$route.fullPath.split("/")
        let g = arr[1]
        let t = arr[2]

        dat = {
          type: "engine",
          func: "nextTask",
          g: g,
          t: t,
          player: this.getCookies("username")
        }

        this.send(dat)

      });

      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        console.log(message)
      });

    },


    methods: {

      onClick() {
        this.$emit("clicked")
      },

      send(dat){
        this.socket.send(JSON.stringify(dat))
      },

      getCookies(key){
        return this.$cookies.get(key);
      },
      setCookies(key, value){
        return this.$cookies.set(key, value, 2147483647);
      },
    }
}
</script>