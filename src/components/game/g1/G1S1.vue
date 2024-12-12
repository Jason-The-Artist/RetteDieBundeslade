<style>
.password-input{
  width: 120px;
  height: 35px;
  background: #383838;
  color: white;
  font-size: 25px;
}
</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Passwort eingeben" text="Die Philister haben zur Sicherheit ihr Zugangspasswort geändert. Gebe es hier ein um deine Tasks weiterzumachen."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Anderer Ort" text="Du musst das Passwort nochmal an einem anderen Ort eingeben. Du siehst auf der Karte einen roten Punk wo er sich befindet."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>


  <div class="center-horizontal">
    <div class="relative center">
      <img src="../../../assets/tasks/schriftrolle.png">
      <div class="absolute">
        <p style="font-size: 40px" class="bold black">{{password}}</p>
      </div>
    </div>
  </div>

  <div class="center-horizontal">
    <p class="red">{{error}}</p>
  </div>

  <div class="center">
    <div>
      <div class="center-horizontal">
        <h2 style="margin-top: 0px; margin-bottom: 0px">Gebe die Zahl hier ein: </h2>
      </div>
      <div style="width: 5px"></div>
      <div class="center-horizontal">
        <input type="number" class="password-input" ref="numinput">
      </div>
    </div>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <UIButton title="Passwort prüfen" @clicked="onCheck"/>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  name: "G1S1",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      breadPrice: 1,
      waterPrice: 2,
      waterCount: 0,
      breadCount: 0,
      price: 0,
      error: "",
      password: 0
    };
  },

  created() {

  },
  mounted() {
    this.password = this.generatePassword()
  },


  methods: {

    onCheck(){
      let num = Number(this.$refs.numinput.value)
      if(num !== this.password){
        this.error = "Die eingegebene Zahl ist falsch"
      }else{
        this.error = ""
        this.onSuccess()
      }
    },

    generatePassword() {
      const min = 1000000;
      const max = 9999999;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;

      return rand;
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