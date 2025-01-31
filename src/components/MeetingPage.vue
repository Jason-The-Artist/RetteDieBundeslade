<template>
  <ConfirmPopup :show="confirmShow" @yes="yesSelected" @no="noSelected" :text="'Möchtest du wirklich ' + (activeClickedPlayer === 'dummy' ? 'niemanden' : activeClickedPlayer) + ' wählen?'"/>

  <div class="center-horizontal flex-wrap" v-if="mode === 0">
    <PlayerMeetingView
        v-for="(dat) in names"
        :name="dat.name"
        @click="clickedPlayer(dat.name)"
        class="pointer"
        :voted="myVote === dat.name"
        :dead="dat.defeat"
        :gaveVote="dat.givenVote"
        :currentDead="dat.currentDead"
        :dummy="dat.isDummy"
    />
  </div>

  <div v-else-if="mode === 1">
    <div class="center-horizontal flex-wrap">
      <PlayerMeetingRevealView
          v-for="(dat) in names"
          :name="dat.name"
          :dead="dat.defeat"
          :gaveVote="dat.givenVote !== null"
          :votes="dat.receivedVotes + ''"
      />
    </div>

  </div>

  <div v-else-if="mode === 2" class="center" style="height: 80vh">
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

  <div v-else-if="mode === 3" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1>Gleichstand! Keiner stirbt!</h1>
      </div>
    </div>
  </div>

  <div v-else-if="mode === 4" class="center" style="height: 80vh">
    <div>
      <div class="center-horizontal">
        <h1>Keiner wurde gevotet! Keiner stirbt!</h1>
      </div>
    </div>
  </div>


</template>


<script>
import EventBus from "./code/EventBusEvent";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";
import ConfirmPopup from "@/components/views/ConfirmPopup.vue";
import PlayerMeetingView from "@/components/views/PlayerMeetingView.vue";
import PlayerMeetingLeinwandView from "@/components/views/PlayerMeetingLeinwandView.vue";
import PlayerMeetingRevealView from "@/components/views/PlayerMeetingRevealView.vue";

export default {
    name: "MeetingPage",
    components: {PlayerMeetingRevealView, PlayerMeetingLeinwandView, PlayerMeetingView, ConfirmPopup},
    data() {
        return {
          names: [],
          confirmShow: false,
          activeClickedPlayer: "Jason",
          alreadyVoted: false,
          mode: 0,
          votedPlayer: "",
          role: "",
          myVote: "",
          selfDead: false
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

          dat = {
            type: "engine",
            func: "getAllPlayerDataVoting"
          };
          this.send(dat);

        });



        this.socket.addEventListener('message', (event) => {
          const message = JSON.parse(event.data)
          console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "allPlayerData"){
            this.names = message.data

            for(let i = 0; i < this.names.length; i++){
              if(this.names[i].name === this.getCookies("username")){
                this.myVote = this.names[i].givenVote
                this.selfDead = this.defeat
              }
            }

          }else if(message.func === "normalScreen"){

            this.$router.push('/overlay');

          } else if(message.func === "revealVotes"){
            this.mode = 1
          }else if(message.func === "deadScreen"){
            this.votedPlayer = message.player
            let role = message.role
            if(role !== "null"){
              this.role = role
            }
            this.mode = 2

          }else if(message.func === "tieScreen"){
            this.mode = 3
          }else if(message.func === "dummyScreen"){
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

      clickedPlayer(player){
        if(!this.alreadyVoted){
          if(!this.selfDead){
            if(!this.isSelectedDead(player)){
              this.activeClickedPlayer = player
              this.confirmShow = true
            }
          }
        }
      },

      isSelectedDead(player){
        for(let i = 0; i < this.names.length; i++){
          if(this.names[i].name === player){
            if(this.names[i].defeat){
              return true
            }
          }
        }
        return false
      },

      yesSelected(){
        this.confirmShow = false
        this.alreadyVoted = true

        for(let i = 0; i < this.names.length; i++){
          if(this.names[i].name === this.activeClickedPlayer){
            this.names[i].isVoted = true
          }
        }

        let names1 = this.names
        this.names = []
        nextTick().then(() =>{
          this.names = names1
        })

        let dat = {
          type: "engine",
          func: "playerGaveVote",
          player: this.getCookies("username"),
          activeClicked: this.activeClickedPlayer
        }
        this.send(dat)
      },

      noSelected(){
        this.confirmShow = false
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