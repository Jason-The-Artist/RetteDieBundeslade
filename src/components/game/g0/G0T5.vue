<style>
.paper{
  max-width: 200px;
  width: 33vw;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Schriftrollen trocknen" text="Du findest in einer Pfütze Schriftrollen. Aber eine Schriftrolle ist gefälscht. Trockne die Schriftrollen und erkenne die Fälschung."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>

  <p>Ziehe die Schriftrollen aus dem Wasser indem du den Knopf drückst</p>

  <div class="relative">
    <div class="max-height center-horizontal">
      <div class="grid3" v-if="time === 0">
        <div class="relative center pointer" v-for="dat in founded" @click="onPaper(dat)">
          <img src="../../../assets/tasks/schriftrolle_red.png" class="paper" v-if="dat === lightRed">
          <img src="../../../assets/tasks/schriftrolle.png" class="paper" v-else>
          <p class="absolute">{{ dat }}</p>
        </div>
      </div>
      <div class="grid3" v-else>
        <div class="relative center pointer" v-for="dat in founded" @click="onPaper(dat)">
          <img src="../../../assets/tasks/schriftrolle_wet.png" class="paper">
        </div>
      </div>
    </div>
    <div class="absolute" style="top: 0">
      <transition name="water">
        <div v-if="showWater">
          <img src="../../../assets/tasks/water.gif" style="opacity: 0.5">
        </div>
      </transition>
    </div>
  </div>

  <div class="max-width center-horizontal">
    <UIButton title="Wasser entfernen" @clicked="onRemoveWater"/>
  </div>


</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
  //Schriftrolle trocknen
    name: "G0T5",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          //Alles aus Sprüche
          papers: ["Stolz kommt vor dem Zusammenbruch, und Hochmut kommt vor dem Fall"/*16, 18*/,
            "Die Reden des Toren stiften Streit, und er schimpft, bis er Schläge kriegt"/*18, 6*/,
            "Der Arbeiter arbeitet für sich selbst, denn sein Hunger treibt ihn an"/*16, 26*/,
            "Besser wenig mit Gerechtigkeit, als ein großes Einkommen mit Unrecht"/*16, 8*/,
            "Ein goldener Ring in dem Rüssel einer Sau - so ist eine schöne Frau ohne Sittsamkeit"/*11, 22*/,
            "Eine anmutige Frau erlangt Ehre, Gewalttätige aber erlangen Reichtum"/*11, 16*/,
            "Der Kluge tut alles mit Vernunft, aber der Tor verbreitet Dummheiten"/*13, 16*/,
            "Ein treuer Zeuge lügt nicht, aber ein falscher Zeuge spricht Lügen aus"/*14, 5*/,
            "Ein Armer wird sogar von seinem Nächsten gehasst, ein Reicher aber hat viele Freunde"/*14, 20*/],
          lies: ["Wer den Mond nicht erreicht, sollte nach den Sternen greifen, damit er nicht fällt.",
          "Sammle Gold wie Sand, und du wirst die Armut nicht fürchten.",
          "Der Löwe mag stark sein, doch der Hase schlägt die Trommel der Geduld.",
          "Ein Haus ohne Lachen ist wie ein Baum ohne Wurzeln.",
          "Trage die Last des Anderen, doch niemals seine Schuhe.",
          "Wer die Nacht umarmt, findet den Tag schwer zu ertragen.",
          "Ein Stern fällt nicht, es sei denn, er hat zu viel geglänzt."],
          lightRed: "",
          founded: [],
          onTap: [],
          time: 10,
          showWater: true,
          taskShow: true,
          taskSuccess: false
        };
    },

    created() {

    },
    mounted() {
      let truePapers = this.getTwoRandomElements(this.papers)
      let lie = this.getRandomElement(this.lies)
      truePapers.push(lie)
      let rand = this.shuffle(truePapers)
      this.founded = rand
    },


    methods: {

      onRemoveWater(){
        this.showWater = false
      },

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
      getTwoRandomElements(array) {
        const firstIndex = Math.floor(Math.random() * array.length);
        let secondIndex;

        do {
          secondIndex = Math.floor(Math.random() * array.length);
        } while (secondIndex === firstIndex);

        return [array[firstIndex], array[secondIndex]];
      },

      getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
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

      getCookies(key){
        return this.$cookies.get(key);
      },
      setCookies(key, value){
        return this.$cookies.set(key, value, 2147483647);
      },
    }
}
</script>