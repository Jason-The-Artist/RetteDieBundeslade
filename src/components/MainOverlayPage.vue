<template>
  <ConfirmPopup :show="confirmShow" @yes="yesSelected" @no="noSelected" text="Möchtest du wirklich ein Meeting starten?"/>
  <ConfirmPopup :show="confirmKilledShow" @yes="yesSelectedKill" @no="noSelected" text="Bist du wirklich gestorben?"/>

  <div v-if="mode === 1">
    <div class="show-page center-horizontal">
      <img src="../assets/imposter.png" class="role-image" v-if="imposter"/>
      <img src="../assets/crewmate.png" class="role-image" v-else/>
    </div>
  </div>

  <div v-if="mode === 2">
    <EmergencyPopup :show="emergVis" :caller="emergCaller" @start="startMeeting"/>
    <div class="center-horizontal" v-if="killed === 'false' && hasMeetingsLeft === 'true'">
      <UIButton title="Sabotage" @click="onSabotage" v-if="imposter"/>
      <div v-else class="center-horizontal">
        <UIButton title="Ich bin gestorben!" @click="onKilled" v-if="!killedQR"/>
      </div>
    </div>
    <div class="center-horizontal" v-if="killed === 'true'">
      <h2 class="red">Du bist nun ein Geist</h2>
    </div>
    <div class="center-horizontal" v-else-if="hasMeetingsLeft === 'false'">
      <h2 class="red">Du hast keine Meetings übrig</h2>
    </div>
    <div style="height: 20px"></div>

    <div class="center-horizontal" v-if="!killedQR">
      <div class="video" v-if="!paused">
        <qrcode-stream @detect="onDetect" :paused="paused" :class="imposter ? 'shadow-red' : 'shadow-blue'"></qrcode-stream>
      </div>
      <div class="video" v-else>
      </div>
    </div>
    <div class="center-horizontal" v-else>
      <div class="video center">
        <div>
          <v-qrcode
              style="border: solid 10px #969696"
              :text="killedQRText"
              :size="calculateQRCodeSize()"
              :render="RenderOptions.CANVAS"
              :correct-level="ErrorCorrectLevel.M"
              color-dark="#000000"
              color-light="#ffffff"
          />
        </div>
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

  <div v-if="mode === 3">
    <div class="center-horizontal">
      <h1 class="red">Die Imposters haben gewonnen!</h1>
    </div>
    <div class="center-horizontal" v-if="host">
      <UIButton title="Neues Spiel" @click="newGame"/>
    </div>
    <div class="center-horizontal" v-else>
      <p class="text-color">Warte auf den Host...</p>
    </div>
  </div>

  <div v-if="mode === 4">
    <div class="center-horizontal">
      <h1 class="blue">Die Crewmates haben gewonnen!</h1>
    </div>
    <div class="center-horizontal" v-if="host">
      <UIButton title="Neues Spiel" @click="newGame"/>
    </div>
    <div class="center-horizontal" v-else>
      <p class="text-color">Warte auf den Host...</p>
    </div>
  </div>


</template>


<script>
import EventBus from "./code/EventBusEvent";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";
import EmergencyPopup from "@/components/views/EmergencyPopup.vue";
import {QRController} from "./code/QRController";
import ConfirmPopup from "@/components/views/ConfirmPopup.vue";
import {ErrorCorrectLevel, RenderOptions} from "qrcode-vuejs";
import PlayerMeetingLeinwandView from "@/components/views/PlayerMeetingLeinwandView.vue";

export default {
    name: "MainOverlayPage",
  computed: {
    ErrorCorrectLevel() {
      return ErrorCorrectLevel
    },
    RenderOptions() {
      return RenderOptions
    }
  },
    components: {PlayerMeetingLeinwandView, EmergencyPopup, UIButton, ConfirmPopup},
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
          imposter: false,
          qrc: null,
          confirmShow: false,
          confirmKilledShow: false,
          killedQR: false,
          killedQRText: "",
          host: false,
        };
    },

    created() {
      this.qrc = new QRController()



      EventBus.addEventListener('toMainOverlay', (event) => {
        let data = JSON.parse(event.data)
        if(data.func === "openMeeting"){
          if(this.killed === "false" && this.hasMeetingsLeft === "true"){
            this.confirmShow = true
            this.paused = true
          }
        }
      })

    },
    mounted() {
      let killedDat = {
        func: "killed",
        player: this.getCookies("username")
      }
      this.killedQRText = JSON.stringify(killedDat)
      this.paused = false
      if(this.getCookies("killed") !== null){
        this.killed = this.getCookies("killed")
      }
      if(this.getCookies("meetingsLeft") !== null){
        this.hasMeetingsLeft = this.getCookies("meetingsLeft")
      }
      if(this.getCookies("host") === "true"){
        this.host = true
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
          }else if(message.func === "impostersWon"){
            this.mode = 3
          }else if(message.func === "crewmatesWon"){
            this.mode = 4
          }else if(message.func === "gotKicked"){
            this.$router.push("/")
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
          this.qrc.onQRScanned(this.qrText)
        } catch (error) {
          console.error('Fehler beim Decodieren des QR-Codes:', error);
        }
      },

      emergMeeting(){
        let dat = {
          type: "engine",
          func: "emergencyMeeting",
          args: [this.getCookies("username")]
        };
        this.send(dat);
      },

      onKilled(){
        this.confirmKilledShow = true
      },

      submitKilled(){
        this.killedQR = true
        let dat = {
          type: "engine",
          func: "gotKilled",
          args: [this.getCookies("username")]
        }
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

      yesSelected(){
        this.emergMeeting()
        this.confirmShow = false
      },

      yesSelectedKill(){
        this.submitKilled()
        this.confirmKilledShow = false
      },

      noSelected(){
        this.confirmShow = false
        this.confirmKilledShow = false
        this.paused = false
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

      newGame(){
        let dat = {
          type: "engine",
          func: "clearGame"
        }
        this.send(dat)
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