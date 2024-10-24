<style>



</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Samuels Treffpunkt" text="Hier triffst du dich mit Samuel. Gebe ihm den Brief, den du erhalten hast."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>


  <div class="max-width center-horizontal">
    <div class="center-horizontal" style="width: 100%; max-width: 400px;">
      <div class="half-layout">

        <div class="relative center pointer max-width">
          <img src="../../../assets/tasks/samuel.png">
          <div class="absolute">
            <transition name="givebrief">
              <img src="../../../assets/tasks/schriftrolle.png" class="letter" v-if="showBrief">
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="center-horizontal">
    <UIButton title="Brief abgeben" @clicked="onBrief" v-if="!isInformed"/>
  </div>


</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";
import {nextTick} from "vue";

export default {
  name: "G1T10",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      isInformed: false,
      showBrief: false
    };
  },

  created() {

  },
  mounted() {

  },


  methods: {

    onBrief(){
      this.isInformed = true
      this.showBrief = true
      setTimeout(()=>{
        this.onSuccess()
      },2000)
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