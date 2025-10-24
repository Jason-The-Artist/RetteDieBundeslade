
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

.b-image{
  width: 200px;
  border-radius: 20px;
}

.dark-background{
  background-color: rgba(0, 0, 0, 0.5);
}

.rotate {
  animation: rotation 60s linear infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>

<template>
  <ConfirmPopup :show="confirmShow" @yes="yesSelected" @no="noSelected" text="Möchtest du wirklich ein Meeting starten?"/>
  <ConfirmPopup :show="confirmKilledShow" @yes="yesSelectedKill" @no="noSelected" text="Bist du wirklich gefangen worden?"/>
  <AdvancedFunctionsPopup :show="advancedShow" :imposter="imposter" @onCancel="onAdvancedCancel" @onKilled="onKilled" @onSabotageFire="onSabotageFire" @onSabotageLight="onSabotageLight" @onSabotagePassword="onSabotagePassword"/>

  <div v-if="mode === 1">
    <div class="show-page center-horizontal">
      <img src="../assets/philister.png" class="role-image" v-if="imposter"/>
      <img src="../assets/israelit.png" class="role-image" v-else/>
    </div>
  </div>

  <div v-if="mode === 2">

    <transition name="bundeslade">
      <div class="absolute full-size center" style="top: 0; z-index: 999" v-if="isBundeslade">
        <div>
          <h2 class="text-center">Teil {{bundesladePiece + 1}} der Bundeslade gefunden</h2>
          <div class="relative center">
            <img src="../assets/glow.png" class="rotate">
            <img src="../assets/bundeslade.png" class="b-image absolute">
          </div>
        </div>
      </div>
    </transition>
    <EmergencyPopup :show="emergVis" :caller="emergCaller" @start="startMeeting"/>
    <div v-if="!killed" class="center-horizontal">
      <UIButton title="Weitere Funktionen" @clicked="showAdvanced" v-if="!killedQR"/>
    </div>
    <div class="center-horizontal" v-if="killed">
      <div>
        <div class="center-horizontal">
          <h2 class="red">Du bist nun gefangen</h2>
        </div>
        <div class="center-horizontal" v-if="!imposter">
          <p class="text-center" style="margin: 0px">Klicke bei den Aufgaben auf die Texte, um die Aufgaben zu beenden.</p>
        </div>
      </div>
    </div>
    <div style="height: 20px"></div>

    <div class="center-horizontal" v-if="!killedQR">
      <div class="video" v-if="!paused">
        <qrcode-stream @detect="onDetect" :paused="paused" class="shadow"></qrcode-stream>
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
      <h3 class="red text-center" style="margin: 0px">{{errorText}}</h3>
    </div>
    <div class="center-horizontal" v-if="isHiding">
      <h3 style="margin: 0px" class="text-center">Verstecke innerhalb von {{hideTime}} sec.</h3>
    </div>
    <div class="center-horizontal" v-if="inFoundingState">
      <h3 style="margin: 0px" class="text-center">Bringe das Teil zurück</h3>
    </div>

    <div class="center-horizontal" v-if="sabotageMode === 1">
      <div>
        <div class="center-horizontal">
          <h3 class="emergency-color" style="margin-bottom: 0px; margin-top: 5px">Ein Feuer wurde gelegt. Lösche es!</h3>
        </div>
        <div class="center-horizontal">
          <p class="white text-center" style="margin: 0px">Auf der Karte findest du eine rote Aufgabe. Löse sie, um die Sabotage zu beseitigen.</p>
        </div>
      </div>
    </div>

    <div class="center-horizontal" v-else-if="sabotageMode === 2">
      <div>
        <div class="center-horizontal">
          <h3 class="emergency-color" style="margin-bottom: 0px; margin-top: 5px">Die Philister haben das Password geändert!</h3>
        </div>
        <div class="center-horizontal">
          <p class="white text-center" style="margin: 0px">Auf der Karte findest du eine rote Aufgabe. Löse sie, um die Sabotage zu beseitigen.</p>
        </div>
      </div>
    </div>

    <div class="center-horizontal" v-else-if="sabotageMode === 3">
      <div>
        <div class="center-horizontal">
          <h3 class="emergency-color" style="margin-bottom: 0px; margin-top: 5px">Es herrscht Dunkelheit!</h3>
        </div>
        <div class="center-horizontal">
          <p class="white text-center" style="margin: 0px">Auf der Karte findest du eine rote Aufgabe. Löse sie, um die Sabotage zu beseitigen.</p>
        </div>
      </div>
    </div>

    <div style="height: 20px"></div>

    <div class="center-horizontal">
      <UIButton title="Karte" @clicked="openKarte"/>
    </div>

    <h2>Aufgaben:</h2>
    <div v-if="!killed">
      <div v-for="dat in tasks">
        <p :class="'text-' + dat[3]"><span style="color: gray">[{{dat[0] + ',' + dat[1] + ']'}}</span> {{dat[2]}}</p>
      </div>
    </div>
    <div v-else>
      <div v-for="dat in tasks">
        <p class="pointer" :class="'text-' + dat[3]" @click="onTaskClicked(dat[0], dat[1])">{{dat[2]}}</p>
      </div>
    </div>

    <div style="height: 20px"></div>

    <div class="center-horizontal">
      <a @click="switchRoleVis" class="link pointer" v-if="showRole">{{imposter ? 'Philister' : 'Israelit'}}</a>
      <a @click="switchRoleVis" class="link pointer" v-else>Rolle einblenden</a>
    </div>

  </div>

  <div v-if="mode === 3">
    <div class="center-horizontal">
      <h1 class="red text-center">Die Philister haben gewonnen!</h1>
    </div>
    <div class="center-horizontal" v-if="host">
      <UIButton title="Neues Spiel" @clicked="newGame"/>
    </div>
    <div class="center-horizontal" v-else>
      <p class="text-color text-center">Warte auf den Host...</p>
    </div>
  </div>

  <div v-if="mode === 4">



    <div class="center-horizontal">
      <h1 class="blue text-center">Die Israeliten haben gewonnen!</h1>
    </div>
    <div class="center-horizontal" v-if="host">
      <UIButton title="Neues Spiel" @clicked="newGame"/>
    </div>
    <div class="center-horizontal" v-else>
      <p class="text-color text-center">Warte auf den Host...</p>
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
import AdvancedFunctionsPopup from "@/components/views/AdvancedFunctionsPopup.vue";
import HideBundeslade from "@/components/views/HideBundeslade.vue";

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
    components: {
      HideBundeslade,
      AdvancedFunctionsPopup, PlayerMeetingLeinwandView, EmergencyPopup, UIButton, ConfirmPopup},
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
          tasks: [],
          timeout: null,
          showRole: false,
          advancedShow: false,
          sabotageMode: 0,
          isBundeslade: false,
          bundesladePiece: 0,
          isHiding: false,
          hideTime: 0,
          inFoundingState: true,
          bundesladePosition: 0
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

      this.socket.addEventListener('message', async (event) => {
        const message = JSON.parse(event.data)
        console.log(message)
        if(message.func === "error"){

          console.error(message.text)

          if(message.show){
            this.errorText = message.text
            this.clearTO()
            this.timeout = setTimeout(() => {
              this.errorText = ""
            },3000)
          }

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
            this.clearTO()
            this.timeout = setTimeout(() => {
              this.errorText = ""
            },5000)
          }
        }else if(message.func === "unexpectedError"){
          this.$router.push("/")
        }else if(message.func === "bundesladeFound"){
          this.inFoundingState = true
          this.paused = true
          this.bundesladePiece = message.piece
          this.isBundeslade = true;
          setTimeout(() => {
            this.isBundeslade = false
            this.paused = false
          },5000)
        }else if(message.func === "allowHideBundeslade"){
          if(message.allow){
            this.isHiding = true
            await this.startHiding()
          }else{
            this.errorText = message.reason
            this.clearTO()
            this.timeout = setTimeout(() => {
              this.errorText = ""
            },5000)
          }
        }else if(message.func === "successHidden"){
          this.isHiding = false
        }else if(message.func === "successFounding"){
          this.inFoundingState = false
        }




        else if(message.type === "pass" || message.type === "passAll"){
          this.onQR(message)
        }
      });

    },



    methods: {

      async startHiding(){
        for(let i = 20; i > 0; i--){
          this.hideTime = i
          await this.delay(1000)
        }
        this.isHiding = false
      },

      successHideBundeslade(){
        this.isHiding = false
        let dat = {
          type: "engine",
          func: "successHideBundeslade"
        }
        this.send(dat)
      },

      setPlayerData(data){
        this.killed = data.defeat
        this.hasMeetingsLeft = data.meetings > 0
        this.host = data.isHost
        this.imposter = data.imposter
        this.mode = data.overlayMode
        this.tasks = data.tasks
        this.sabotageMode = data.sabotageMode
        this.toggleTorch(data.torchEnabled)
        this.inFoundingState = data.foundingState
        this.bundesladePosition = data.bundesladePosition

        if(this.mode === -2){
          this.$router.push("/meeting")
        }

        let dat = {
          data: this.tasks
        }
        this.setCookies("tasks", JSON.stringify(dat))
      },

      onSabotageFire(){
        this.advancedShow = false;
        let dat = {
          type: "engine",
          func: "sabotageFire"
        }
        this.send(dat)
      },

      onSabotageLight(){
        this.advancedShow = false;
        let dat = {
          type: "engine",
          func: "sabotageLight"
        }
        this.send(dat)
      },

      onSabotagePassword(){
        this.advancedShow = false
        let dat = {
          type: "engine",
          func: "sabotagePassword"
        }
        this.send(dat)
      },

      showAdvanced(){
        this.advancedShow = true
      },

      onAdvancedCancel(){
        this.advancedShow = false
      },

      onTaskClicked(g, t){
        let dat = {
          type: "engine",
          func: "checkTask",
          g: g,
          t: t,
          player: this.getCookies("username")
        }
        this.send(dat)
      },

      onQR(message){
        if(message.func === "openMeeting"){
          this.onMeeting()
        }else if(message.func === "hideBundeslade"){
          if(this.imposter){
            this.onHideBundeslade()
          }else{
            this.bringBackBundeslade()
          }
        }else if(message.func === "onTask"){
          if(this.isHiding){
            let dat = {
              type: "engine",
              func: "successHideBundeslade",
              g: message.g,
              t: message.t,
            }
            this.send(dat)
          }else{
            let dat = {
              type: "engine",
              func: "checkTask",
              g: message.g,
              t: message.t,
              player: this.getCookies("username")
            }
            this.send(dat)          }
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
            this.clearTO()
            this.timeout = setTimeout(() => {
              this.errorText = ""
            },5000)
          }
        }
      },

      onHideBundeslade(){
        let dat = {
          type: "engine",
          func: "checkHideBundeslade"
        }
        this.send(dat)
      },

      bringBackBundeslade(){
        let dat = {
          type: "engine",
          func: "bringBackBundeslade",
          position: this.bundesladePiece,
          player: this.getCookies("username"),
        }
        this.send(dat)
      },

      clearTO(){
        if(this.timeout !== null){
          clearTimeout(this.timeout)
        }
      },

      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },

      onMeeting(){
        if(!this.killed && this.hasMeetingsLeft === true){
          if(this.sabotageMode > 0){
            this.errorText = "Eine Sabotage blockiert das Meeting."
            this.clearTO()
            this.timeout = setTimeout(() => {
              this.errorText = ""
            },5000)
          }else{
            this.confirmShow = true
            this.paused = true
          }
        }else{
          this.errorText = "Du hast keine Meetings mehr übrig."
          this.clearTO()
          this.timeout = setTimeout(() => {
            this.errorText = ""
          },5000)
        }
      },

      send(data){
        data.player = this.getCookies("username")
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

      switchRoleVis(){
        this.showRole = !this.showRole;
      },

      onKilled(){
        this.advancedShow = false
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
          type: "root",
          func: "clearGame"
        }
        this.send(dat)
      },

      toggleTorch(isEnable) {
        navigator.mediaDevices.enumerateDevices().then(devices => {

          const cameras = devices.filter((device) => device.kind === 'videoinput');

          if (cameras.length === 0) {
            console.log('No camera found on this device.')
          }
          const camera = cameras[cameras.length - 1];

          // Create stream and get video track
          navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: camera.deviceId,
              facingMode: ['user', 'environment'],
              height: {ideal: 1080},
              width: {ideal: 1920}
            }
          }).then(stream => {
            const track = stream.getVideoTracks()[0];

            //Create image capture object and get camera capabilities
            const imageCapture = new ImageCapture(track)
            const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

              track.applyConstraints({
                advanced: [{torch: isEnable}]
              });
            });
          });
        });
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