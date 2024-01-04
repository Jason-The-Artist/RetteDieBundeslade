<template>

<div class="player-card-dead player-card-leinwandg center-horizontal" v-if="dead">
    <div>
        <div class="center-horizontal" style="margin-top: -10px">
            <h1 class="dead-color">{{name}}</h1>
        </div>
    </div>
</div>

  <div class="player-card-meeting player-card-leinwandg center-horizontal" v-else>
    <div class="flex max-width">
      <div style="width: 10px"></div>
      <div class="left" style="margin-top: -10px">
        <h1>{{votes}}</h1>
      </div>
      <div class="center-horizontal max-width">
        <div class="center-horizontal" style="margin-top: -10px">
          <h1>{{name}}</h1>
          <img src="../../assets/haken_icon.png" style="width: 50px; height: 50px; margin-top: 12px; margin-left: 20px" v-if="gaveVote"/>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
export default {
    name: "PlayerMeetingLeinwandView",
    data() {
        return {
        };
    },

    props:{
      name: String,
      dead: Boolean,
      gaveVote: Boolean,
      votes: String
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