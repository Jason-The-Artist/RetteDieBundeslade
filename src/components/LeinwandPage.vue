
<style scoped>

.huge-font{
  font-size: 60px
}

</style>

<template>

  <div v-if="mode === 0">

    <div class="center-horizontal">
      <h1 style="margin: 0px" class="emergency-color huge-font" v-if="currentSabotage === 'fire'">Ein Feuer wurde gelegt!</h1>
      <h1 style="margin: 0px" class="emergency-color huge-font" v-else-if="currentSabotage === 'password'">Die Philister haben das Password geändert!</h1>
      <h1 style="margin: 0px" class="emergency-color huge-font" v-else-if="currentSabotage === 'light'">Es herrscht Dunkelheit!</h1>
    </div>

    <div class="center-horizontal">
      <div :style="'width: ' + this.multiplier * 100 + 'px; background: #282828'">
        <div :style="'height: 50px; background: #42b983; width: ' + current + 'px'"></div>
      </div>
    </div>


    <div>
      <div class="relative">
        <img src="../assets/karte/g0.png" class="karte-leinwand absolute"/>
        <img
            v-for="(t) in tasksG0"
            :src="'https://jasonserver.de/karte/g0_tasks/' + t + '.png'" class="karte-leinwand absolute"/>
      </div>

      <div class="relative center-horizontal">
        <img src="../assets/karte/g1.png" class="karte-leinwand absolute"/>
        <img
            v-for="(t) in tasksG1"
            :src="'https://jasonserver.de/karte/g1_tasks/' + t + '.png'" class="karte-leinwand absolute"/>
      </div>

      <div class="relative right">
        <img src="../assets/karte/g2.png" class="karte-leinwand absolute"/>
        <img  v-for="(t) in tasksG2" :src="'https://jasonserver.de/karte/g2_tasks/' + t + '.png'" class="karte-leinwand absolute"/>
      </div>
    </div>
  </div>


  <div v-else-if="mode === 1">
    <div class="center-horizontal">
      <img src="../assets/emergency-icon.svg" style="width: 500px"/>
    </div>
    <div class="center-horizontal">
      <h1 class="red huge-font">Emergency Meeting</h1>
    </div>
    <div class="center-horizontal">
      <h1 style="font-size: 60px">von {{caller}}</h1>
    </div>
  </div>


  <div v-else-if="mode === 2">
    <div class="center-horizontal flex-wrap">
      <PlayerMeetingView
          v-for="(dat) in names"
          :name="dat.name"
          :dead="dat.defeat"
          :gaveVote="dat.givenVote"
          :currentDead="dat.currentDead"
          :dummy="dat.isDummy"
          :leinwand="true"
      />
    </div>

  </div>

  <div v-else-if="mode === 7">
    <div class="center-horizontal flex-wrap">
      <PlayerMeetingRevealView
          v-for="(dat) in names"
          :name="dat.name"
          :dead="dat.defeat"
          :gaveVote="dat.givenVote !== null"
          :votes="dat.receivedVotes + ''"
          :dummy="dat.isDummy"
          :leinwand="true"
      />
    </div>

  </div>

  <div v-else-if="mode === 3" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal flex-wrap">
        <PlayerMeetingView
            :name="votedPlayer"
            :dead="true"
            :leinwand="true"
        />
      </div>

      <div class="center-horizontal">
        <h1 style="font-size: 60px" v-if="role !== ''">Die Rolle war: <span style="color: yellow">{{role}}</span></h1>
      </div>
    </div>

  </div>

  <div v-else-if="mode === 4" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1 class="huge-font">Gleichstand! Keiner stirbt!</h1>
      </div>
    </div>
  </div>

  <div v-else-if="mode === 5" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1 class="red huge-font">Die Philister haben gewonnen!</h1>
      </div>
    </div>
  </div>

  <div v-else-if="mode === 6" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1 class="blue huge-font">Die Israeliten haben gewonnen!</h1>
      </div>
    </div>
  </div>

  <div v-else-if="mode === 9" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1 class="huge-font">Keiner wurde gevotet! Keiner stirbt!</h1>
      </div>
    </div>
  </div>

  <div v-else-if="mode === 8" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1 class="emergency-color huge-font">Die Verbindung zu Gott wurde sabotiert!</h1>
      </div>
    </div>
  </div>


</template>


<script>
import EventBus from "./code/EventBusEvent";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";
import PlayerMeetingLeinwandView from "@/components/views/PlayerMeetingLeinwandView.vue";
import PlayerMeetingView from "@/components/views/PlayerMeetingView.vue";
import PlayerMeetingRevealView from "@/components/views/PlayerMeetingRevealView.vue";

export default {
    name: "LeinwandPage",
  components: {PlayerMeetingRevealView, PlayerMeetingView},
    data() {
        return {
          multiplier: 15,
          current: 0,
          tasksG0: [],
          tasksG1: [],
          tasksG2: [],
          mode: 0,
          caller: "",
          names: [],
          votedPlayer: "",
          role: "",
          currentSabotage: "null"
        };
    },

    created() {
      /*this.names.push({
        currentDead: false,
        defeat: false,
        givenVote: null,
        isDummy: true,
        name: "dummy",
        receivedVotes: 1
      });
      this.names.push({
        defeat: false,
        func: "playerData",
        givenVote: "Jason",
        imposter: true,
        isDummy: false,
        isHost: true,
        meetings: "0",
        name: "Jason",
        overlayMode: -2,
        receivedVotes: 2,
        sabotageMode: 0
      });
      this.names.push({
        defeat: false,
        func: "playerData",
        givenVote: "Jason",
        imposter: false,
        isDummy: false,
        isHost: false,
        meetings: "0",
        name: "Chrome",
        overlayMode: -2,
        receivedVotes: 0,
        sabotageMode: 0
      });
      this.names.push({
        defeat: true,
        func: "playerData",
        givenVote: null,
        imposter: false,
        isDummy: false,
        isHost: false,
        meetings: 1,
        name: "Firefox",
        overlayMode: -2,
        receivedVotes: 0,
        sabotageMode: 0
      });
      this.names.push({
        defeat: false,
        func: "playerData",
        givenVote: "dummy",
        imposter: false,
        isDummy: false,
        isHost: false,
        meetings: "0",
        name: "Phone",
        overlayMode: -2,
        receivedVotes: 0,
        sabotageMode: 0
      });*/
    },
    mounted() {
/*
      this.tasksG0.push("t1")
      this.tasksG0.push("t2")
      this.tasksG0.push("t3")
      this.tasksG0.push("t4")
      this.tasksG0.push("t5")
      this.tasksG0.push("t6")
      this.tasksG0.push("t7")
      this.tasksG0.push("t8")
      this.tasksG0.push("t9")
      this.tasksG0.push("t10")

      this.tasksG1.push("t1")
      this.tasksG1.push("t2")
      this.tasksG1.push("t3")
      this.tasksG1.push("t4")
      this.tasksG1.push("t5")
      this.tasksG1.push("t6")
      this.tasksG1.push("t7")
      this.tasksG1.push("t8")
      this.tasksG1.push("t9")
      this.tasksG1.push("t10")
      this.tasksG1.push("t11")
      this.tasksG1.push("t12")
      this.tasksG1.push("s1")
      this.tasksG1.push("s2")

      this.tasksG2.push("t1")
      this.tasksG2.push("t2")
      this.tasksG2.push("t3")
      this.tasksG2.push("t4")
      this.tasksG2.push("t5")
      this.tasksG2.push("t6")
      this.tasksG2.push("t7")
      this.tasksG2.push("t8")
      this.tasksG2.push("t9")
      this.tasksG2.push("t10")
      this.tasksG2.push("t11")
      this.tasksG2.push("t12")
      this.tasksG2.push("t13")
      this.tasksG2.push("s1")
*/
        window.addEventListener('beforeunload', this.eventClose);


        this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

        this.socket.addEventListener('open', (event) => {
          console.log("socket connected")

          let dat = {
            type: "register",
            func: "registerLeinwand"
          };
          this.send(dat);

        });



        this.socket.addEventListener('message', (event) => {
          const message = JSON.parse(event.data)
          console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "emergencyMeeting"){
            this.mode = 1
            this.caller = message.caller
          }else if(message.func === "startMeeting"){
            this.mode = 2
            let dat = {
              type: "ping",
              func: "getPlayersAdvancedLeinwand"
            };
            this.send(dat);
          }else if(message.func === "allPlayerData"){
            this.names = message.data

            for(let i = 0; i < this.names.length; i++){
              if(this.names[i].name === this.getCookies("username")){
                this.myVote = this.names[i].givenVote
                this.selfDead = this.defeat
              }
            }

          }else if(message.func === "playerGaveVote"){

            for(let i = 0; i < this.names.length; i++){
              if(this.names[i].name === message.player){
                this.names[i].gaveVote = true
              }
            }

            let names1 = this.names
            this.names = []
            nextTick().then(() =>{
              this.names = names1
            })

          }else if(message.func === "normalScreen"){
            this.mode = 0

          }else if(message.func === "impostersWon"){
            this.mode = 5
          }else if(message.func === "crewmatesWon"){
            this.mode = 6
          }else if(message.func === "gotKicked"){
            this.$router.push("/")
          }else if(message.func === "revealVotes"){
            this.mode = 7
          }else if(message.func === "deadScreen"){
            this.votedPlayer = message.player
            let role = message.role
            if(role !== "null"){
              this.role = role
            }
            this.mode = 3

          }else if(message.func === "tieScreen"){
            this.mode = 4
          }else if(message.func === "onTask"){
            let g = message.g
            let t = message.t
            if(g === "g0"){
              this.tasksG0.push(t)
            }else if(g === "g1"){
              this.tasksG1.push(t)
            }else if(g === "g2"){
              this.tasksG2.push(t)
            }
            setTimeout(() => {
              if(g === "g0"){
                let update = []
                for(let i = 0; i < this.tasksG0.length; i++){
                  if(this.tasksG0[i] !== t){
                    update.push(this.tasksG0[i])
                  }
                }
                this.tasksG0 = update
              }else if(g === "g1"){
                let update = []
                for(let i = 0; i < this.tasksG1.length; i++){
                  if(this.tasksG1[i] !== t){
                    update.push(this.tasksG1[i])
                  }
                }
                this.tasksG1 = update
              }else if(g === "g2"){
                let update = []
                for(let i = 0; i < this.tasksG2.length; i++){
                  if(this.tasksG2[i] !== t){
                    update.push(this.tasksG2[i])
                  }
                }
                this.tasksG2 = update
              }
            },5000)
          }else if(message.func === "onProgress"){
            this.current = message.progress * this.multiplier
          }else if(message.func === "camIsSabotage"){
            this.mode = 8
          }else if(message.func === "camIsRepaired"){
            this.mode = 0
          }else if(message.func === "registered"){
            let dat = {
              type: "engine",
              func: "currentProgress"
            }
            this.send(dat)
          }else if(message.func === "dummyScreen"){
            this.mode = 9
          }else if(message.func === "noSabotage"){
            this.currentSabotage = "null"
          }else if(message.func === "sabotageFire"){
            this.currentSabotage = "fire"
          }else if(message.func === "sabotagePassword"){
            this.currentSabotage = "password"
          }else if(message.func === "sabotageLight"){
            this.currentSabotage = "light"
          }
        });

    },

    beforeUnmount() {
      window.removeEventListener('beforeunload', this.eventClose);
    },
  unmounted() {
      this.eventClose()
  },


  methods: {

      eventClose(){
        let dat = {
          type: "register",
          func: "removeLeinwand"
        }
        this.send(dat)
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