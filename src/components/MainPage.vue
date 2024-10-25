<template>
  <ExtraFunctionPopup :show="extraShow" @leinwand="onLeinwand" @pc="onPc" @close="onExtraClose"/>

<div class="center-horizontal max-width max-height">
    <div>
      <div style="height: 100px"></div>
        <div class="center-horizontal">
          <img src="../assets/text_logo.png" style="width: 400px"/>
        </div>
      <div style="height: 20px"></div>
        <div class="center-horizontal">
          <div>
            <div>
              <input
                  ref="usernameinput"
                  :value="username"
                  placeholder="Nutzername"
                  class="username-input shadow text-color"/>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px"/>
      <div class="center-horizontal">
        <UIButton title="Spiel beitreten" @clicked="onClickJoin"/>
      </div>
      <div class="center-horizontal">
        <UIButton title="Spiel erstellen" @clicked="onClickRoom"/>
      </div>
      <div style="height: 40px"></div>
      <div class="center-horizontal">
        <UIButton title="Extrasteuerung" @clicked="onClickControl"/>
      </div>
        <div class="center-horizontal">
          <h2 class="red">{{unableMessage}}</h2>
        </div>
    </div>
</div>

</template>


<script>
import UIButton from "@/components/views/UIButton.vue"
import ExtraFunctionPopup from "@/components/views/ExtraFunctionPopup.vue";

export default {
    name: "Register",
  components: {ExtraFunctionPopup, UIButton},
    data() {
        return {
            username: "",
            socket: null,
            messages: [],
            newMessage: '',
            unableMessage: "",
            clicked: false,
          isStarted: false,
          extraShow: false,
        };
    },

    created() {
    },

    beforeUnmount() {
        window.removeEventListener('beforeunload', this.eventClose);
    },


    unmounted() {
        this.socket.close()
    },

    mounted() {

        window.addEventListener('beforeunload', this.eventClose);

        this.socket = new WebSocket(import.meta.env.VITE_SERVER_URL);

        this.socket.addEventListener('open', (event) => {
          this.unableMessage = ""

          /*let dat = {
            type: "register",
            func: "removePlayer",
            player: this.getCookies("username"),
            pb: this.getCookies("pb")
          }
          this.socket.send(JSON.stringify(dat));*/

          const message = {
            type: "ping",
            func: "isStarted"
          };
          this.socket.send(JSON.stringify(message));

        });

      this.socket.addEventListener('error', (event) => {
        this.unableMessage = "Der RDB Server ist down"

      });


        this.socket.addEventListener('message', (event) => {

          const message = JSON.parse(event.data)

          //console.log(message)
          if(message.func === "error"){
            console.error(message.text)
          }else if(message.func === "isStarted"){
            if(message.text === true){
              this.isStarted = true
            }else if(message.text === false || message.text === "undefined"){
              this.isStarted = false
            }
          }else if(message.func === "yesJoin"){
            this.$router.push('/player');
          }else if(message.func === "yesCreate"){
            this.$router.push('/player');
          }else if(message.func === "clientAlreadyExist"){
            this.unableMessage = "Der Nutzer existiert bereits"
          }else if(message.func === "roomNotExist"){
            this.unableMessage = "Es wurde kein Raum erstellt"
          }else if(message.func === "roomAlreadyExist"){
            this.unableMessage = "Es wurde bereits ein Raum erstellt"
          }
        });

        this.username = this.getCookies("username")

    },

    methods: {

        onClickJoin(){
          let username = this.$refs.usernameinput.value
          this.setCookies("username", username)

            this.clicked = true
          if(this.isStarted === true){
            this.joinUnable()
            this.clicked = false
          }else{
            if(this.clicked){
              if(this.checkUsername()){
                this.setCookies("host", "false")
                this.join()
              }
            }
          }
        },

      onDecode (decodedString) {
        console.log("decoded")
      },

      onLeinwand(){
          this.onExtraClose()
        this.$router.push('/leinwand');
      },

      onPc(){
          this.onExtraClose()
      },

      onExtraClose(){
          this.extraShow = false
      },

      addPlayer(){
        const message = {
          type: "register",
          func: "addPlayer",
          player: this.getCookies("username")
        };
        this.socket.send(JSON.stringify(message));
      },

      hostPlayer(){
        const message = {
          type: "register",
          func: "addPlayerCreator",
          player: this.getCookies("username")
        };
        this.socket.send(JSON.stringify(message));
      },

        join(){
          this.unableMessage = ""
          this.addPlayer()


        },

      createJoin(){
        this.unableMessage = ""

        let username = this.$refs.usernameinput.value

        this.setCookies("username", username)

        this.hostPlayer()

      },

      checkUsername(){
        if(this.$refs.usernameinput.value !== ""){
          return true
        }else{
          this.unableMessage = "Du musst ein Nutzername vergeben"
        }
        return false
      },

        joinUnable(){
            this.unableMessage = "Das beitreten des Spiels ist nicht möglich"
        },

        getCookies(key){
            return this.$cookies.get(key);
        },
        setCookies(key, value){
            this.$cookies.set(key, value, 2147483647);
        },
        eventClose(){
            this.socket.close()
        },

      getRandomNumbers() {
        const min = 10000000;
        const max = 99999999;

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        return randomNumber + "";
        //return "123456"
      },

      onClickControl(){
          this.extraShow = true
      },

      onClickRoom(){
          if(this.checkUsername()){
            this.setCookies("host", "true")
            this.createJoin()
          }
      },
    }
}
</script>