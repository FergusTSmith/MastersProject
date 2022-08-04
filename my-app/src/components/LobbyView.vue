
<template>
    <h2>TrackHunt</h2>
    <p class="HelpText">Lobby ID: {{ playersLobby }}</p>
    <!----Animation of the wheel turning ----->
    <div class="RadioButtons">
    <p v-if="isLobbyCreator" class="HelpText">Choose GameMode:</p>
    <input id="Classic" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label for="Classic" v-if="isLobbyCreator">Classic</label>
    <input id="Bingo" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label for="Bingo" v-if="isLobbyCreator">Bingo</label>
    </div>

    <div class="Players">
    <p class="HelpText">Connected Players:</p>
    <!----https://codesandbox.io/s/7jmjmjp7q1?file=/src/App.vue - Kick buttons inspired by this tutorial-->
    <li v-for="(item, count) in UsersInLobby" class="LobbyUsers" :class="{ active: show === count}" :key="count" @mouseover="show = count" @mouseout="show = false">
        {{ ++count }}. {{ item.userID }} <button v-if="(item.userID != this.UsersID)" @click="kickPlayer(item.userID)">Kick</button> 
    </li>
    <br/><br/>
    </div>

    <!------<button class="Radio" type="button">Roulette</button>--->
    <br/>
    <!-----This should only be visible for the lobby leader: ---->
    <div class="RadioButtons">
    <p v-if="isLobbyCreator" class="HelpText">Choose length of round:</p>
    <input id="2mins" v-if="isLobbyCreator" class="Radio" type="radio" value="120" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="2mins" v-if="isLobbyCreator">2 min</label>
    <input id="5mins" v-if="isLobbyCreator" class="Radio" type="radio" value="300" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="5mins" v-if="isLobbyCreator">5 min</label>
    <input id="10mins" v-if="isLobbyCreator" class="Radio" type="radio" value="600" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="10mins" v-if="isLobbyCreator">10 min</label>
    </div>
    <br/>
    <button v-if="isLobbyCreator" @click="closeLobby" type="button">Close Lobby</button>
    <button v-if="isLobbyCreator" type="button" @click="openInvite">Invite Player</button>
    <div v-if="playerInvite">
    <input class="textBox" v-if="playerInvite" ref="usernameInvite" type="text" id="Invite"/><label v-if="playerInvite" class="HelpText">Username</label>
    <br/>
    <button v-if="playerInvite" @click="invitePlayer">Invite</button>
    <br/>
    </div>
    <button @click="multiGameInitiated" type="button">Begin Game</button>
    <!------<button @click="exitToHomePage" type="button">Cancel</button>---->
    <button @click="leaveGame" type="button">Leave Game</button>
</template>

<script>
export default {
    props: {
        playersLobby: {
            type: String,
            required: true
        },
        UsersInLobby: {
            type: Array,
            required: true
        },
        isLobbyCreator: {
            type: Boolean,
            required: true
        },
        UsersID: {
            type: String,
            required: true
        }
    },
    methods: {
        onGameModeChange(){
            var gameModeSelected = event.target.value;
            this.$emit('onGameModeChange', gameModeSelected);
        },
        onTimeChange(){
            var timeSelected = event.target.value;
            this.$emit('onTimeChange', timeSelected)
        },
        closeLobby(){
            this.$socket.emit('closeLobby', this.playersLobby)
            this.$emit('exitToHomePageReset');
        },
        multiGameInitiated(){
            this.$emit('multiGameInitiated');
        },
        leaveGame(){
            this.$emit('leaveGame');
        },
        openInvite(){
            if(this.playerInvite === false){
                this.playerInvite = true;
            }else{
                this.playerInvite = false;
            }
        },
        invitePlayer(){
            var inviteUsername = this.$refs.usernameInvite.value;
            this.$socket.emit('playerInvited', inviteUsername, this.UsersID, this.playersLobby);
        },
        kickPlayer(userID){
            console.log(userID)

            var newLobbyUsers = [];

            for(var i = 0; i < this.UsersInLobby.length; i++){
                if(this.UsersInLobby[i].userID === userID){
                    newLobbyUsers = this.UsersInLobby.splice(i, 1);
                }
            }

            this.$socket.emit('playerLeft', newLobbyUsers, this.playersLobby, userID)
        },
    },
    data(){
        return {
            playerInvite: false,
            show: false,
        }
    }
}
</script> 

<style>
div.Players {
    margin-top: 40px;
}
input.textBox {
    width: 100px;
}
label.HelpText {
    color: lightgrey;
    font-size: 10px;
}

li:hover {
    color: red;
}

li.active {
    color: red;
}
</style>