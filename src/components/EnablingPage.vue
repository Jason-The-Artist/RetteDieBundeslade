
<template>




</template>


<script>

export default {
    name: "EnablingPage",
    data() {
        return {
        };
    },

    created() {

    },
    mounted() {
      let dat = this.getCookies("control")
      if(dat === "true"){
        this.setCookies("control", "false")
      }else{
        this.setCookies("control", "true")
      }
      this.$router.push("/")
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