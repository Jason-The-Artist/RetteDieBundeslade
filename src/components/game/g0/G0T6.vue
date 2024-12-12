<style>
.item{
  width: 100%;
  max-width: 200px;
}

.hide{
  opacity: 0;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Götze wegschmeißen" text="Du hast Götzen im Haus. Schmeiße sie alle weg."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <RemoveFigures @finished="onSuccess()"/>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";
import RemoveFigures from "@/components/game/templates/RemoveFigures.vue";

export default {
    name: "G0T6",
    components: {RemoveFigures, TaskDescriptionPopup, UIButton},
    data() {
        return {
          taskShow: true,
          taskSuccess: false,
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