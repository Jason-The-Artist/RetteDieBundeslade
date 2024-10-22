<template>

  <div class="center-horizontal">
    <UIButton title="Karte schließen" @click="closeKarte"/>
  </div>

  <div class="center-horizontal">
    <h1>Erdgeschoss</h1>
  </div>


  <div class="relative center-horizontal">
    <img src="../assets/karte/g0.png" class="karte"/>
    <img
        v-for="(t) in tasksG0"
        :src="'https://jasonserver.de/karte/g0_tasks/' + t + '.png'" class="karte absolute"/>
  </div>

  <div style="height: 20px"></div>
  <div class="center-horizontal">
    <h1>1. Geschoss</h1>
  </div>

  <div class="relative center-horizontal">
    <img src="../assets/karte/g1.png" class="karte"/>
    <img
        v-for="(t) in tasksG1"
        :src="'https://jasonserver.de/karte/g1_tasks/' + t + '.png'" class="karte absolute"/>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">

    <h1>2. Geschoss</h1>
  </div>

  <div class="relative center-horizontal">
    <img src="../assets/karte/g2.png" class="karte"/>
    <img
        v-for="(t) in tasksG2"
        :src="'https://jasonserver.de/karte/g2_tasks/' + t + '.png'" class="karte absolute"/>
  </div>




</template>


<script>
import EventBus from "./code/EventBusEvent";
import {nextTick} from "vue";
import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "KartePage",
    components: {UIButton},
    data() {
        return {
          tasksG0: [],
          tasksG1: [],
          tasksG2: [],
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

          }else if(message.func === "allPlayers"){


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

      closeKarte(){
        this.$router.push('/overlay');
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