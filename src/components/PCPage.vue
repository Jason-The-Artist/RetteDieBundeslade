<template>

  <div class="center-horizontal">
    <p>Scanne diesen QR-Code (wenn du Philister bist), um die Kamera zu sabotieren</p>
  </div>

  <div class="center-horizontal">
    <v-qrcode
        style="border: solid 10px #969696"
        :text="camSabotageQR"
        :size="calculateQRCodeSize()"
        :render="RenderOptions.CANVAS"
        :correct-level="ErrorCorrectLevel.M"
        color-dark="#000000"
        color-light="#ffffff"
    />
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue"
import {ErrorCorrectLevel, RenderOptions} from "qrcode-vuejs";

export default {
    name: "PCPage",
  components: {UIButton},
    data() {
        return {
          camSabotageQR: ""
        };
    },

  computed: {
    ErrorCorrectLevel() {
      return ErrorCorrectLevel
    },
    RenderOptions() {
      return RenderOptions
    }
  },

    created() {

    },

    beforeUnmount() {
        window.removeEventListener('beforeunload', this.eventClose);
    },


    unmounted() {
        this.socket.close()
    },

    mounted() {

      let camDat = {
        func: "sabotageCam"
      }
      this.camSabotageQR = JSON.stringify(camDat)

      window.addEventListener('beforeunload', this.eventClose);

      this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

      this.socket.addEventListener('open', (event) => {

        let dat = {
          type: "register",
          func: "registerPC"
        }
        this.socket.send(JSON.stringify(dat));

      });

      this.socket.addEventListener('error', (event) => {
      });


        this.socket.addEventListener('message', (event) => {

          const message = JSON.parse(event.data)
          console.log(message)
          if(message.func === "error"){
            console.error(message.text)
          }
        });


    },

    methods: {

      calculateQRCodeSize() {
        const scaleFactor = 0.9;
        const maxWidth = window.innerWidth * scaleFactor;
        const maxHeight = window.innerHeight * scaleFactor;
        let num = Math.min(maxWidth, maxHeight)
        if(num > 500){
          return 500
        }else{
          return num
        }
      },



      getCookies(key){
          return this.$cookies.get(key);
      },
      setCookies(key, value){
          this.$cookies.set(key, value, 2147483647);
      },
      eventClose(){
        let dat = {
          type: "register",
          func: "removePC"
        }
        this.send(dat)
      },
      send(message){
        this.socket.send(JSON.stringify(message));
      },
    }
}
</script>