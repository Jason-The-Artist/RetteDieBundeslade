<style>



</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Öl auffüllen" text="Die Öllampe hat nicht genug Öl. Fülle sie mit Öl auf."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <FillFuel @finished="onFull" v-if="!finished"/>
  <div v-else>
    <div class="center-horizontal">
      <p class="text-center">Auf der Karte ist jetzt ein gelber Punkt erschienen wo du als nächstes hin musst. Du kannst die Task jetzt schließen.</p>
    </div>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";
import MessageForSamuel from "@/components/game/templates/MessageForSamuel.vue";
import FillFuel from "@/components/game/templates/FillFuel.vue";

export default {
  name: "G1T1",
  components: {FillFuel, MessageForSamuel, TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      finished: false
    };
  },

  created() {

  },
  mounted() {

  },


  methods: {

    onFull(){
      this.finished = true;
    },

    onClicked() {
      this.taskShow = false
    },

    onSuccess() {
      this.taskSuccess = true
    },

    onSuccessClick() {
      this.taskSuccess = false
      this.$router.push('/overlay')
    },

    onClose() {
      this.$router.push('/overlay')
    },

    getCookies(key) {
      return this.$cookies.get(key);
    },
    setCookies(key, value) {
      return this.$cookies.set(key, value, 2147483647);
    },
  }
}
</script>