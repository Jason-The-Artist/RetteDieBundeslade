<template>
<div class="center-horizontal">
  <h1>Task freigeschaltet</h1>
</div>
  <div class="center-horizontal">
    <p>Du hast eine neue Task freigeschaltet. Schaue auf die Karte, um zu sehen wo sie liegt.</p>
  </div>
  <div class="center-horizontal">
    <UIButton title="OK" @clicked="onClick"/>
  </div>
</template>


<script>

import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "ScanForLocation",
    components: {UIButton},
    data() {
        return {
        };
    },

    created() {

    },
    mounted() {


    },


    methods: {

      onClick() {
        this.$emit("clicked")
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