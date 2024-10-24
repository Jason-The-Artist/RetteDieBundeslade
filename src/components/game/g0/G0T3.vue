<style>
.paper{
  max-width: 200px;
  width: 33vw;
}

.half-layout{
  width: 50%;
}

.q-layout{
  width: 50%;
}
</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Fragen beantworten" text="Du triffst auf deinem Weg ein Ahnungslosen, der Fragen zur Bibel hat. Beantworte ihm diese."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="max-width center-horizontal">
    <div class="center-horizontal" style="width: 100%; max-width: 400px;">
      <div class="half-layout">
        <img src="../../../assets/tasks/man_speaking.png" v-if="mouthOpen">
        <img src="../../../assets/tasks/man_silent.png" v-else>
      </div>
      <div class="q-layout">
        <p>{{q}}</p>
      </div>
    </div>
  </div>

  <div class="max-height center-horizontal">
    <div class="grid3">
      <div class="relative center pointer" v-for="dat in papers" @click="onPaper(dat)">
        <img src="../../../assets/tasks/schriftrolle_green.png" class="paper" v-if="dat === lightGreen">
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
  //Fragen beantworten
    name: "G0T3",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          papers: ["1. Mose", "2. Mose", "Richter", "Ruth", "Hiob", "Daniel", "1. Samuel", "2. Samuel", "Psalmen"],
          lightGreen: "",
          lightRed: "",
          fragenCounter: 4,
          qPos: -1,
          q: "",
          a: "",
          mouthOpen: false,
          questions: [
            {
              q: "Im welchen Buch wird über die Arche berichtet?",
              a: "1. Mose"
            },
            {
              q: "Im welchen Buch sterben in Moab die 2 Söhne einer Frau?",
              a: "Ruth"
            },
            {
              q: "Im welchen Buch lebte Simson?",
              a: "Richter"
            },
            {
              q: "Im welchen Buch fanden die 10 Plagen statt?",
              a: "2. Mose"
            },
            {
              q: "Im welchen Buch verlor der Protagonist alles?",
              a: "Hiob"
            },
            {
              q: "Im welchen Buch hat ein König eine große goldene Statue gebaut?",
              a: "Daniel"
            },
            {
              q: "Im welchen Buch lebte Eli?",
              a: "1. Samuel"
            },
            {
              q: "Im welchen Buch war David König?",
              a: "2. Samuel"
            },
            {
              q: "Im welchen Buch stehen Gedichte und Lieder?",
              a: "Psalmen"
            }
          ],
          taskShow: true,
          taskSuccess: false
        };
    },

    created() {

    },
    mounted() {

    },


    methods: {

      onPaper(id){
        if(id === this.a){
          this.lightGreen = id
          setTimeout(() => {
            this.lightGreen = ""
            this.showQuestion()
          },1000)
        }else{
          this.lightRed = id
          setTimeout(() => {
            this.lightRed = ""
          },1000)
        }
      },
      
      showQuestion(){
        this.qPos++
        this.fragenCounter--
        if(this.fragenCounter === -1){
          this.onSuccess()
        }else{
          let random = this.getRandom();
          let set = this.questions[random];
          this.createQuestionEffect(set.q)
          this.a = set.a;
        }
      },

      getRandom() {
        return Math.floor(Math.random() * this.questions.length);
      },

      async createQuestionEffect(q){
        this.q = ""
        this.mouthOpen = true
        let chars = q.split('')
        for(let i = 0; i < chars.length; i++) {
          await this.timeout(50)
          this.q = this.q + chars[i]
        }
        this.mouthOpen = false
      },

      timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },





      onClicked(){
        this.taskShow = false
        this.showQuestion()
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