<style>

.next-dot{
  filter: hue-rotate(210deg);
}

.finished-dot{
  filter: hue-rotate(240deg);
}

</style>

<template>

  <div class="center-horizontal">
    <UIButton title="Karte schließen" @clicked="closeKarte"/>
  </div>

  <div class="center-horizontal">
    <h1>Erdgeschoss</h1>
  </div>


  <div class="relative center-horizontal">
    <img src="../assets/karte/g0.png" class="karte"/>
    <img
        v-for="(t) in tasksG0"
        :src="'../../src/assets/karte/g0_tasks/' + t[0] + '.png'" class="karte absolute" :class="t[1] + '-dot'"/>
  </div>

  <div style="height: 20px"></div>
  <div class="center-horizontal">
    <h1>1. Geschoss</h1>
  </div>

  <div class="relative center-horizontal">
    <img src="../assets/karte/g1.png" class="karte"/>
    <img
        v-for="(t) in tasksG1"
        :src="'../../src/assets/karte/g1_tasks/' + t[0] + '.png'" class="karte absolute" :class="t[1] + '-dot'"/>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">

    <h1>2. Geschoss</h1>
  </div>

  <div class="relative center-horizontal">
    <img src="../assets/karte/g2.png" class="karte"/>
    <img
        v-for="(t) in tasksG2"
        :src="'../../src/assets/karte/g2_tasks/' + t[0] + '.png'" class="karte absolute" :class="t[1] + '-dot'"/>
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
          tasks: [],
        };
    },

    created() {

    },
    mounted() {
      console.log(this.getCookies("tasks"))
      this.tasks = this.getCookies("tasks").data

      for(let i = 0; i < this.tasks.length; i++) {
        let g = this.tasks[i][0]
        let t = this.tasks[i][1]
        let color = this.tasks[i][3]
        let arr = [t, color]
        if(g === "g0"){
          this.tasksG0.push(arr)
        }else if(g === "g1"){
          this.tasksG1.push(arr)
        }else if(g === "g2"){
          this.tasksG2.push(arr)
        }
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

          let dat1 = {
            type: "engine",
            func: "currentSabotage",
          };
          this.send(dat1);

        });



        this.socket.addEventListener('message', (event) => {
          const message = JSON.parse(event.data)
          console.log(message)
          if(message.func === "error"){

            console.error(message.text)

          }else if(message.func === "currentSabotage"){
            if(message.sabotage === "fire"){
              this.tasksG2.push(["s1", "normal"])
            }else if(message.sabotage === "password"){
              if(!message.s1){
                this.tasksG1.push(["s1", "normal"])
              }
              if(!message.s2){
                this.tasksG1.push(["s2", "normal"])
              }
            }else if(message.sabotage === "light"){
              this.tasksG2.push(["s1", "normal"])
            }
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