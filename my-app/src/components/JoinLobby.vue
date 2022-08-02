<template>
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <br/><br/>
    <label>Enter lobby ID:</label><br/>
    <input ref="LobbyID" type="text">
    <p class="ErrorText">{{ lobbyError }}</p>
    <button @click="enterLobby" type="button">Join</button>
    <button @click="exitToHomePage" type="button">Back</button>
</template>

<script>
export default {
    methods: {
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