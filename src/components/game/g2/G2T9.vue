<style>


</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Rechnen" text="Ein Israelit will wissen, wie gut du multiplizieren kannst. Zeige ihm was du drauf hast."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft, weil du wurdest nicht als Philister erkannt. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <h1>{{term}}</h1>
  </div>

  <div class="center">
    <h2 style="margin-top: 0px; margin-bottom: 0px">Das Ergebnis ist: </h2>
    <div style="width: 5px"></div>
    <input type="number" class="number-input" ref="numinput">
  </div>

  <div class="center-horizontal">
    <p class="red">{{error}}</p>
  </div>

  <div class="center-horizontal">
    <UIButton title="Ergebnis prüfen" @clicked="onCheck"/>
  </div>


</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  name: "G2T9",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      error: "",
      term: "",
      solution: 0
    };
  },

  created() {

  },
  mounted() {
    this.createTerm()
  },


  methods: {

    getRandom(max) {
      return Math.floor(Math.random() * max);
    },

    createTerm(){
      let t1 = this.getRandom(10)
      let t2 = this.getRandom(10)
      this.solution = t1*t2
      this.term = t1 + " X " + t2
    },

    onCheck(){
      let num = Number(this.$refs.numinput.value)
      if(num !== this.solution){
        this.error = "Die eingegebene Zahl ist falsch"
      }else{
        this.error = ""
        this.onSuccess()
      }
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