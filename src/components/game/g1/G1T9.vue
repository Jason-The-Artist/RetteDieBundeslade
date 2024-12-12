<style>

.dice{
  width: 60px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="6 würfeln" text="Dir ist langweilig. Deswegen versuchst du eine 6 zu würfeln."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div style="height: 50px"></div>

  <div class="center-horizontal">
    <transition name="dice">
      <div v-if="diceMode > 0">
        <img src="../../../assets/tasks/d1.png" v-if="diceMode === 1" class="dice">
        <img src="../../../assets/tasks/d2.png" v-if="diceMode === 2" class="dice">
        <img src="../../../assets/tasks/d3.png" v-if="diceMode === 3" class="dice">
        <img src="../../../assets/tasks/d4.png" v-if="diceMode === 4" class="dice">
        <img src="../../../assets/tasks/d5.png" v-if="diceMode === 5" class="dice">
        <img src="../../../assets/tasks/d6.png" v-if="diceMode === 6" class="dice">
      </div>
    </transition>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <UIButton title="Würfeln" @clicked="onDrop"/>
  </div>

  <div class="center-horizontal">
    <p class="text-center">Versuche eine 6 zu würfeln.</p>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";
import {nextTick} from "vue";

export default {
  name: "G1T9",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      showDice: false,
      blockedDrop: false,
      diceMode: -1
    };
  },

  created() {

  },
  mounted() {

  },


  methods: {

    getRandom(max) {
      return Math.floor(Math.random() * max);
    },

    onDrop(){
      if(!this.blockedDrop){
        this.blockedDrop = true;
        this.diceMode = 0
        nextTick(() => {
          this.diceMode = this.getRandom(6) + 1
          if(this.diceMode === 6){
            setTimeout(() => {
              this.onSuccess()
            },1000)
          }else{
            setTimeout(() => {
              this.blockedDrop = false;
            },1000)
          }
        })

      }
    },

    onClicked() {
      this.taskShow = false
      this.showDice = true
    },

    onSuccess() {
      this.taskSuccess = true
    },

    onSuccessClick() {
      this.taskSuccess = false
      this.$router.push('/overlay')
    },

    onClose() {
      this.$router.push('/overlay')
    },

    getCookies(key) {
      return this.$cookies.get(key);
    },
    setCookies(key, value) {
      return this.$cookies.set(key, value, 2147483647);
    },
  }
}
</script>