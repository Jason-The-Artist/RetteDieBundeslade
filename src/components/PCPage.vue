
<style scoped>

.repair-button{
  background: #2b2b2b;
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 5px;
}

.repair-button:hover{
  border: 1px solid #ffffff;
}

</style>

<template>

  <div v-if="mode === 0">
    <div class="center-horizontal">
      <p>Scanne diesen QR-Code (wenn du Philister bist), um die Verbindung zu Gott zu sabotieren.</p>
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
  </div>

  <div v-else-if="mode === 1">
    <div class="center full-size">
      <div>
        <div class="center-horizontal">
          <h3>Die Verbindung zu Gott wurde sabotiert.</h3>
        </div>
        <div class="center-horizontal repair-button pointer" @click="onRepair">
          <img src="../assets/repair_icon.png" style="width: 40px">
          <h1 style="margin: 0">Verbindung wiederherstellen</h1>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="mode === 2">
    <div class="center full-size">
      <div>
        <div class="center-horizontal">
          <h3>Es herrscht Dunkelheit.</h3>
        </div>
        <div class="center-horizontal repair-button pointer" @click="onRepairLight">
          <img src="../assets/repair_icon.png" style="width: 40px">
          <h1 style="margin: 0">Dunkelheit entfernen</h1>
        </div>
      </div>
    </div>
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
          camSabotageQR: "",
          mode: 0,
          socket: null
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

      this.createSocket()


    },

    methods: {

      createSocket() {
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

        this.socket.addEventListener('close', (event) => {
          console.log("close")
          this.createSocket()
        });


        this.socket.addEventListener('message', (event) => {

          const message = JSON.parse(event.data)
          console.log(message)
          if(message.func === "camIsSabotage"){
            this.mode = 1
          }else if(message.func === "camIsRepaired"){
            this.mode = 0
          }else if(message.func === "lightIsSabotage"){
            this.mode = 2
          }else if(message.func === "lightIsRepaired"){
            this.mode = 0
          }
        });
      },

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

      onRepair(){
        let dat = {
          type: "engine",
          func: "repairCam"
        }
        this.send(dat)
      },

      onRepairLight(){
        let dat = {
          type: "engine",
          func: "repairLight"
        }
        this.send(dat)
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