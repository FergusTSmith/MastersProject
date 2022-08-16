<template>
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <button @click="changeUsernamePage" type="button">Change Username</button>
    <button @click="passiveMode" type="button">View Passive Mode Stats</button>
    <br/><br/>

    <div v-if="UsernamePage" id="UsernamePage">
        <SetUsername @setUsername="setUsername($event)" @usernameToIntro="usernameToIntro"></SetUsername>
    </div>
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