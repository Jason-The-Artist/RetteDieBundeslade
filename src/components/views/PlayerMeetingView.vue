<template>

<div class="player-card-meeting dead-card-background center-horizontal" :class="getDeadCss()" v-if="dead">
    <div class="center">
        <div class="center">
            <h3 :class="currentDead ? 'current-dead-color' : 'dead-color'">{{name}}</h3>
        </div>
    </div>
</div>

  <div class="player-card-meeting center-horizontal" :class="getCustomCss()" v-else>
    <div class="center">
      <div class="center">
        <h3 v-if="voted" class="voted-color" style="margin: 0px">{{dummy ? 'Keinen voten' : name}}</h3>
        <h3 v-else-if="gaveVote" class="green" style="margin: 0px">{{dummy ? 'Keinen voten' : name}}</h3>
        <h3 v-else style="margin: 0px">{{dummy ? 'Keinen voten' : name}}</h3>
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
      currentDead: Boolean,
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