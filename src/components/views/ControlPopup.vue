

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask-saved">
      <div class="modal-wrapper-saved">
        <div class="modal-container-saved full-size" style="background: #000000">
          <div style="justify-content: center">
            <div class="center-horizontal">
              <div class="scroll-y overflow-x-hidden" style="height: 90vh">

                <UIButton title="Exit" @clicked="exit"/>
                <div style="height: 10px"></div>
                <UIButton title="Go back" v-if="mode !== 0" @clicked="goBack"/>

                <div style="height: 30px"></div>

                <div v-if="mode === 0">
                  <h3>(Server) Type:</h3>
                  <UIButton title="Engine" @clicked="onEngine"/>
                  <div style="height: 10px"></div>
                  <UIButton title="Register" @clicked="onRegister"/>
                  <div style="height: 30px"></div>

                  <h3>(Client) Type:</h3>
                  <UIButton title="MainPage" @clicked="onMainPage"/>
                  <div style="height: 10px"></div>
                  <UIButton title="PlayerPage" @clicked="onPlayerPage"/>
                  <div style="height: 10px"></div>
                  <UIButton title="MainOverlayPage" @clicked="onMainOverlayPage"/>
                  <div style="height: 10px"></div>
                  <UIButton title="LeinwandPage" @clicked="onLeinwandPage"/>
                  <div style="height: 10px"></div>
                  <UIButton title="MeetingPage" @clicked="onMeetingPage"/>
                  <div style="height: 10px"></div>
                  <UIButton title="PCPage" @clicked="onPCPage"/>
                  <div style="height: 10px"></div>
                  <UIButton title="CamPage" @clicked="onCamPage"/>
                  <div style="height: 30px"></div>

                  <h3>Extra:</h3>
                  <UIButton title="Reset Server" @clicked="onReset"/>
                  <div style="height: 10px"></div>
                </div>

                <div v-if="mode >= 1">

                  <div class="center-horizontal" v-if="mode >= 3">
                    <h2 class="white">Everyone</h2>
                    <div style="width: 20px"></div>
                    <input type="checkbox" v-model="everyone" checked style="width: 25px">
                  </div>

                  <div v-if="!everyone">
                    <input class="standart-input text-color" v-model="customPlayer" placeholder="Player name">
                  </div>

                  <div v-for="dat in getAllFunc('mode' + mode)">
                    <div style="height: 30px"></div>
                    <UIButton :title="dat" @clicked="execute(dat)"/>
                    <div v-for="param in getAllParams('mode' + mode, dat)">
                      <div style="height: 2px"></div>
                      <input :id="'mode' + mode + '-' + dat + '-' + param" class="standart-input text-color" :placeholder="param + ' (' + data['mode' + mode][dat][param] + ')'">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>



<script>

import UIButton from "@/components/views/UIButton.vue";

export default {
  name: "ControlPopup",
  components: {UIButton},

  props: {
    show: Boolean,
  },
  data(){
    return{
      mode: 0,
      socket: null,
      everyone: true,
      customPlayer: "",

      data: {
        mode1: {
          start: {
            imposterCount: "Number",
            executeRoleVis: "Number",
            meetings: "Number",
            taskCount: "Number",
            player: "String"
          },
          stop: {
          },
          emergencyMeeting: {
            player: "String"
          },
          startMeeting: {
          },
          playerGaveVote: {
            player: "String",
            activeClicked: "String"
          },
          gotKilled: {
            player: "String"
          },
          clearGame: {
          },
          createTaskList: {
            player: "String"
          },
          getPlayerData: {
            player: "String"
          },
          checkTask: {
            g: "String",
            t: "String",
            player: "String"
          },
          taskFinished: {
            g: "String",
            t: "String",
            player: "String"
          },
          nextTask: {
            g: "String",
            t: "String",
            player: "String"
          },
          getAllPlayerData: {
          },
          foundDead: {
            player: "String",
            deadPlayer: "String"
          },
          sabotageCam: {
          },
          repairCam: {
          }
        },
        mode2: {
          removePlayer: {
            player: "String"
          },
          removeLeinwand: {
          },
          isLeinwand: {
          },
          removePC: {
          }
        },
        mode3: {
          isStarted: {
            text: "Boolean"
          },
          yesJoin: {
          },
          yesCreate: {
          },
          yesInGame: {
          },
          clientAlreadyExist: {
          },
          roomNotExist: {
          },
          roomAlreadyExist: {
          }
        },
        mode4: {
          start: {
            imposters: "Array"
          }
        },
        mode5: {
          emergencyMeeting: {
            caller: "String"
          },
          startMeeting: {
          },
          noMeetingsLeft: {
          },
          impostersWon: {
          },
          crewmatesWon: {
          },
          gotKicked: {
          },
          checkTask:{
            approved: "Boolean",
            error: "String",
            g: "String",
            t: "String"
          },
          openMeeting: {
          },
          onTask: {
            g: "String",
            t: "String"
          },
          killed: {
            deadPlayer: "String"
          },
          sabotageCam: {
          }
        },
        mode6: {
          emergencyMeeting: {
            caller: "String"
          },
          startMeeting: {
          },
          normalScreen: {
          },
          impostersWon: {
          },
          crewmatesWon: {
          },
          gotKicked: {
          },
          revealVotes: {
          },
          tieScreen: {
          },
          onTask: {
            g: "String",
            t: "String"
          },
          onProgress: {
            progress: "Number"
          }
        },
        mode7: {
          normalScreen: {
          },
          revealVotes: {
          },
          tieScreen: {
          }
        },
        mode8: {
          camIsSabotage: {
          },
          camIsRepaired: {
          }
        },
        mode9: {
          camIsSabotage: {
          },
          camIsRepaired: {
          }
        }
      }
    }
  },


  created() {

  },

  mounted() {
    this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

    this.socket.addEventListener('open', (event) => {
      console.log("socket for control connected")

    });

    this.socket.addEventListener('message', (event) => {
    });
  },

  methods: {

    onEngine(){
      this.mode = 1
    },

    onRegister(){
      this.mode = 2
    },

    onMainPage(){
      this.mode = 3
    },

    onPlayerPage(){
      this.mode = 4
    },

    onMainOverlayPage(){
      this.mode = 5
    },

    onLeinwandPage(){
      this.mode = 6
    },

    onMeetingPage(){
      this.mode = 7
    },

    onPCPage(){
      this.mode = 8
    },

    onCamPage(){
      this.mode = 9
    },

    onReset(){
      let dat = {
        type: "root",
        func: "resetServer"
      }
      this.send(dat)
    },




    exit(){
      this.$emit("close")
    },

    goBack(){
      this.mode = 0
    },

    execute(func){
      let params = this.getAllParams("mode" + this.mode, func)
      let values = []
      let dat = {
        func: func
      }
      for(let i = 0; i < params.length; i++){
        let value = document.getElementById("mode" + this.mode + "-" + func + "-" + params[i]).value
        if(value !== ""){
          let type = this.data["mode" + this.mode][func][params[i]]
          if(type === "Number"){
            dat[params[i]] = Number(value)
          }else if(type === "String"){
            dat[params[i]] = value
          }else if(type === "Boolean"){
            dat[params[i]] = Boolean(value)
          }else if(type === "Array"){
            dat[params[i]] = value.split(",")
          }
        }
      }

      if(this.mode === 1){
        dat.type = "engine"
      }else if(this.mode === 2){
        dat.type = "register"
      }else{
        dat.type = "pass"
      }

      console.log(dat)

      if(this.everyone){
        dat.type = "passAll"
      }else{
        dat.player = this.customPlayer
      }

      this.send(dat)

    },

    getAllFunc(mode){
      let dat = this.data[mode]
      let keys = Object.keys(dat)
      return keys
    },

    getAllParams(mode, func){
      let dat = this.data[mode][func]
      let keys = Object.keys(dat)
      return keys
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
  },

}
</script>

<style>
.modal-mask-saved {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper-saved {
  display: table-cell;
}

.modal-container-saved {
  display: block;
  margin: 0px auto;
  padding: 5px 5px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}


@media (max-width: 740px) {
/*
  .modal-container-saved{
    width: 90vw;
  }*/

}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}


.modal-enter-from .modal-container-saved,
.modal-leave-to .modal-container-saved {
  opacity: 0;
}
</style>