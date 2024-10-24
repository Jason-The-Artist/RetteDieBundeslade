<style>

.scan-layout{
  width: 100%;
  max-width: 400px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Antike Polizei" text="Du wirst von der antiken Polizei angehalten. Du wirst gescannt werden, um zu sehen, ob du ein Philister bist."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft, weil du wurdest nicht als Philister erkannt. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>


  <div class="center-horizontal">
    <div class="scan-layout">
      <img src="../../../assets/tasks/scanning.gif" v-if="scanStarted" class="max-width">
    </div>
  </div>

  <div class="center-horizontal" v-if="scanStarted">
    <p class="text-center">{{timerText}}</p>
  </div>

  <div class="center-horizontal" v-if="!scanStarted">
    <p class="text-center">Starte den Scannvorgang</p>
  </div>

  <div class="center-horizontal" v-if="!scanStarted">
    <UIButton title="Scannen starten" @clicked="onScan"/>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";
import MessageForSamuel from "@/components/game/templates/MessageForSamuel.vue";

export default {
    name: "G1T11",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          taskShow: true,
          taskSuccess: false,
          scanStarted: false,
          timer: 10,
          timerText: ""
        };
    },

    created() {

    },
    mounted() {

    },


    methods: {

      async onScan(){
        this.scanStarted = true;
        for(let i = 0; i < 10; i++){
          this.timerText = "Der Scannvorgang dauert noch " + this.timer + " sec."
          await this.timeout(1000)
          this.timer--
        }
        this.onSuccess()
      },

      timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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