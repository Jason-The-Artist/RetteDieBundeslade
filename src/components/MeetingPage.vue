<template>
  <ConfirmPopup :show="confirmShow" @yes="yesSelected" @no="noSelected" :text="'Möchtest du wirklich ' + activeClickedPlayer + ' wählen?'"/>

  <div class="center-horizontal flex-wrap">
    <PlayerMeetingView
        v-for="(dat) in names"
        :name="dat.name"
        @click="clickedPlayer(dat.name)"
        class="pointer"
        :voted="dat.isVoted"
        :dead="dat.dead"
        :gaveVote="dat.gaveVote"
    />
  </div>


</template>


<script>
import EventBus from "./code/EventBusEvent";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";
import ConfirmPopup from "@/components/views/ConfirmPopup.vue";
import PlayerMeetingView from "@/components/views/PlayerMeetingView.vue";

export default {
    name: "MeetingPage",
    components: {PlayerMeetingView, ConfirmPopup},
    data() {
        return {
          names: [],
          confirmShow: false,
          activeClickedPlayer: "Jason",
          alreadyVoted: false,
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
            type: "ping",
            func: "getPlayersAdvanced"
          };
          this.send(dat);

        });



        this.socket.addEventListener('message', (event) => {
          const message = JSON.parse(event.data)
          //console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "allPlayers"){

            this.names = []

            let allPlayers = message.players
            for(let i = 0; i < allPlayers.length; i++){
              if(!allPlayers[i].dead){
                let dat = {
                  name: allPlayers[i].player,
                  isVoted: false,
                  dead: false,
                  gaveVote: false
                }
                this.names.push(dat)
              }
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

          }else if(message.func === "normalScreen"){

            this.$router.push('/overlay');

          }
          else if(message.func === "killedByMeeting"){

            this.setCookies("killed", "true")

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
          this.activeClickedPlayer = player
          this.confirmShow = true
        }
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
          args: [this.getCookies("username"), this.activeClickedPlayer]
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