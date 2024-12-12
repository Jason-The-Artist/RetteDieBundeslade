<style>

.coin{
  width: 50px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Verräter getroffen" text="Ein gemeiner Israelit will den Philistern deine Position verraten. Gebe ihm Schweigegeld, damit er nichts sagt."/>
  <TaskDescriptionPopup :show="taskSuccess" :isResolved="true" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <img src="../../../assets/tasks/man_silent.png" class="oponent-size">
  </div>

  <div class="center-horizontal">
    <transition name="coin">
      <div v-if="showCoin" class="max-width center-horizontal">
        <img src="../../../assets/tasks/coin.png" class="coin">
      </div>
    </transition>
  </div>

  <div class="center-horizontal" v-if="!blocked">
    <UIButton title="Taler geben" @clicked="onCoin"/>
  </div>

  <div class="center-horizontal" v-if="!blocked">
    <p class="text-center">Gebe ihm noch {{counter}} Taler</p>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";
import MessageForSamuel from "@/components/game/templates/MessageForSamuel.vue";

export default {
    name: "G1T11",
    components: {TaskDescriptionPopup, UIButton},
    data() {
        return {
          taskShow: true,
          taskSuccess: false,
          showCoin: false,
          coinCounter: 0,
          counter: 10,
          blocked: false
        };
    },

    created() {

    },
    mounted() {

    },


    methods: {

      onCoin(){
        if(!this.blocked){
          this.counter--
          this.blocked = true;
          this.showCoin = true
          this.coinCounter++
          setTimeout(() => {
            this.blocked = false;
            this.showCoin = false
            if(this.coinCounter >= 10){
              this.onSuccess()
            }
          },500)
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