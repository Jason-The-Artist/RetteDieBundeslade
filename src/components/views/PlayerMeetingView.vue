<template>

<div class="player-card-dead center-horizontal" v-if="dead">
    <div>
        <div class="center-horizontal" style="margin-top: -10px">
            <h3 :class="currentDead ? 'current-dead-color' : 'dead-color'">{{name}}</h3>
        </div>
    </div>
</div>

  <div class="player-card-meeting center-horizontal" v-else>
    <div>
      <div class="center-horizontal" style="margin-top: -10px">
        <h3 v-if="voted" class="voted-color">{{name}}</h3>
        <h3 v-else>{{name}}</h3>
        <img src="../../assets/haken_icon.png" style="width: 30px; height: 30px; margin-top: 12px; margin-left: 20px" v-if="gaveVote"/>
      </div>
    </div>
  </div>

</template>


<script>
export default {
    name: "PlayerMeetingView",
    data() {
        return {
        };
    },

    props:{
      name: String,
      voted: Boolean,
      dead: Boolean,
      gaveVote: Boolean,
      currentDead: Boolean
    },

  created() {

    },
    mounted() {

    },
    methods: {


        getCookies(key){
            return this.$cookies.get(key);
        },
        setCookies(key, value){
            return this.$cookies.set(key, value, 2147483647);
        },
    }
}
</script>