<style>

.wall-brick{
  max-width: 200px;
  object-fit: contain;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Mauer bauen" text="Die Philister möchten dich angreifen. Baue eine Mauer um dich zu schützen."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <p>Ziehe die Steinklötze in die Mauer rein</p>
  </div>

  <div class="max-width center">
    <drag  class="brick-drag-layout center"><img src="../../../assets/tasks/brick.png" class="brick-drag"></drag>
  </div>

  <div style="height: 100px"></div>

  <div class="max-width center-horizontal">
    <div class="grid5 max-width">
      <drop class="wall-brick" v-for="(dat, index) in bricks" @drop="onDrop(index)">
        <img src="../../../assets/tasks/brick_transparent.png" class="max-width" v-if="!dat">
        <img src="../../../assets/tasks/brick.png" class="max-width" v-else>
      </drop>
    </div>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import { Drag, Drop } from "vue-easy-dnd";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
    name: "G2T6",
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

    },


    methods: {

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