<style>

.grid-img{
  width: 100%;
  border-radius: 10px;
}

.grid-element{
  width: 100%;
  max-width: 200px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Echter Israelit" text="Die Israeliten zweifeln an, ob du die Bundeslade überhaubt erkennst. Zige den Israeliten, dass du weißt, wie die Bundelsade aussieht."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft, weil du wurdest nicht als Philister erkannt. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <p class="text-center">Drücke auf das Bild, welches die Bundeslade anzeigt.</p>
  </div>

  <div class="center-horizontal">
    <div class="grid3" style="gap: 5px">
      <div v-for="dat in list" class="grid-element pointer" @click="onChoose(dat)">
        <img src="../../../assets/tasks/bundeslade.jpg" v-if="dat" class="grid-img">
        <img src="../../../assets/tasks/kiste.jpg" v-else class="grid-img">
      </div>
    </div>
  </div>


</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  name: "G2T3",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      list: [],
      counter: 5
    };
  },

  created() {

  },
  mounted() {
    this.createList()
  },


  methods: {

    getRandom(max) {
      return Math.floor(Math.random() * max);
    },

    onChoose(bool){
      if(bool){
        this.counter--
        if(this.counter < 0){
          this.onSuccess()
        }else{
          this.createList()
        }
      }
    },

    createList(){
      this.list = []
      let rand = this.getRandom(9)
      for (let i = 0; i < 9; i++) {
        if(rand === i){
          this.list.push(true)
        }else{
          this.list.push(false)
        }
      }
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