<template>
  <div class="center-horizontal">
    <p>Klicke alle Götzen an</p>
  </div>

  <div class="center-horizontal">
    <div class="grid3">
      <div v-for="(dat, index) in items" @click="onClick(index)" class="pointer">
        <img src="../../../assets/tasks/god_figure.png" v-if="dat[0] === 'figure'" class="item" :class="!dat[1] ? 'hide' : ''">
        <img src="../../../assets/tasks/vase.png" class="item" v-else>
      </div>
    </div>
  </div>
</template>


<script>

import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "RemoveFigures",
    components: {UIButton},
    data() {
        return {
          items: [["vase", true], ["vase", true], ["vase", true], ["vase", true], ["figure", true], ["figure", true], ["figure", true], ["figure", true], ["figure", true]],
        };
    },

    created() {

    },
    mounted() {
      this.items = this.shuffle(this.items);
    },


    methods: {

      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },

      onClick(index){
        let updated = []
        for(let i = 0; i < this.items.length; i++){
          if(i === index && this.items[i][0] === "figure"){
            let item = [this.items[i][0], false]
            updated.push(item)
          }else{
            updated.push(this.items[i])
          }
        }
        this.items = updated
        if(this.checkFinished()){
          this.onFinished()
        }
      },

      checkFinished() {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i][0] === "figure" && this.items[i][1]) {
            return false
          }
        }
        return true
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