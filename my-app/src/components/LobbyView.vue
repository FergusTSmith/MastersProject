
<template>
    <h2>TrackHunt</h2>
    <p class="HelpText">Lobby ID: {{ playersLobby }}</p>
    <!----Animation of the wheel turning ----->
    <div class="RadioButtons">
    <input id="Classic" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label for="Classic" v-if="isLobbyCreator">Classic</label>
    <input id="Bingo" v-if="isLobbyCreator" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label for="Bingo" v-if="isLobbyCreator">Bingo</label>
    </div>

    <p class="HelpText">Connected Players:</p>
    <li v-for="(item, count) in UsersInLobby" class="LobbyUsers" :key="item">
        {{ ++count }}. {{ item.userID }}
    </li>
    <br/><br/>

    <!------<button class="Radio" type="button">Roulette</button>--->
    <br/>
    <!-----This should only be visible for the lobby leader: ---->
    <div class="RadioButtons">
    <input id="2mins" v-if="isLobbyCreator" class="Radio" type="radio" value="120" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="2mins" v-if="isLobbyCreator">2 min</label>
    <input id="5mins" v-if="isLobbyCreator" class="Radio" type="radio" value="300" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="5mins" v-if="isLobbyCreator">5 min</label>
    <input id="10mins" v-if="isLobbyCreator" class="Radio" type="radio" value="600" name="time" ref="Timebutton"  @change="onTimeChange($event)"/><label for="10mins" v-if="isLobbyCreator">10 min</label>
    </div>
    <br/>
    <button v-if="isLobbyCreator" @click="closeLobby" type="button">Close Lobby</button>
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
        }
    }
}
</script> 