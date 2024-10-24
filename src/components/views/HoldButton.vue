<template>

  <button class="ui-button center-horizontal" @mousedown="onDown" @mouseup="onUp" @mouseleave="onLeave" @touchstart="onTouchDown" @touchend="onTouchUp">
    <p style="margin-top: 2px" class="noselect">{{title}}</p>
  </button>
  <button class="ui-button center-horizontal shadow absolute on-bottom">

  </button>

</template>


<script>

export default {
    name: "HoldButton",
    data() {
        return {
        };
    },

    props:{
        title: String,
    },

    created() {
    },
    mounted() {
    },



    methods: {

        onDown(){
          console.log("onDown");
            this.$emit("down")
        },
      onUp(){
          console.log("onUp")
        this.$emit("up")
      },

      onLeave(){
          console.log("onLeave")
          //this.$emit("leave")
        this.onUp()
      },
      onTouchUp(){
          console.log("onTouchUp")
          //this.$emit("touchup")
        this.onUp()
      },

      onTouchDown(){
          console.log("onTouchDown")
          //this.$emit("touchdown")
        this.onDown()
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