<style>
.paper{
  width: 33vw;
  max-width: 200px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Richtige Reihenfolge" text="Ein Israelit hat all seine biblischen Bücher durcheinander gebracht. Hilf ihm sie wieder zu sortieren"/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="text-center">
    <p>Tippe die Bücher in der richtigen Reihenfolge an.</p>
  </div>

  <div class="max-height center-horizontal">
    <div class="grid3">
      <div class="relative center pointer" v-for="dat in papers" @click="onPaper(dat)">
        <img src="../../../assets/tasks/schriftrolle_green.png" class="paper" v-if="!order.includes(dat)">
        <img src="../../../assets/tasks/schriftrolle_red.png" class="paper" v-else-if="dat === lightRed">
        <img src="../../../assets/tasks/schriftrolle.png" class="paper" v-else>
        <h2 class="absolute black">{{ dat }}</h2>
      </div>
    </div>
  </div>


</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
    name: "G0T4",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          papers: ["1. Mose", "2. Mose", "3. Mose", "4. Mose", "5. Mose", "Josua", "Richter", "Ruth", "1. Samuel"],
          order: ["1. Mose", "2. Mose", "3. Mose", "4. Mose", "5. Mose", "Josua", "Richter", "Ruth", "1. Samuel"],
          lightRed: "",
          onTap: [],
          taskShow: true,
          taskSuccess: false
        };
    },

    created() {

    },
    mounted() {
      this.papers = this.shuffle(this.papers)
    },


    methods: {

      onPaper(id){
        if(this.order.includes(id)){
          let firstOrder = this.order[0];
          if(id === firstOrder){
            this.order = this.order.slice(1, this.order.length);
            if(this.order.length === 0){
              this.onSuccess()
            }
          }else{
            this.lightRed = id
            setTimeout(() => {
              this.lightRed = ""
            },1000)
          }
        }
      },

      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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