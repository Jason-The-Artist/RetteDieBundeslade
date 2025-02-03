

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask-saved">
      <div class="modal-wrapper-saved">
        <div class="modal-container-saved" style="background: #00000022">
          <div style="justify-content: center">
            <div class="center-horizontal">
              <div>

                <div class="center-horizontal full-size" style="background: #000000">
                  <div class="center-horizontal" style="width: 90%">
                    <div>
                      <div class="center-horizontal">
                        <h1 class="text-center">{{title}}</h1>
                      </div>
                      <div class="center-horizontal">
                        <p class="white text-center">{{text}}</p>
                      </div>

                      <div class="center-horizontal">
                        <UIButton title="Verstanden" @clicked="onClicked"/>
                      </div>
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
  name: "TaskDescriptionPopup",
  components: {UIButton},

  props: {
    show: Boolean,
    title: String,
    text: String,
    isResolved: Boolean,
  },
  data(){
    return{
      socket: null,
      oneTime: true
    }
  },

  updated() {
    console.log("in updated: " + this.show + " " + this.oneTime)
    if(this.show && this.oneTime){
      console.log("in one time")
      this.oneTime = false
      this.taskFinished()
    }
  },


  created() {

  },

  mounted() {
    console.log("in mounted")
    if(this.isResolved){
      console.log("in resolved")
      this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

      this.socket.addEventListener('open', (event) => {
        let dat = {
          type: "register",
          func: "replaceClient",
          player: this.getCookies("username")
        };
        this.send(dat)

      });

      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        console.log(message)
      });
    }
  },

  methods: {

    onClicked(){
      this.$emit("clicked")
    },

    taskFinished(){
      console.log("in task finished")
      let arr = this.$route.fullPath.split("/")
      let g = arr[1]
      let t = arr[2]

      if(g === "g1" && t === "t8" ||
        g === "g1" && t === "t1"){
        let dat = {
          type: "engine",
          func: "nextTask",
          player: this.getCookies("username"),
          g: g,
          t: t
        }

        this.send(dat)
      }else{
        let dat = {
          type: "engine",
          func: "taskFinished",
          player: this.getCookies("username"),
          g: g,
          t: t
        }

        this.send(dat)
      }

    },

    send(dat){
      try{
        this.socket.send(JSON.stringify(dat))
      }catch (e){
        if(this.socket !== undefined){
          console.log(e)
          setTimeout(() => {
            this.send(dat)
          },500)
        }
      }

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