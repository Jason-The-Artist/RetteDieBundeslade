<template>
  <EmergencyPopup :show="emergVis" :caller="emergCaller" @start="startMeeting"/>
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
import EmergencyPopup from "@/components/views/EmergencyPopup.vue";

export default {
    name: "MainOverlayPage",
    components: {EmergencyPopup, UIButton},
    data() {
        return {
          qrText: "nothing",
          torchEnabled: false,
          paused: false,
          emergVis: false,
          emergCaller: "Jason"
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

          let dat = {
            type: "register",
            func: "replaceClient",
            player: this.getCookies("username")
          };
          this.send(dat);

        });



        this.socket.addEventListener('message', (event) => {
          const message = JSON.parse(event.data)
          //console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "emergencyMeeting"){
            this.emergCaller = message.player
            this.emergVis = true
          }else if(message.func === "startMeeting"){
            this.$router.push('/meeting');
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
        let dat = {
          type: "engine",
          func: "emergencyMeeting",
          args: [this.getCookies("username")]
        };
        this.send(dat);
      },

      openKarte(){
        this.$router.push('/karte');
      },

      startMeeting(){
        let dat = {
          type: "engine",
          func: "startMeeting"
        };
        this.send(dat);
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