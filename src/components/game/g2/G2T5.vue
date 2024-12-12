<style>

.pray p{
  text-align: center;
  font-size: 25px;
}

.pray span{
  background: #383838;
}

.option-layout{
  width: 33%;
  max-width: 600px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Das Vaterunser" text="Die Philister sind dir auf der Spur. Du betest zu Gott, um Schutz zu erhhalten. Vevollständige dafür das Vaterunser."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft, weil du wurdest nicht als Philister erkannt. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>


  <div class="center-horizontal pray">
    <div v-html="currentPray"></div>
  </div>

  <div class="center-horizontal">
    <div class="option-layout center pointer" @click="onOption1">
      <h3>{{currentO1}}</h3>
    </div>
    <div class="option-layout center pointer" @click="onOption2">
      <h3>{{currentO2}}</h3>
    </div>
    <div class="option-layout center pointer" @click="onOption3">
      <h3>{{currentO3}}</h3>
    </div>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  name: "G2T5",
  components: {TaskDescriptionPopup, UIButton},
  data() {
    return {
      taskShow: true,
      taskSuccess: false,
      currentPray: "",
      currentO1: "",
      currentO2: "",
      currentO3: "",
      currentRight: "",
      currentPos: -1,
      prayList: [
        {
          p: "<p>Unser Vater, der du bist im <span>________</span>.</p>",
          o1: "Weltall",
          o2: "Himmel",
          o3: "Meer",
          right: "o2"
        },
        {
          p: "<p>Geheiligt werde dein <span>________</span>.</p>",
          o1: "Name",
          o2: "Alter",
          o3: "Herkunft",
          right: "o1"
        },
        {
          p: "<p>Dein <span>________</span> komme. Dein Wille geschehe.</p>",
          o1: "Haus",
          o2: "Reich",
          o3: "König",
          right: "o2"
        },
        {
          p: "<p>Wie im Himmel, so auch auf <span>________</span>.</p>",
          o1: "dem Mars",
          o2: "dem Mond",
          o3: "Erden",
          right: "o3"
        },
        {
          p: "<p>Gib uns heute unser tägliches <span>________</span>.</p>",
          o1: "Brot",
          o2: "Wissen",
          o3: "Wasser",
          right: "o1"
        },
        {
          p: "<p>Und vergib uns unsere <span>________</span>.</p>",
          o1: "Vergehen",
          o2: "Taten",
          o3: "Schulden",
          right: "o3"
        },
        {
          p: "<p>Wie sauch wir vergeben unseren <span>________</span>.</p>",
          o1: "Geschwister",
          o2: "Eltern",
          o3: "Schuldigen",
          right: "o3"
        },
        {
          p: "<p>Und führe uns nicht in <span>________</span>.</p>",
          o1: "Versuchung",
          o2: "den Graben",
          o3: "mein Haus",
          right: "o1"
        },
        {
          p: "<p>Sondern erette uns von <span>________</span>.</p>",
          o1: "dem Glauben",
          o2: "dem Bösen",
          o3: "den Geistern",
          right: "o2"
        },
        {
          p: "<p>Denn dein ist das Reich und die <span>________</span>...</p>",
          o1: "Häuser",
          o2: "Kraft",
          o3: "Planeten",
          right: "o2"
        },
        {
          p: "<p>... und die Herrlichkeit in Ewigkeit. <span>________</span>.</p>",
          o1: "Fertig",
          o2: "Ende",
          o3: "Amen",
          right: "o3"
        }
      ]
    };
  },

  created() {

  },
  mounted() {
    this.setPray(this.currentPos)
  },


  methods: {

    setPray(){
      this.currentPos++
      if(this.currentPos === this.prayList.length){
        this.onSuccess()
      }else{
        this.currentPray = this.prayList[this.currentPos].p
        this.currentO1 = this.prayList[this.currentPos].o1
        this.currentO2 = this.prayList[this.currentPos].o2
        this.currentO3 = this.prayList[this.currentPos].o3
        this.currentRight = this.prayList[this.currentPos].right
      }
    },

    onOption1(){
      if(this.currentRight === "o1"){
        this.setPray()
      }
    },

    onOption2(){
      if(this.currentRight === "o2"){
        this.setPray()
      }
    },

    onOption3(){
      if(this.currentRight === "o3"){
        this.setPray()
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