<template>
    <div v-if="SoloPage">
        <h2>TrackerHunt</h2>
        <p class="HelpText">Solo Mode</p>
        <label class="HelpText">Choose Game Mode:</label>
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
        <!--- Radio Buttons adapted from https://markheath.net/post/customize-radio-button-css https://codepen.io/phusum/pen/VQrQqy-->
        <label class="HelpText">Choose Round Length:</label>
        <div class="RadioButtons">
            <input id="twoMin" class="Radio" type="radio" value="120" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label for="twoMin">2 min</label>
            <input id="fiveMin" class="Radio" type="radio" value="300" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label id="fiveMinTest" for="fiveMin">5 min</label>
            <input id="tenMin" class="Radio" type="radio" value="600" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label for="tenMin">10 min</label>
        </div>
        <br/>
        <button class="BeginGame" @click="soloGameInitiated" type="button">Begin Game</button>
        <button @click="exitToHomePage" type="button">Cancel</button>
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
    mounted(){
        if(this.userSoloContinue){
            var vm = this;
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
            timer: 120,
            gameOver: false,

            SoloPage: true,
            Sologame: true,
        }
    },
    methods: {
        onGameModeChange(){
            var gameModeSelected = event.target.value;
            this.gameMode = gameModeSelected;
        },
        onTimeChange(){
            var timeSelected = event.target.value;
            this.timer = timeSelected;
        },
        soloGameInitiated(){
            this.gameOver = false;
            this.SoloPage = false;
            this.SoloGame = true;

            this.$socket.emit("playerInSoloGame", this.userProfile.googleID)
        },
        exitToHomePage(){
            this.$emit('exitToHomePage')
            this.SoloGame = false;
            this.SoloPage = false;
        },
        exitToHomePageReset(){
            this.$emit('exitToHomePage');

            this.gameMode = 'Classic';
            this.timer = 120;
            this.gameover = false;

            this.SoloGame = false;
            this.SoloPage = false;
        },
        resetSoloStatus(){
            this.$emit('resetSoloStatus')
        }
    }
}
</script>