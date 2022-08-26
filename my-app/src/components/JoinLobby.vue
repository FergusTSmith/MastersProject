<!----------
- The JoinLobby.vue file is the component responsible for rendering the page for joining a lobby. 
- Parents: HomePage.vue
- Children: None
------------->
<template>
    <h2>TrackerHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
    <label class="Guide">Enter Lobby ID:</label><br/>
    <input id="LobbyID" ref="LobbyID" type="text">
    <p class="ErrorText">{{ lobbyError }}</p>
    <button id="Join" @click="enterLobby" type="button">Join</button>
    <button id="Back" @click="exitToHomePage" type="button">Back</button>
</template>

<script>
export default {
    methods: {
        // Only methods for this delegate their work to the HomePage.vue component, where the logic for entering a lobby is contained. 
        enterLobby(){
            if(this.$refs.LobbyID === null){
                return;
            }else{
                var lobbyID = this.$refs.LobbyID.value;
                this.$emit('enterLobby', lobbyID)
            }
        },
        exitToHomePage(){
            this.$emit('exitToHomePage');
        },
    }
}
</script>

<style>
label.Guide {
    font-size: 12px;
    color: lightgray;
}
</style>