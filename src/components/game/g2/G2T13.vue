<style>

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Ausdauer" text="Um dich vor den Philistern zu schützen, brauchst du Ausdauer."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft, weil du wurdest nicht als Philister erkannt. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <img src="../../../assets/tasks/kniebeugen.png" class="sitting">
  </div>

  <div class="center-horizontal">
    <p class="text-center">Mache 5 Kniebeugen.<br>Sei ehrlich und mache sie wirklich :)</p>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal" v-if="!startTimer">
    <UIButton title="OK habe ich gemacht" @clicked="onSuccess"/>
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