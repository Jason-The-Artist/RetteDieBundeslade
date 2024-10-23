<style>
.item{
  width: 100%;
}

.hide{
  opacity: 0;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Götze wegschmeißen" text="Du hast Götzen im Haus. Schmeiße sie alle weg."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>

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
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  //Götzen wegschmeißen
    name: "G0T5",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          taskShow: true,
          taskSuccess: false,
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
          this.onSuccess()
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

      getCookies(key){
        return this.$cookies.get(key);
      },
      setCookies(key, value){
        return this.$cookies.set(key, value, 2147483647);
      },
    }
}
</script>