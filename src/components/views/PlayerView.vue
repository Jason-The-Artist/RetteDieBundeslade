<template>

<div class="player-card center-horizontal">
    <div>
        <div class="center-horizontal" style="margin-top: -10px">
            <h3>{{name}}</h3>
        </div>
    </div>
</div>

</template>


<script>
export default {
    name: "PlayerView",
    data() {
        return {
        };
    },

    props:{
        name: String
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