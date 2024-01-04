<template>

  <div v-if="mode === 1">
    <div class="show-page center-horizontal">
      <img src="../assets/imposter.png" class="role-image" v-if="imposter"/>
      <img src="../assets/crewmate.png" class="role-image" v-else/>
    </div>
  </div>

  <div v-if="mode === 2">
    <EmergencyPopup :show="emergVis" :caller="emergCaller" @start="startMeeting"/>
    <div class="center-horizontal" v-if="killed === 'false' && hasMeetingsLeft === 'true'">
      <UIButton title="Emergency Meeting" @click="emergMeeting"/>
    </div>
    <div class="center-horizontal" v-if="killed === 'true'">
      <h2 class="red">Du bist nun ein Geist</h2>
    </div>
    <div class="center-horizontal" v-else-if="hasMeetingsLeft === 'false'">
      <h2 class="red">Du hast keine Meetings übrig</h2>
    </div>
    <div style="height: 20px"></div>

    <div class="center-horizontal">
      <div class="video" v-if="!paused">
        <qrcode-stream @detect="onDetect" :paused="paused" :class="imposter ? 'shadow-red' : 'shadow-blue'"></qrcode-stream>
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
  </div>


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
          emergCaller: "Jason",
          killed: "false",
          hasMeetingsLeft: "true",
          mode: 0,
          imposter: false
        };
    },

    created() {

    },
    mounted() {
      if(this.getCookies("killed") !== null){
        this.killed = this.getCookies("killed")
      }
      if(this.getCookies("meetingsLeft") !== null){
        this.hasMeetingsLeft = this.getCookies("meetingsLeft")
      }
      if(this.getCookies("imposter") === "true"){
        this.imposter = true
      }else{
        this.imposter = false
      }
      if(this.getCookies("overlayMode") !== null){
        let om = this.getCookies("overlayMode")
        if(om === "1"){
          this.mode = 1
        }else if(om === "2"){
          this.mode = 2
        }
      }else{
        this.mode = 1
      }
      if(this.mode === 1){
        setTimeout(() => {
          this.mode = 2
          this.setCookies("overlayMode", "2")
        },4000)
      }

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
          console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "emergencyMeeting"){
            this.emergCaller = message.player
            this.emergVis = true
          }else if(message.func === "startMeeting"){
            this.$router.push('/meeting');
          }else if(message.func === "noMeetingsLeft"){
            this.hasMeetingsLeft = "false"
            this.setCookies("meetingsLeft", "false")
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