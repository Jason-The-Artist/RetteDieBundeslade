
<style scoped>

.huge-font{
  font-size: 60px
}

</style>

<template>

  <div style="color: white" class="center-horizontal">
    <div class="flex">
      <div style="font-size: 20px" class="pointer" @click="backG0"><</div>
      <div style="width: 10px"></div>
      <div style="font-size: 20px">GO {{currentG0}}</div>
      <div style="width: 10px"></div>
      <div style="font-size: 20px" class="pointer" @click="frontG0">></div>
    </div>
    <div style="width: 80px"></div>
    <div class="flex">
      <div style="font-size: 20px" class="pointer" @click="backG1"><</div>
      <div style="width: 10px"></div>
      <div style="font-size: 20px">G1 {{currentG1}}</div>
      <div style="width: 10px"></div>
      <div style="font-size: 20px" class="pointer" @click="frontG1">></div>
    </div>
    <div style="width: 80px"></div>
    <div class="flex">
      <div style="font-size: 20px" class="pointer" @click="backG2"><</div>
      <div style="width: 10px"></div>
      <div style="font-size: 20px">G2 {{currentG2}}</div>
      <div style="width: 10px"></div>
      <div style="font-size: 20px" class="pointer" @click="frontG2">></div>
    </div>
  </div>

  <div>
    <div class="relative">
      <img src="../assets/karte/g0.png" class="karte-leinwand absolute"/>
      <img v-if="currentG0 !== 'none'" :src="'https://jasonserver.de/karte/g0_tasks/' + currentG0 + '.png'" class="karte-leinwand absolute"/>
    </div>

    <div class="relative center-horizontal">
      <img src="../assets/karte/g1.png" class="karte-leinwand absolute"/>
      <img v-if="currentG1 !== 'none'" :src="'https://jasonserver.de/karte/g1_tasks/' + currentG1 + '.png'" class="karte-leinwand absolute"/>
    </div>

    <div class="relative right">
      <img src="../assets/karte/g2.png" class="karte-leinwand absolute"/>
      <img v-if="currentG2 !== 'none'" :src="'https://jasonserver.de/karte/g2_tasks/' + currentG2 + '.png'" class="karte-leinwand absolute"/>
    </div>
  </div>

</template>


<script>
import {nextTick} from "vue";

export default {
    name: "AllTaskDebug",
  components: {},
    data() {
        return {
          g0Pos: 0,
          g1Pos: 0,
          g2Pos: 0,

          allG0: ["none", "t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"],
          allG1: ["none", "t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "s1", "s2"],
          allG2: ["none", "t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "t13", "s1"],

          currentG0: "none",
          currentG1: "none",
          currentG2: "none",
        };
    },

    created() {

    },
    mounted() {

    },

  methods: {

      frontG0(){
        if(this.g0Pos < this.allG0.length - 1){
          this.g0Pos++
          this.currentG0 = this.allG0[this.g0Pos]
        }
      },

    frontG1(){
      if(this.g1Pos < this.allG1.length - 1){
        this.g1Pos++
        this.currentG1 = this.allG1[this.g1Pos]
      }
    },

    frontG2(){
      if(this.g2Pos < this.allG2.length - 1){
        this.g2Pos++
        this.currentG2 = this.allG2[this.g2Pos]
      }
    },

    backG0(){
      if(this.g0Pos > 0){
        this.g0Pos--
        this.currentG0 = this.allG0[this.g0Pos]
      }
    },

    backG1(){
      if(this.g1Pos > 0){
        this.g1Pos--
        this.currentG1 = this.allG1[this.g1Pos]
      }
    },

    backG2(){
      if(this.g2Pos > 0){
        this.g2Pos--
        this.currentG2 = this.allG2[this.g2Pos]
      }
    },

    }
}
</script>