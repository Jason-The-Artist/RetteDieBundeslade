<style>

.cow{
  width: 100%;
  max-width: 500px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft, weil du wurdest nicht als Philister erkannt. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div v-if="isCow">
    <div class="center-horizontal">
      <img src="../../../assets/tasks/cow.png" class="cow">
    </div>

    <div style="height: 30px"></div>

    <div class="center-horizontal">
      <p class="text-center" style="width: 90%">Eine Kuh versperrt dir den Weg. Schließe die Task und scanne sie neu ein. Vielleicht ist die Kuh dann weg.</p>
    </div>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  name: "G2T2",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskSuccess: false,
      isCow: true
    };
  },

  created() {

  },
  mounted() {
    let alreadyScanned = this.getCookies("g2t2-scanned")
    if(alreadyScanned === "true"){
      let rand = this.getRandom(3)
      if(rand === 2){
        this.setCookies("g2t2-scanned", "false")
        this.isCow = false;
        this.onSuccess()
      }
    }else{
      this.setCookies("g2t2-scanned", "true")
      this.isCow = true
    }
  },


  methods: {

    getRandom(max) {
      return Math.floor(Math.random() * max);
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