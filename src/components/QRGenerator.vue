<template>

  <div class="full-size" style="background: #aaaaaa">
    <div class="center-horizontal">
      <input
          v-model="text"
          placeholder="JSON"
          class="username-input shadow text-color"/>
    </div>

    <div class="center-horizontal">
      <UIButton title="Submit" @clicked="onSubmit"/>
    </div>

    <div class="center-horizontal">
      <v-qrcode
          :text="text"
          :size="350"
          :render="RenderOptions.CANVAS"
          :correct-level="ErrorCorrectLevel.M"
          color-dark="#000000"
          color-light="#ffffff"
      />
    </div>
  </div>

</template>


<script>

import { VQrcode, RenderOptions, ErrorCorrectLevel } from 'qrcode-vuejs';
import UIButton from "@/components/views/UIButton.vue";

export default {
    name: "QRGenerator",
  computed: {
    ErrorCorrectLevel() {
      return ErrorCorrectLevel
    },
    RenderOptions() {
      return RenderOptions
    }
  },
  components: {UIButton},
    data() {
        return {
          text: "{\"func\":\"onTask\",\"g\": \"g1\",\"t\":\"t1\"}"
        };
    },

    created() {
    },

    mounted() {

    },

    methods: {

      onSubmit(){
      },


        getCookies(key){
            return this.$cookies.get(key);
        },
        setCookies(key, value){
            this.$cookies.set(key, value, 2147483647);
        },
    }
}
</script>