<!----------
- The SoloLobby.vue file is the component responsible for rendering the page for users to set their username upon initial login. 
- Parents: HomePageView.vue
- Children: SoloGamePage.vue
------------->
<template>
    <div v-if="SoloPage">
        <h2>TrackerHunt</h2>
        <p class="HelpText">Solo Mode</p>
        <p class="HelpText" v-if="InformationBox">{{ ClassicInfo }}</p>
        <p class="HelpText" v-if="InformationBox">{{ BingoInfo }}</p>
        <label class="HelpText">Choose Game Mode:<button @click="displayInformation" class="InformationBox" id="Info">i</button></label>
        <div class="RadioButtons">
            <input id="Classic" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label for="Classic">Classic</label>
            <input id="Bingo" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label id="BingoTest" for="Bingo">Bingo</label>
        </div>
        <p id="LeaderBoard">Previous Classic Scores:</p>
        <ol>
        <li v-for="item in personalSoloHS" :key="item" class="LeaderBoard">
            {{ item.username }}  |  {{ item.Score }}  |  {{ item.createdAt }}
        </li>
        </ol>
        <br/>
        <!---- Radio Buttons adapted from tutorial: M Heath, "Customize Radio Button with CSS", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022-->
        <label class="HelpText">Choose Round Length:</label>
        <div class="RadioButtons">
            <input id="twoMin" class="Radio" type="radio" value="120" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label for="twoMin">2 min</label>
            <input id="fiveMin" class="Radio" type="radio" value="300" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label id="fiveMinTest" for="fiveMin">5 min</label>
            <input id="tenMin" class="Radio" type="radio" value="600" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label for="tenMin">10 min</label>
        </div>
        <br/>
        <button class="BeginGame" @click="soloGameInitiated" type="button">Begin Game</button>
        <button id="Exit" @click="exitToHomePage" type="button">Cancel</button>
    </div>

    <div v-if="SoloGame" id="Solo-Mode">
        <SoloGamePage :userSoloContinue="userSoloContinue" :userProfile="userProfile" :GameMode="gameMode" :gameOver="false" :startTime="timer" @exitToHomePageReset="exitToHomePageReset" @resetSoloStatus="resetSoloStatus"></SoloGamePage>
    </div>
</template>

<script>
import SoloGamePage from '@/components/SoloGamePage.vue'
export default {
    props: {
        personalSoloHS: {
            type: Array,
            required: false
        },
        userProfile: {
            type: Object,
            required: true
        },
        userSoloContinue: {
            type: Boolean,
            required: true
        }
    },
    components: {
        SoloGamePage,
    },
    // Whenever this component is initially rendered, we check if the user is rejoining a game, and if so, get the relevant backupgame details. 
    created(){
        var vm = this;
        if(this.userSoloContinue){
            chrome.storage.local.get(['backupGameDetails'], function(result){
                var backupGame = result.backupGameDetails;
                vm.gameMode = backupGame.GameMode;
                vm.timer = backupGame.timer;
            })
            this.SoloPage = false;
            this.SoloGame = true;
        }
    },
    data() {
        return {
            gameMode: 'Classic',
            timer: 156,
            gameOver: false,

            SoloPage: true,
            Sologame: true,

            ClassicInfo: "In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \n Common Countries (x1 Multiplyer): United States, United Kingdom \n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \n Rare Countries (x3 Multiplyer): Asian Nations \n Very Rare Countries (x4 Multiplyer): African Nations \n All other countries (x5 Multiplyer)",
            BingoInfo: "In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game",
            InformationBox: false,
        }
    },
    methods: {
        // The below methods change the game mode and timer depending on the radio buttons selected.
        onGameModeChange(){
            var gameModeSelected = event.target.value;
            this.gameMode = gameModeSelected;
        },
        onTimeChange(){
            var timeSelected = event.target.value;
            this.timer = timeSelected;
        },
        // Renders the Solo Game page and informs the server the user is now in a solo game.
        soloGameInitiated(){
            this.gameOver = false;
            this.SoloPage = false;
            this.SoloGame = true;
            this.$socket.emit("playerInSoloGame", this.userProfile.googleID)
        },
        // Below logic is for returnin gto the home page, or doing this and resetting
        exitToHomePage(){
            this.$emit('exitToHomePage')
            this.SoloGame = false;
            this.SoloPage = false;
        },
        exitToHomePageReset(){
            this.$emit('exitToHomePage');
            this.gameover = false;
            this.SoloGame = false;
            this.SoloPage = false;
        },
        // This method is to reset the variable that indicates the player is rejoining a game. 
        resetSoloStatus(){
            this.$emit('resetSoloStatus')
        },
        // This will display the information boxes to the user.
        displayInformation(){
            this.InformationBox = !(this.InformationBox);
        }
    }
}
</script>