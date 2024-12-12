<style>

.sitting{
  width: 90%;
  max-width: 400px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Eine Pause" text="Es ist mühsam die Bundeslade zu finden. Deswegen willst du eine Pause machen."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft, weil du wurdest nicht als Philister erkannt. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <img src="../../../assets/tasks/sitting.png" class="sitting">
  </div>

  <div class="center-horizontal">
    <p class="text-center">Setze dich irgendwo hin, oder setze dich auf den Boden.</p>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal" v-if="!startTimer">
    <UIButton title="OK ich sitze" @clicked="onSitting"/>
  </div>

  <div class="center-horizontal" v-if="startTimer">
    <p class="text-center">Bleibe noch {{timer}} sec. sitzen</p>
  </div>


</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  name: "G2T12",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      timer: 10,
      startTimer: false
    };
  },

  created() {

  },
  mounted() {
  },


  methods: {

    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async onSitting(){
      this.startTimer = true

      for(let i = 0; i < 10; i++){
        await this.timeout(1000)
        this.timer--
      }
      this.onSuccess()
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