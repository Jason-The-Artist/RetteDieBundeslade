<template>

  <div class="player-card-meeting dead-card-background center-horizontal" :class="getDeadCss()" v-if="dead">
    <div class="center">
      <div class="center">
        <h3 class="dead-color">{{name}}</h3>
      </div>
    </div>
  </div>

  <div class="player-card-meeting center-horizontal" :class="getCustomCss()" v-else>
    <div class="center">
      <div class="center">
        <div class="left center-vertical">
          <h3 style="margin: 0px; color: yellow">{{votes}}</h3>
        </div>
        <div style="width: 20px"></div>
        <h3 style="margin: 0px">{{dummy ? 'Keinen voten' : name}}</h3>
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
      dummy: Boolean,
      leinwand: Boolean
    },

  created() {

    },
    mounted() {

    },
    methods: {

      getCustomCss(){
        let str = ""
        if(this.dummy){
          str = "dummy-card-background"
        }else{
          str = "player-card-background"
        }

        if(this.leinwand){
          str = str + " leinwand-card-size"
        }else{
          str = str + " normal-card-size"
        }
        return str
      },

      getDeadCss(){
        let str = ""
        if(this.leinwand){
          str = str + " leinwand-card-size"
        }else{
          str = str + " normal-card-size"
        }
        return str
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