<template>

  <div v-if="mode === 0">
    <div class="center-horizontal">
      <div :style="'width: ' + this.multiplier * 100 + 'px; background: #282828'">
        <div ref="progress" style="height: 50px; background: #42b983"></div>
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
        <img
            v-for="(t) in tasksG2"
            :src="'https://jasonserver.de/karte/g2_tasks/' + t + '.png'" class="karte-leinwand absolute"/>
      </div>
    </div>
  </div>


  <div v-else-if="mode === 1">
    <div class="center-horizontal">
      <img src="../assets/emergency-icon.svg" style="width: 500px"/>
    </div>
    <div class="center-horizontal">
      <h1 class="red" style="font-size: 60px">Emergency Meeting</h1>
    </div>
    <div class="center-horizontal">
      <h1 style="font-size: 60px">von {{caller}}</h1>
    </div>
  </div>


  <div v-else-if="mode === 2">
    <div class="center-horizontal flex-wrap">
      <PlayerMeetingLeinwandView
          v-for="(dat) in names"
          :name="dat.name"
          :dead="dat.dead"
          :gaveVote="dat.gaveVote"
          :votes="dat.votes"
      />
    </div>

  </div>

  <div v-else-if="mode === 3" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal flex-wrap">
        <PlayerMeetingLeinwandView
            :name="votedPlayer"
            :dead="true"
        />
      </div>

      <div class="center-horizontal">
        <h1 v-if="role !== ''">Die Rolle war: {{role}}</h1>
      </div>
    </div>

  </div>

  <div v-else-if="mode === 4" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1>Gleichstand! Keiner stirbt!</h1>
      </div>
    </div>

  </div>


</template>


<script>
import EventBus from "./code/EventBusEvent";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";
import PlayerMeetingLeinwandView from "@/components/views/PlayerMeetingLeinwandView.vue";

export default {
    name: "LeinwandPage",
  components: {PlayerMeetingLeinwandView},
    data() {
        return {
          multiplier: 15,
          current: 50,
          tasksG0: [],
          tasksG1: [],
          tasksG2: [],
          mode: 0,
          caller: "",
          names: [],
          votedPlayer: "",
          role: ""
        };
    },

    created() {

    },
    mounted() {

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









      let fac = this.current * this.multiplier
      this.$refs.progress.style.width = fac + "px"

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
          //console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "emergencyMeeting"){
            this.mode = 1
            this.caller = message.player
          }else if(message.func === "startMeeting"){
            this.mode = 2
            let dat = {
              type: "ping",
              func: "getPlayersAdvancedLeinwand"
            };
            this.send(dat);
          }else if(message.func === "allPlayers"){

            this.names = []

            let allPlayers = message.players
            for(let i = 0; i < allPlayers.length; i++){
              let dat = {
                name: allPlayers[i].player,
                dead: allPlayers[i].dead,
                gaveVote: false,
                votes: ""
              }
              this.names.push(dat)
            }

            let names1 = this.names
            this.names = []
            nextTick().then(() =>{
              this.names = names1
            })

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

          }else if(message.func === "revealVotes"){
            let playerData = message.data

            for(let i = 0; i < this.names.length; i++){
              for(let j = 0; j < playerData.length; j++){
                let data = playerData[j]
                if(this.names[i].name === data.player){
                  this.names[i].votes = data.votes
                }
              }
            }

            let names1 = this.names
            this.names = []
            nextTick().then(() =>{
              this.names = names1
            })

          }else if(message.func === "deadScreen"){
            this.votedPlayer = message.player
            let role = message.role
            if(role !== "null"){
              this.role = role
            }
            this.mode = 3

          }else if(message.func === "normalScreen"){
            this.mode = 0

          }else if(message.func === "tieScreen"){
            this.mode = 4

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
}
</style>