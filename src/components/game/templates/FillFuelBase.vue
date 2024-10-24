<style>

.fuel-icon{
  width: 100%;
  max-width: 100px;
}

.fuel-progress-background{
  background: #343434;
  width: 30px;
  height: 300px;
}

.fuel-base-progress{
  width: 30px;
  height: v-bind(cssString);
  background: #ffaa00;
}

</style>

<template>

  <div class="center-horizontal">
    <p class="text-center">Halten den Knopf gedrückt, um das Öl umzuschütten</p>
  </div>

  <div class="center-horizontal">
    <img src="../../../assets/tasks/kanister.png" class="fuel-icon">
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <div class="relative center-horizontal max-width">
      <div class="fuel-progress-background"></div>
      <div class="absolute fuel-base-progress"></div>
    </div>
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <img src="../../../assets/tasks/bottle.png" class="fuel-icon">
  </div>

  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <HoldButton title="Öl umschütten" @down="startIncrease" @up="startDecrease"/>
  </div>
  
</template>


<script>

import UIButton from "@/components/views/UIButton.vue";
import HoldButton from "@/components/views/HoldButton.vue";

export default {
    name: "FillFuelBase",
    components: {HoldButton, UIButton},
    data() {
        return {
          cssString: "0px",
          progress: 0,
          isHolding: false,
          increaseInterval: null,
          decreaseInterval: null,

        };
    },

    created() {

    },
    mounted() {

    },


    methods: {

      startIncrease() {
        clearInterval(this.decreaseInterval);
        this.increaseInterval = setInterval(() => {
          if (this.progress < 300) {
            this.progress++
            this.cssString = this.progress + "px"
          } else {
            clearInterval(this.decreaseInterval);
            this.onFinished()
          }
        }, 15); // Increase speed
      },
      startDecrease() {
        clearInterval(this.increaseInterval);
        this.decreaseInterval = setInterval(() => {
          if (this.progress > 0) {
            this.progress--
            this.cssString = this.progress + "px"
          } else {
            clearInterval(this.decreaseInterval);
          }
        }, 15);
      },

      onFinished() {
        this.$emit("finished")
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