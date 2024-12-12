<style>

.stone{
  width: 100%;
}

.stone-layout{
  width: 100%;
  max-width: 1200px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Wand einschlagen" text="Im Lager der Philister blokiert dich eine Wand. Schlage diese Wand ein, um weiterzukommen."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <p class="text-center">Schlage auf die Mauer ein (klicke auf die Mauer)</p>
  </div>

  <div class="center-horizontal" :class="shake ? 'shake' : ''" @click="onWall">
    <div class="grid5 stone-layout">
      <div v-for="dat in list">
        <img src="../../../assets/tasks/brick.png" class="stone" v-if="dat">
        <img src="../../../assets/tasks/brick.png" class="stone" v-else style="opacity: 0">
      </div>
    </div>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
    name: "G0T9",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          taskShow: true,
          taskSuccess: false,
          list: [],
          shake: false,
          wallIndex: 0,
          wallQueue: [[7,4,8,3], [2,9,11,6], [1, 5, 0, 10], [18,19, 14, 15], [12,13,16,17]]
        };
    },

    created() {
      for(let i = 0; i < 20; i++) {
        this.list.push(true)
      }
    },
    mounted() {

    },


    methods: {

      timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },

      onWall(){
        if(!this.shake){
          let toHide = this.wallQueue[this.wallIndex]
          for(let i = 0; i < toHide.length; i++) {
            this.list[toHide[i]] = false
          }

          this.wallIndex++
          if(this.wallIndex === 5){
            setTimeout(()=>{
              this.onSuccess()
            },500)
          }
        }
        this.shake = true
        setTimeout(() => {
          this.shake = false
        },500)

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