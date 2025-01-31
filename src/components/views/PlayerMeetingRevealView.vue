<template>

<div class="player-card-dead center-horizontal" v-if="dead">
    <div>
        <div class="center-horizontal" style="margin-top: -10px">
            <h1 class="dead-color">{{name}}</h1>
        </div>
    </div>
</div>

  <div class="player-card-meeting center-horizontal" :class="dummy ? 'dummy-card-background' : 'player-card-background'" v-else>
    <div class="flex max-width">
      <div style="width: 10px"></div>
      <div class="left" style="margin-top: -10px">
        <h3>{{votes}}</h3>
      </div>
      <div class="center-horizontal max-width">
        <div class="center-horizontal" style="margin-top: -10px">
          <h3>{{dummy ? 'Keinen voten' : name}}</h3>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
export default {
    name: "PlayerMeetingRevealView",
    data() {
        return {
        };
    },

    props:{
      name: String,
      dead: Boolean,
      gaveVote: Boolean,
      votes: String,
      dummy: Boolean
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