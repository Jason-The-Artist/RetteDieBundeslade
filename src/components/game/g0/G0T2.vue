<template>

</template>


<script>

import UIButton from "@/components/views/UIButton.vue";
import ScanForLocation from "@/components/game/templates/ScanForLocation.vue";

export default {
  //[fix wiring] Israels Mauer reparieren
    name: "G0T1",
    components: {ScanForLocation, UIButton},
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
        this.$router.push("/overlay");
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