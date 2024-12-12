<style>

.oponent-size{
  width: 100%;
  max-width: 120px;
}

.hand{
  width: 33%;
  max-width: 120px;
}

.selection-layout{
  width: 33%;
  max-width: 120px;
  margin: 10px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Schere Stein Papier" text="Ein Mann blockiert dir den Weg. Er lässt dich nur durch wenn du gegen ihn in Schere Stein Papier schlägst."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <img src="../../../assets/tasks/man_silent.png" class="oponent-size">
  </div>

  <div class="center-horizontal">
    <transition name="ssptop">
      <div v-if="modeOponent >= 0" class="max-width center-horizontal">
        <img src="../../../assets/tasks/ssp_schere.png" class="hand" style="rotate: 180deg" v-if="modeOponent === 0">
        <img src="../../../assets/tasks/ssp_stein.png" class="hand" style="rotate: 180deg" v-else-if="modeOponent === 1">
        <img src="../../../assets/tasks/ssp_papier.png" class="hand" style="rotate: 180deg" v-else-if="modeOponent === 2">
      </div>
    </transition>
  </div>
  <div class="center-horizontal">
    <transition name="ssp">
      <div v-if="modePlayer >= 0" class="max-width center-horizontal">
        <img src="../../../assets/tasks/ssp_schere.png" class="hand" v-if="modePlayer === 0">
        <img src="../../../assets/tasks/ssp_stein.png" class="hand" v-if="modePlayer === 1">
        <img src="../../../assets/tasks/ssp_papier.png" class="hand" v-if="modePlayer === 2">
      </div>
    </transition>
  </div>

  <div class="center-horizontal" v-if="modePlayer === -1">
    <div class="selection-layout center">
      <img src="../../../assets/tasks/ssp_schere.png" class="max-width pointer" @click="onSSP(0)">
    </div>
    <div class="selection-layout center">
      <img src="../../../assets/tasks/ssp_stein.png" class="max-width pointer" @click="onSSP(1)">
    </div>
    <div class="selection-layout center">
      <img src="../../../assets/tasks/ssp_papier.png" class="max-width pointer" @click="onSSP(2)">
    </div>
  </div>

  <div class="center-horizontal" v-if="outcome === -1">
    <p>Wähle Schere, Stein oder Papier</p>
  </div>
  <div class="center-horizontal" v-if="outcome === 0">
    <p>Gleichstand. Spiele nochmal.</p>
  </div>
  <div class="center-horizontal" v-if="outcome === 1">
    <p>Du hast verloren. Spiele nochmal.</p>
  </div>
  <div class="center-horizontal" v-if="outcome === 2">
    <p>Du hast gewonnen!</p>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";
import MessageForSamuel from "@/components/game/templates/MessageForSamuel.vue";

export default {
    name: "G1T5",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          taskShow: true,
          taskSuccess: false,
          modeOponent: -1,
          modePlayer: -1,
          outcome: -1
        };
    },

    created() {

    },
    mounted() {

    },


    methods: {
      onSSP(mode){
        this.modePlayer = mode
        this.modeOponent = this.getRandom(3)

        this.checkWinner()
      },

      checkWinner(){
        if(this.modeOponent === 0){
          if(this.modePlayer === 0){
            this.outcome = 0
            this.playAgain()
          }else if(this.modePlayer === 1){
            this.outcome = 2
            this.onWin()
          }else if(this.modePlayer === 2){
            this.outcome = 1
            this.playAgain()
          }
        }else if(this.modeOponent === 1){
          if(this.modePlayer === 0){
            this.outcome = 1
            this.playAgain()
          }else if(this.modePlayer === 1){
            this.outcome = 0
            this.playAgain()
          }else if(this.modePlayer === 2){
            this.outcome = 2
            this.onWin()
          }
        }else if(this.modeOponent === 2){
          if(this.modePlayer === 0){
            this.outcome = 2
            this.onWin()
          }else if(this.modePlayer === 1){
            this.outcome = 1
            this.playAgain()
          }else if(this.modePlayer === 2){
            this.outcome = 0
            this.playAgain()
          }
        }
      },

      getRandom(max) {
        return Math.floor(Math.random() * max);
      },

      onWin(){
        setTimeout(() => {
          this.onSuccess()
        },2000)
      },

      playAgain(){
        setTimeout(() => {
          this.modeOponent = -1
          this.modePlayer = -1
        },2000)
      },



      onClicked(){
        this.taskShow = false
      },

      onSuccess(){
        this.taskSuccess = true
      },

      onSuccessClick(){
        this.taskSuccess = false
        this.$router.push('/overlay')
      },

      onClose(){
        this.$router.push('/overlay')
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