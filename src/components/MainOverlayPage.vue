
<style>

.text-next{
  color: #ffaa00;
}

.text-finished{
  color: #29ac1a;
}

.video {
  width: 90vw;
  height: 90vw;
  max-width: 500px;
  max-height: 500px;
}

</style>

<template>
  <ConfirmPopup :show="confirmShow" @yes="yesSelected" @no="noSelected" text="Möchtest du wirklich ein Meeting starten?"/>
  <ConfirmPopup :show="confirmKilledShow" @yes="yesSelectedKill" @no="noSelected" text="Bist du wirklich gestorben?"/>

  <div v-if="mode === 1">
    <div class="show-page center-horizontal">
      <img src="../assets/philister.png" class="role-image" v-if="imposter"/>
      <img src="../assets/israelit.png" class="role-image" v-else/>
    </div>
  </div>

  <div v-if="mode === 2">
    <EmergencyPopup :show="emergVis" :caller="emergCaller" @start="startMeeting"/>
    <div class="center-horizontal" v-if="!killed && hasMeetingsLeft">
      <UIButton title="Sabotage" @clicked="onSabotage" v-if="imposter"/>
      <div v-else class="center-horizontal">
        <UIButton title="Ich bin gestorben!" @clicked="onKilled" v-if="!killedQR"/>
      </div>
    </div>
    <div class="center-horizontal" v-if="killed">
      <h2 class="red">Du bist nun ein Geist</h2>
    </div>
    <div class="center-horizontal" v-else-if="!hasMeetingsLeft">
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

    <div class="center-horizontal">
      <h3 class="red" style="margin: 0px">{{errorText}}</h3>
    </div>

    <div style="height: 20px"></div>

    <div class="center-horizontal">
      <UIButton title="Karte" @clicked="openKarte"/>
    </div>

    <h2>Aufgaben:</h2>
    <div v-for="dat in tasks">
      <p :class="'text-' + dat[3]">{{dat[2]}}</p>
    </div>
  </div>

  <div v-if="mode === 3">
    <div class="center-horizontal">
      <h1 class="red">Die Philister haben gewonnen!</h1>
    </div>
    <div class="center-horizontal" v-if="host">
      <UIButton title="Neues Spiel" @clicked="newGame"/>
    </div>
    <div class="center-horizontal" v-else>
      <p class="text-color">Warte auf den Host...</p>
    </div>
  </div>

  <div v-if="mode === 4">



    <div class="center-horizontal">
      <h1 class="blue">Die Israeliten haben gewonnen!</h1>
    </div>
    <div class="center-horizontal" v-if="host">
      <UIButton title="Neues Spiel" @clicked="newGame"/>
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
          errorText: "",
          qrText: "nothing",
          torchEnabled: false,
          paused: false,
          emergVis: false,
          emergCaller: "Jason",
          killed: false,
          hasMeetingsLeft: true,
          mode: 0,
          imposter: false,
          qrc: null,
          confirmShow: false,
          confirmKilledShow: false,
          killedQR: false,
          killedQRText: "",
          host: false,
          tasks: []
        };
    },

    created() {
      this.qrc = new QRController()

    },
    mounted() {
      this.paused = false

      let killedDat = {
        func: "killed",
        deadPlayer: this.getCookies("username")
      }
      this.killedQRText = JSON.stringify(killedDat)

      this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

      this.socket.addEventListener('open', (event) => {
        console.log("socket connected")

        let dat = {
          type: "register",
          func: "replaceClient",
          player: this.getCookies("username")
        };
        this.send(dat)

        dat = {
          type: "engine",
          func: "getPlayerData",
          player: this.getCookies("username")
        };
        this.send(dat)

      });

      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        console.log(message)
        if(message.func === "error"){

          console.error(message.text)

        }else if(message.func === "playerData"){
          this.setPlayerData(message)
        }else if(message.func === "emergencyMeeting"){
          this.emergCaller = message.caller
          this.emergVis = true
        }else if(message.func === "startMeeting"){
          this.$router.push('/meeting');
        }else if(message.func === "noMeetingsLeft"){
          this.hasMeetingsLeft = false
          this.setCookies("meetingsLeft", "false")
        }else if(message.func === "impostersWon"){
          this.mode = 3
        }else if(message.func === "crewmatesWon"){
          this.mode = 4
        }else if(message.func === "gotKicked"){
          this.$router.push("/")
        }else if(message.func === "checkTask"){
          let approved = message.approved
          if(approved){
            let g = message.g
            let t = message.t
            this.errorText = ""
            let path = "/" + g + "/" + t
            this.$router.push(path)
          }else{
            this.errorText = message.error
          }
        }



        else if(message.type === "pass" || message.type === "passAll"){
          this.onQR(message)
        }
      });

    },



    methods: {

      setPlayerData(data){
        this.killed = data.defeat
        this.hasMeetingsLeft = data.meetings > 0
        this.host = data.isHost
        this.imposter = data.imposter
        this.mode = data.overlayMode
        this.tasks = data.tasks

        let dat = {
          data: this.tasks
        }
        this.setCookies("tasks", JSON.stringify(dat))
      },

      onQR(message){
        if(message.func === "openMeeting"){
          this.onMeeting()
        }else if(message.func === "onTask"){
          let dat = {
            type: "engine",
            func: "checkTask",
            g: message.g,
            t: message.t,
            player: this.getCookies("username")
          }
          this.send(dat)
        }else if(message.func === "killed"){
          let player = message.deadPlayer
          let dat = {
            type: "engine",
            func: "foundDead",
            player: this.getCookies("username"),
            deadPlayer: player
          }
          this.send(dat)
        }else if(message.func === "sabotageCam"){
          if(this.imposter){
            let dat = {
              type: "engine",
              func: "sabotageCam",
            }
            this.send(dat)
          }else{
            this.errorText = "Nur ein Philister kann diesen QR-Code einscannen."
            setTimeout(() => {
              this.errorText = ""
            },5000)
          }
        }
      },

      onMeeting(){
        if(!this.killed && this.hasMeetingsLeft === true){
          this.confirmShow = true
          this.paused = true
        }
      },

      send(data){
        this.socket.send(JSON.stringify(data))
      },

      async onDetect(resultPromise) {
        try {
          const result = await resultPromise;
          this.qrText = result.content;
          this.onQR(JSON.parse(this.qrText))
        } catch (error) {
          console.error('Fehler beim Decodieren des QR-Codes:', error);
        }
      },

      emergMeeting(){
        let dat = {
          type: "engine",
          func: "emergencyMeeting",
          player: this.getCookies("username")
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
          player: this.getCookies("username")
        }
        this.send(dat)
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