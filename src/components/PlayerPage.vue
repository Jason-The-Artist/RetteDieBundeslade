<template>

  <div class="center-horizontal" v-if="isHost">
    <UIButton title="Raum schließen" @clicked="onClickRemove"/>
  </div>

    <div class="button-layout center-horizontal" v-if="!isHost">
      <UIButton title="Raum verlassen" @clicked="onClickLeave"/>
    </div>


  <div class="button-layout center-horizontal" v-if="isHost">
    <div>
      <div class="center-horizontal">
        <UIButton title="Spiel starten" @clicked="onClickStart"/>
      </div>

      <div class="center-horizontal center">
        <h3 class="green" v-if="supportLeinwand">Leinwand wird unterstützt</h3>
        <h3 class="red" v-else>Leinwand wird nicht unterstützt</h3>
      </div>
      <div class="center-horizontal center">
        <h2 class="white">Anzahl der Philister</h2>
        <input ref="input" class="small-input text-color texture" value="1">
      </div>
      <div class="center-horizontal center">
        <h2 class="white">Anzahl der Tasks</h2>
        <input ref="tasks" class="small-input text-color texture" value="4">
      </div>
      <div class="center-horizontal">
        <h2 class="white">Rausvoterolle sichtbar</h2>
        <div style="width: 20px"></div>
        <input type="checkbox" ref="rausvote" checked style="width: 25px">
      </div>
      <div class="center-horizontal center">
        <h2 class="white">Emergency Meetings</h2>
        <input ref="emerginput" class="small-input text-color texture" value="1">
      </div>
      <h2 class="red">{{errorText}}</h2>
    </div>
  </div>


    <div v-else class="center-horizontal">
        <!--<h1>{{lang.playerPage.waitForPlayer}}</h1>/!-->
    </div>


  <div class="center-horizontal flex-wrap">
    <PlayerView
        v-for="(dat) in names"
        :name="dat.name"

    />
  </div>

</template>


<script>
import EventBus from "./code/EventBusEvent";
import PlayerView from "@/components/views/PlayerView.vue";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "PlayerPage",
    components: {UIButton, PlayerView},
    data() {
        return {
            names: [],
            isHost: false,
            socket: null,
          errorText: "",
          supportLeinwand: false
        };
    },

    created() {

    },
    mounted() {
      this.setCookies("killed", "false")
      this.setCookies("meetingsLeft", "true")
      this.setCookies("overlayMode", "1")
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

          dat = {
            type: "ping",
            func: "getPlayers"
          };
          this.send(dat);

          dat = {
            type: "register",
            func: "isLeinwand"
          };
          this.send(dat);



        });



        this.socket.addEventListener('message', (event) => {
          const message = JSON.parse(event.data)
          console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "allPlayers"){
            this.names = []

            let allPlayers = message.players
            for(let i = 0; i < allPlayers.length; i++){
              let dat = {
                name: allPlayers[i]
              }
              this.names.push(dat)
            }

            let names1 = this.names
            this.names = []
            nextTick().then(() =>{
              this.names = names1
            })

          }else if(message.func === "start"){
            let imposters = message.imposters
            let isImposter = "false"
            for(let i = 0; i < imposters.length; i++){
              if(imposters[i] === this.getCookies("username")){
                isImposter = "true"
              }
            }
            this.setCookies("imposter", isImposter)
            this.startGame()

          }else if(message.func === "removed"){
            this.onClickLeave()
          }else if(message.func === "leinwandStatus"){
            let status = message.status
            this.supportLeinwand = status
          }
        });

    },

    beforeUnmount() {
      window.removeEventListener('beforeunload', this.eventClose);
    },


    methods: {

      startGame(){
        this.$router.push('/overlay');
      },

      onClickStart(){
        if(this.names.length > 0){
          if(this.checkImposterInput()){
            if(this.checkMeetingsInput()){
              if(this.checkTaskInput()){
                let dat = {
                  type: "engine",
                  func: "start",
                  imposterCount: Number(this.$refs.input.value),
                  executeRoleVis: Number(this.$refs.rausvote.checked),
                  meetings: Number(this.$refs.emerginput.value),
                  taskCount: Number(this.$refs.tasks.value),
                  player: this.getCookies("username")
                }
                this.send(dat);
              }
            }
          }
        }else{
          this.errorText = "Man braucht mindestens 4 Spieler"
        }
      },

      checkTaskInput(){
        let count = Number(this.$refs.tasks.value)
        if(count < 1){
          this.errorText = "Du brauchst mindestens 1 Task"
          return false
        }
        if(count > 20){
          this.errorText = "Du darfst nicht mehr als 20 Tasks haben"
          return false
        }
        return true
      },

      checkMeetingsInput(){
        if(this.$refs.emerginput.value === ""){
          this.errorText = "Du musst die Anzahl der Meetings setzen"
          return false
        }
        let checker = Number(this.$refs.emerginput.value)
        if(isNaN(checker)){
          this.errorText = "Du musst bei Meetings eine Zahl eingeben"
          return false
        }else if(checker < 1){
          this.errorText = "Du brauchst mindestes 1 Meeting"
          return false
        }
        return true
      },

      checkImposterInput(){
        if(this.$refs.input.value === ""){
          this.errorText = "Du musst die Anzahl der Imposters setzen"
          return false
        }
        let checker = Number(this.$refs.input.value)
        if(isNaN(checker)){
          this.errorText = "Du musst beim Imposter eine Zahl eingeben"
          return false
        }else if(checker < 1){
          this.errorText = "Du brauchst mindestes 1 Philister"
          return false
        }
        return true
      },

      eventClose(){
        if(this.isHost){
          this.onClickRemove()
        }else{
          let dat = {
            type: "register",
            func: "removePlayer",
            player: this.getCookies("username")
          }
          this.send(dat);
        }
      },

      onClickLeave(){
        this.eventClose()
        this.$router.push('/');
      },

      onClickRemove(){
        let dat = {
          type: "register",
          func: "kickAllPlayers"
        }
        this.send(dat);
      },




      send(data){
        this.socket.send(JSON.stringify(data))
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