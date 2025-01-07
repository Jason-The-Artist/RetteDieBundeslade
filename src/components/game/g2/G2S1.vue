<style>

.fire{
  max-width: 150px;
  object-fit: contain;
}

.bucket-drag{
  width: 90%;
  max-width: 150px;
  max-height: 10vw;
  object-fit: contain;
}

</style>

<style scoped>
.drop-allowed {
  background-color: rgba(0, 255, 0, 0);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.drop-in {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}
</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Feuer löschen" text="Die Philister haben ein Feuer gelegt. Lösche es bevor es zu spät ist"/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <p>Ziehe den Wassereimer zu den Flammen.</p>
  </div>

  <div class="max-width center">
    <drag class="bucket-drag-layout center"><img src="../../../assets/tasks/water_bucket.png" class="bucket-drag"></drag>
  </div>

  <div style="height: 100px"></div>

  <div class="max-width center-horizontal">
    <div class="grid5 max-width">
      <drop class="fire" v-for="(dat, index) in bricks" @drop="onDrop(index)">
        <img src="../../../assets/tasks/fire.gif" class="max-width" v-if="!dat">
        <img src="../../../assets/tasks/fire.gif" style="opacity: 0" class="max-width" v-else>
      </drop>
    </div>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import { Drag, Drop } from "vue-easy-dnd";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
    name: "G2S1",
    components: {TaskDescriptionPopup, UIButton, Drag, Drop},
    data() {
        return {
          bricks: [],
          oneDropped: false,
          twoDropped: false,
          aDropped: false,
          bDropped: false,
          taskShow: true,
          taskSuccess: false
        };
    },

    created() {
      for(let i = 0; i < 5*3; i++){
        this.bricks.push(false)
      }
    },
    mounted() {
      this.spreadFire()
    },


    methods: {

      spreadFire(){
        let sleep = (this.getRandom(3) + 1) * 3000
        let trueList = this.getAllTrue()
        let randomListIndex = this.getRandom(trueList.length)
        let randomPos = trueList[randomListIndex]
        this.bricks[randomPos] = false
        setTimeout(() => {
          if(this.getAllTrue().length !== this.bricks.length){
            this.spreadFire()
          }
        }, sleep)
      },

      getAllTrue(){
        let list = []
        for(let i = 0; i < this.bricks.length; i++){
          if(this.bricks[i]){
            list.push(i)
          }
        }
        return list
      },

      getRandom(max) {
        return Math.floor(Math.random() * max);
      },

      onClicked(){
        this.taskShow = false
      },

      onDrop(found) {
        let list = []
        for(let i = 0; i < this.bricks.length; i++) {
          if(i !== found){
            list.push(this.bricks[i])
          }else{
            list.push(true)
          }
        }
        this.bricks = list;

        if(!list.includes(false)){
          this.onSuccess()
        }
      },

      onSuccess(){
        this.taskSuccess = true
      },

      onSuccessClick(){
        this.taskSuccess = false
        this.$router.push('/overlay')
      },

      onClose(){
        //this.$router.push('/overlay')
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