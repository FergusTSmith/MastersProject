
<template>
    <div v-if="LobbyPage">
    <h2>TrackHunt</h2>
    <p class="HelpText">Lobby ID: {{ playersLobby }}</p>
    <!----Animation of the wheel turning ----->
    <div class="RadioButtons">
    <p v-if="isLobbyCreator" class="HelpText">Choose GameMode:</p>
    <input id="Classic" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label id="ClassicRadio" for="Classic" v-if="isLobbyCreator">Classic</label>
    <input id="Bingo" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label id="BingoRadio" for="Bingo" v-if="isLobbyCreator">Bingo</label>
    </div>

    <div class="Players">
    <p class="HelpText">Connected Players:</p>
    <!----https://codesandbox.io/s/7jmjmjp7q1?file=/src/App.vue - Kick buttons inspired by this tutorial-->
    <li v-for="(item, count) in UsersInLobby" class="LobbyUsers" :class="{ active: show === count}" :key="count" @mouseover="show = count" @mouseout="show = false">
        {{ ++count }}. {{ item.userID }} <button v-if="(item.userID != this.UsersID) && this.isLobbyCreator" @click="kickPlayer(item.userID)">Kick</button> 
    </li>
    <br/><br/>
    </div>

    <!------<button class="Radio" type="button">Roulette</button>--->
    <br/>
    <!-----This should only be visible for the lobby leader: ---->
    <div class="RadioButtons">
    <p v-if="isLobbyCreator" class="HelpText">Choose length of round:</p>
    <input id="twoMins" v-if="isLobbyCreator" class="Radio" type="radio" value="120" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="twoMins" v-if="isLobbyCreator">2 min</label>
    <input id="fiveMins" v-if="isLobbyCreator" class="Radio" type="radio" value="300" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label id="fiveMinsRadio" for="fiveMins" v-if="isLobbyCreator">5 min</label>
    <input id="tenMins" v-if="isLobbyCreator" class="Radio" type="radio" value="600" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label id="tenMinsRadio" for="tenMins" v-if="isLobbyCreator">10 min</label>
    </div>
    <br/>
    <button id="closeLobby" v-if="isLobbyCreator" @click="closeLobby" type="button">Close Lobby</button>
    <button id="invitePlayer" v-if="isLobbyCreator" type="button" @click="openInvite">Invite Player</button>
    <div v-if="playerInvite">
    <transition name="fade"><input class="textBox" v-if="playerInvite" ref="usernameInvite" type="text" id="Invite"/></transition><label v-if="playerInvite" class="HelpText">Username</label>
    <br/>
    <button id="playerInvite" v-if="playerInvite" @click="invitePlayer">Invite</button>
    <br/>
    </div>
    <button id="beginGame" @click="multiGameInitiated" type="button">Begin Game</button>
    <!------<button @click="exitToHomePage" type="button">Cancel</button>---->
    <button id="leaveGame" @click="leaveGame" type="button">Leave Game</button>
    </div>

    <div v-if="MultiPlayer" id="Multiplayer-Game" :key="componentVersion">
        <MultiPlayerGame :playersLobby="playersLobby" :userProfile="userProfile" @playerReady="playerReady" @leaveGame="leaveGame" @gameSetup="gameSetup" @endGame="endGame" @exitToHomePageReset="exitToHomePageReset" :isLobbyCreator="isLobbyCreator" :UsersInLobby="UsersInLobby" :GameMode="GameMode"  :startTime="timer"  ></MultiPlayerGame>
    </div>
</template>

<script>
import MultiPlayerGame from '@/components/MultiPlayerGame.vue'

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
        },
        userProfile: {
            type: Object,
            required: true
        }
    },
    components: {
        MultiPlayerGame
    },
    methods: {
        onGameModeChange(){
            var gameModeSelected = event.target.value;
            //this.$emit('onGameModeChange', gameModeSelected);
            this.GameMode = gameModeSelected;
        },
        onTimeChange(){
            var timeSelected = event.target.value;
            //this.$emit('onTimeChange', timeSelected)
            this.timer = timeSelected;
        },
        closeLobby(){
            this.$socket.emit('closeLobby', this.playersLobby)
            this.$emit('exitToHomePageReset');
        },
        leaveGame(){
            var LobbyUsers = this.UsersInLobby;
            for(var i = 0; i < LobbyUsers.length; i++){
            if(LobbyUsers[i].userID === this.UsersID){
                LobbyUsers.splice(i, i+1)
                console.log("Player deleted")
                console.log(this.LobbyUsers)
            }
            }

            this.$socket.emit('playerLeft', this.LobbyUsers, this.playersLobby, this.UsersID)
            //this.playersLobby = '';
            //this.isLobbyCreator = false;
            //this.exitToHomePageReset();
            this.LobbyPage = false;
            this.$emit('exitToHomePageReset');
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

            var newLobbyUsers = this.UsersInLobby.slice();

            for(var i = 0; i < this.UsersInLobby.length; i++){
                if(this.UsersInLobby[i].userID === userID){
                    newLobbyUsers.splice(i, 1);
                }
            }

            this.$socket.emit('playerLeft', newLobbyUsers, this.playersLobby, userID)
        },
        multiGameInitiated(){
            this.LobbyPage = false;
            this.MultiPlayer = true;

            if(this.isLobbyCreator){
                this.$socket.emit('gameModeAndTime', this.playersLobby, this.GameMode, this.timer)
            }
     },
    },
    data(){
        return {
            playerInvite: false,
            show: false,
            MultiPlayer: false,
            LobbyPage: true,

            GameMode: 'Classic',
            timer: 120,
            gameOver: false,


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

/* Transitions */

/* https://learnvue.co/tutorials/vue-animation */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>