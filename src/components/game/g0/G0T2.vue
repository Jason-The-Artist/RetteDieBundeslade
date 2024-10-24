<style>
.drag {
  width: 60px;
  height: 60px;
  background-color: rgb(220, 220, 255);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0 10px;
  font-size: 20px;
  transition: all 0.5s;
}

.group {
  display: flex;
}

.as,
.bs,
.ones,
.twos {
  margin: 20px 10px;
  border: 1px solid #6a6a6a;
  height: 100px;
  position: relative;
  flex: 1;
  padding: 10px;
}

.as::before,
.bs::before,
.ones::before,
.twos::before {
  color: rgba(90, 90, 90, 0.4);
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.as::before {
  content: "As";
}

.bs::before {
  content: "Bs";
}

.ones::before {
  content: "ONEs";
}

.twos::before {
  content: "TWOs";
}

.drop-allowed {
  background-color: rgba(0, 255, 0, 0.2);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.drop-in {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}

.brick{
  width: 25%;
  max-width: 200px;
  object-fit: contain;
}

.brick-drag-layout{
  width: 100%;
}

.brick-drag{
  width: 90%;
  max-width: 200px;
  max-height: 10vw;
  object-fit: contain;
}

.brick-layout{
  width: 100%;
  max-width: 1200px;
}

</style>

<template>

  <TaskDescriptionPopup :show="taskShow" @clicked="onClicked" title="Israels Mauer reparieren" text="Die Philister haben Stellen an der Mauer demoliert. Du musst jetzt die Mauer reparieren, um die Israeliten zu schützen."/>
  <TaskDescriptionPopup :show="taskSuccess" @clicked="onSuccessClick" title="Task geschafft!" text="Du hast diese Task erfolgreich geschaft. Mache jetzt weitere Tasks oder beobachte die anderen Israeliten."/>
  <div class="center-horizontal">
    <UIButton title="Task schließen" @clicked="onClose"/>
  </div>
  <div style="height: 20px"></div>

  <div class="center-horizontal">
    <p>Ziehe die Steinklötze in die Mauer rein</p>
  </div>

  <div class="max-width center">
    <drag v-for="n in bricks" :key="n" class="brick-drag-layout center" :data="n" :type="typeof n"><img src="../../../assets/tasks/brick.png" class="brick-drag"></drag>
  </div>

  <div style="height: 100px"></div>

  <div class="max-width center-horizontal">
    <div>
      <div class="brick-layout flex">
        <img src="../../../assets/tasks/brick.png" class="brick">
        <img src="../../../assets/tasks/brick.png" class="brick">

        <drop class="brick" @drop="onDrop('6')" accepts-type="string" :accepts-data="(d) => d === '6'">
          <img src="../../../assets/tasks/brick_transparent.png" class="max-width" v-if="bricks.includes('6')">
          <img src="../../../assets/tasks/brick.png" class="max-width" v-else>
        </drop>
        <drop class="brick" @drop="onDrop('5')" accepts-type="string" :accepts-data="(d) => d === '5'">
          <img src="../../../assets/tasks/brick_transparent.png" class="max-width" v-if="bricks.includes('5')">
          <img src="../../../assets/tasks/brick.png" class="max-width" v-else>
        </drop>
      </div>
      <div class="brick-layout flex">
        <img src="../../../assets/tasks/brick.png" class="brick">

        <drop class="brick" @drop="onDrop('4')" accepts-type="string" :accepts-data="(d) => d === '4'">
          <img src="../../../assets/tasks/brick_transparent.png" class="max-width" v-if="bricks.includes('4')">
          <img src="../../../assets/tasks/brick.png" class="max-width" v-else>
        </drop>
        <drop class="brick" @drop="onDrop('3')" accepts-type="string" :accepts-data="(d) => d === '3'">
          <img src="../../../assets/tasks/brick_transparent.png" class="max-width" v-if="bricks.includes('3')">
          <img src="../../../assets/tasks/brick.png" class="max-width" v-else>
        </drop>

        <img src="../../../assets/tasks/brick.png" class="brick">
      </div>
      <div class="brick-layout flex">
        <img src="../../../assets/tasks/brick.png" class="brick">

        <drop class="brick" @drop="onDrop('2')" accepts-type="string" :accepts-data="(d) => d === '2'">
          <img src="../../../assets/tasks/brick_transparent.png" class="max-width" v-if="bricks.includes('2')">
          <img src="../../../assets/tasks/brick.png" class="max-width" v-else>
        </drop>
        <drop class="brick" @drop="onDrop('1')" accepts-type="string" :accepts-data="(d) => d === '1'">
          <img src="../../../assets/tasks/brick_transparent.png" class="max-width" v-if="bricks.includes('1')">
          <img src="../../../assets/tasks/brick.png" class="max-width" v-else>
        </drop>

        <img src="../../../assets/tasks/brick.png" class="brick">
      </div>
      <div class="brick-layout flex">
        <img src="../../../assets/tasks/brick.png" class="brick">
        <img src="../../../assets/tasks/brick.png" class="brick">
        <img src="../../../assets/tasks/brick.png" class="brick">
        <img src="../../../assets/tasks/brick.png" class="brick">
      </div>
    </div>
  </div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue";
import { Drag, Drop } from "vue-easy-dnd";
import TaskDescriptionPopup from "@/components/views/TaskDescriptionPopup.vue";

export default {
    name: "G0T2",
    components: {TaskDescriptionPopup, UIButton, Drag, Drop},
    data() {
        return {
          bricks: ["1", "2", "3", "4", "5", "6"],
          oneDropped: false,
          twoDropped: false,
          aDropped: false,
          bDropped: false,
          taskShow: true,
          taskSuccess: false
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

      onDrop(found) {
        let list = []
        for(let i = 0; i < this.bricks.length; i++) {
          if(this.bricks[i] !== found){
            list.push(this.bricks[i])
          }
        }
        this.bricks = list;

        if(list.length === 0){
          this.onSuccess()
        }
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