<template>
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <button @click="changeUsernamePage" type="button">Change Username</button>
    <button @click="passiveMode" type="button">View Passive Mode Stats</button>
    <br/><br/>
</template>

<script>
export default {
    methods: {
        changeUsernamePage(){
            this.$emit('changeUsernamePage');
            console.log("emitted");
        },
        passiveMode(){
            this.$emit('passiveMode');
        }
    }
}</script>