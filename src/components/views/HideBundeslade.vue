<template>
<div class="full-size" style="background: black">
  <div class="center-horizontal">
    <UIButton title="Abbrechen" @clicked="onClick"/>
  </div>
  <div style="height: 20px"></div>
  <div class="center-horizontal">
    <h1>Teil der Bundeslade verstecken</h1>
  </div>
  <h2>Teil wird versteckt{{dots}}</h2>
</div>
</template>


<script>

import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "HideBundeslade",
    components: {UIButton},
    data() {
        return {
          socket: null,
          dots: ""
        };
    },

    created() {

    },
    mounted() {

      setInterval(() => {
        this.addDots()
      },250)

      setTimeout(() => {
        this.$emit("success");
      },5000)

    },


    methods: {

      addDots(){
        if(this.dots.length < 3){
          this.dots = this.dots + "."
        }else{
          this.dots = ""
        }
      },

      onClick() {
        this.$emit("close")
      },
    }
}
</script>