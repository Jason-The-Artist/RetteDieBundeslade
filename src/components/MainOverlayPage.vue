<template>

  <div class="center-horizontal">
    <UIButton title="Emergency Meeting" @click="emergMeeting"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <div class="video" v-if="!paused">
      <qrcode-stream @detect="onDetect" :paused="paused"></qrcode-stream>
    </div>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <UIButton title="Karte" @click="openKarte"/>
  </div>

  <h2>Aufgaben:</h2>
  <p>Fix Wiring</p>
  <p>Empty Garbage</p>
  <p>Clean Vent</p>
  <p>Swipe Card</p>


</template>


<script>
import EventBus from "./code/EventBusEvent";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "MainOverlayPage",
    components: {UIButton},
    data() {
        return {
          qrText: "nothing",
          torchEnabled: false,
          paused: false
        };
    },

    created() {

    },
    mounted() {
      this.baseURI = document.baseURI.split("#")[0] + "#"

        if(this.getCookies("host") === "true"){
            this.isHost = true
        }

        window.addEventListener('beforeunload', this.eventClose);


        this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

        this.socket.addEventListener('open', (event) => {
          console.log("socket connected")

        });



        this.socket.addEventListener('message', (event) => {
          const message = JSON.parse(event.data)
          //console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "allPlayers"){


          }
        });

    },

    beforeUnmount() {
      window.removeEventListener('beforeunload', this.eventClose);
    },


    methods: {

      send(data){
        this.socket.send(JSON.stringify(data))
      },

      async onDetect(resultPromise) {
        console.log("on detect")
        try {
          const result = await resultPromise;
          this.qrText = result.content;
        } catch (error) {
          console.error('Fehler beim Decodieren des QR-Codes:', error);
        }
        this.paused = true
        setTimeout(() => {
          this.paused = false
        },500)
      },

      emergMeeting(){

      },

      openKarte(){
        this.$router.push('/karte');
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

<style>
.video {
  width: 90vw;
  height: 90vw;
  max-width: 500px;
  max-height: 500px;
}
</style>