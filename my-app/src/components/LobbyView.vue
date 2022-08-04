
<template>
    <h2>TrackHunt</h2>
    <p class="HelpText">Lobby ID: {{ playersLobby }}</p>
    <!----Animation of the wheel turning ----->
    <div class="RadioButtons">
    <p class="HelpText">Choose GameMode:</p>
    <input id="Classic" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label for="Classic" v-if="isLobbyCreator">Classic</label>
    <input id="Bingo" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label for="Bingo" v-if="isLobbyCreator">Bingo</label>
    </div>

    <div class="Players">
    <p class="HelpText">Connected Players:</p>
    <li v-for="(item, count) in UsersInLobby" class="LobbyUsers" :key="item">
        {{ ++count }}. {{ item.userID }}
    </li>
    <br/><br/>
    </div>

    <!------<button class="Radio" type="button">Roulette</button>--->
    <br/>
    <!-----This should only be visible for the lobby leader: ---->
    <div class="RadioButtons">
    <p class="HelpText">Choose length of round:</p>
    <input id="2mins" v-if="isLobbyCreator" class="Radio" type="radio" value="120" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="2mins" v-if="isLobbyCreator">2 min</label>
    <input id="5mins" v-if="isLobbyCreator" class="Radio" type="radio" value="300" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="5mins" v-if="isLobbyCreator">5 min</label>
    <input id="10mins" v-if="isLobbyCreator" class="Radio" type="radio" value="600" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="10mins" v-if="isLobbyCreator">10 min</label>
    </div>
    <br/>
    <button v-if="isLobbyCreator" @click="closeLobby" type="button">Close Lobby</button>
    <button v-if="isLobbyCreator" type="button" @click="openInvite">Invite Player</button>
    <br v-if="playerInvite"/>
    <input class="textBox" v-if="playerInvite" ref="usernameInvite" type="text" id="Invite"/><label v-if="playerInvite" class="HelpText">Username</label><button v-if="playerInvite" @click="invitePlayer">Invite</button>
    <br v-if="playerInvite"/>
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
        }
    },
    data(){
        return {
            playerInvite: false,
        }
    }
}
</script> 

<style>
div.Players {
    margin-top: 40px;
}
input.textBox {
    width: 50px;
}
label.HelpText {
    color: lightgrey;
    font-size: 10px;
}
</style>