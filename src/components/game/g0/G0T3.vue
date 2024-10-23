<style>

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Israels Mauer reparieren" text="Die Philister haben Stellen an der Mauer demoliert. Du musst jetzt die Mauer reparieren um die Israeliten zu schützen."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>

  

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import { Drag, Drop } from "vue-easy-dnd";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  //[fix wiring] Israels Mauer reparieren
    name: "G0T2",
    components: {TaskDescriptionPopup, UIButton, Drag, Drop},
    data() {
        return {
          bricks: ["1", "2", "3", "4", "5", "6"],
          oneDropped: false,
          twoDropped: false,
          aDropped: false,
          bDropped: false,
          taskShow: true,
          taskSuccess: false
        };
    },

    created() {

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
          if(this.bricks[i] !== found){
            list.push(this.bricks[i])
          }
        }
        this.bricks = list;

        if(list.length === 0){
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

      getCookies(key){
        return this.$cookies.get(key);
      },
      setCookies(key, value){
        return this.$cookies.set(key, value, 2147483647);
      },
    }
}
</script>