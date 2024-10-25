

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper-saved">
        <div class="modal-container-saved" style="background: #00000022">
          <div style="justify-content: center">
            <div class="center-horizontal" style="margin-top: 20px">
              <div>


                <div style="height: 100px"></div>

                <div class="center-horizontal">
                  <img src="../../assets/emergency-icon.svg" style="width: 200px"/>
                </div>
                <div class="center-horizontal">
                  <h1 class="red">Emergency Meeting</h1>
                </div>
                <div class="center-horizontal">
                  <h1>von {{caller}}</h1>
                </div>

                <div v-if="youCaller">
                  <div class="center-horizontal">
                    <UIButton title="Meeting starten" @clicked="onStart"/>
                  </div>
                  <div class="center-horizontal">
                    <p>Warte bis alle Spieler sich versammelt haben und starte dann erst das Meeting</p>
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
  name: "EmergencyPopup",
  components: {UIButton},

  props: {
    show: Boolean,
    caller: String,
  },
  data(){
    return{
      youCaller: false
    }
  },


  created() {

  },

  mounted() {

  },

  updated() {
    console.log(this.caller === this.getCookies("username"))
    console.log("caller: " + this.caller + " username: " + this.getCookies("username"))
    if(this.caller === this.getCookies("username")){
      this.youCaller = true
    }else{
      this.youCaller = false
    }
  },

  methods: {
    onStart(){
      this.$emit("start")
    },

    onClickStart(){

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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
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