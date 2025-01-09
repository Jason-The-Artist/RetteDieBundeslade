
<style scoped>

.cam {
  width: 100%;
  height: 100%;
  aspect-ratio: 4/3;
  border: solid 2px white;
  max-height: 800px;
  max-width: 1700px;
}

</style>

<template>


  <div>
    <div class="center full-size" v-if="!sabotage">
      <div class="cam">
        <qrcode-stream @detect="onDetect" :paused="true"></qrcode-stream>
      </div>
    </div>
    <div class="center full-size" v-else>
      <div class="cam center">
        <img src="../assets/tv-error.gif" style="width: 100%; height: 100%">
      </div>
    </div>
  </div>

</template>


<script>

export default {
    name: "CamPage",
    components: {},
    data() {
        return {
          sabotage: false,
          socket: null
        };
    },

    created() {

    },
    mounted() {

      this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

      this.socket.addEventListener('open', (event) => {

        let dat = {
          type: "register",
          func: "registerCam"
        }
        this.socket.send(JSON.stringify(dat));

      });

      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        console.log(message)
        if(message.func === "camIsSabotage"){
          this.sabotage = true
        }else if(message.func === "camIsRepaired"){
          this.sabotage = false
        }
      });

    },

    methods: {

      send(data){
        this.socket.send(JSON.stringify(data))
      },

      onDetect(){
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