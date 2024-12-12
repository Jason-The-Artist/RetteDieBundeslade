<style>

.meal-layout{
  width: 100%;
  max-width: 600px;
}

.half-layout{
  width: 45%;
}

.number-input{
  width: 60px;
  height: 35px;
  background: #383838;
  color: white;
  font-size: 25px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Preis ausrechnen" text="Du hast durch das ganze laufen hunger bekommen. Rechne den Preis aus für deine Mahlzeit."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>


  <div class="center-horizontal">
    <div class="meal-layout">
      <div class="flex max-width" style="align-items: end">
        <div class="half-layout">
          <img src="../../../assets/tasks/bread.png" class="max-width">
        </div>
        <div style="width: 10%"></div>
        <div class="half-layout">
          <img src="../../../assets/tasks/water.png" class="max-width">
        </div>
      </div>
      <div class="center">
        <div class="half-layout center">
          <p>1 Brot = {{breadPrice}} Taler</p>
        </div>
        <div style="width: 10%"></div>
        <div class="half-layout center">
          <p>1L Wasser = {{waterPrice}} Taler</p>
        </div>
      </div>
    </div>
  </div>

  <div class="center-horizontal">
    <p>Ich möchte {{breadCount}} Brote und {{waterCount}}L Wasser kaufen.</p>
  </div>

  <div class="center-horizontal">
    <p class="red">{{error}}</p>
  </div>

  <div class="center">
    <h2 style="margin-top: 0px; margin-bottom: 0px">Der Preis lautet: </h2>
    <div style="width: 5px"></div>
    <input type="number" class="number-input" ref="numinput">
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <UIButton title="Ergebnis prüfen" @clicked="onCheck"/>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
    name: "G0T8",
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
          error: ""
        };
    },

    created() {

    },
    mounted() {
      this.waterCount = this.getRandom(4) + 2
      this.breadCount = this.getRandom(4) + 2

      this.price = (this.breadCount * this.breadPrice) + (this.waterCount * this.waterPrice)
    },


    methods: {

      getRandom(max) {
        return Math.floor(Math.random() * max);
      },

      onCheck(){
        let num = Number(this.$refs.numinput.value)
        if(num !== this.price){
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