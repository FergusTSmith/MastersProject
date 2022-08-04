<template>
    <h2>TrackHunt</h2>
    <p class="HelpText">Solo Mode</p>
    <label class="HelpText">Choose Game Mode:</label>
    <div class="RadioButtons">
        <input id="Classic" class="Radio" type="radio" name="GameType" value="Classic" @change="onGameModeChange"/><label for="Classic">Classic</label>
        <input id="Bingo" class="Radio" type="radio" name="GameType" value="Bingo" @change="onGameModeChange"/><label for="Bingo">Bingo</label>
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
        <input id="2min" class="Radio" type="radio" value="120" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label for="2min">2 min</label>
        <input id="5min" class="Radio" type="radio" value="300" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label for="5min">5 min</label>
        <input id="10min" class="Radio" type="radio" value="600" name="time" ref="Timebutton" @change="onTimeChange($event)"/><label for="10min">10 min</label>
    </div>
    <br/>
    <button @click="soloGameInitiated" type="button">Begin Game</button>
    <button @click="exitToHomePage" type="button">Cancel</button>
</template>

<script>
export default {
    props: {
        personalSoloHS: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
             gameMode: 'Classic',
            timer: 120,
        }
    },
    methods: {
        onGameModeChange(){
            var gameModeSelected = event.target.value;
            this.gameMode = gameModeSelected;
            this.$emit('onGameModeChange', gameModeSelected);
        },
        onTimeChange(){
            var timeSelected = event.target.value;
            this.timer = timeSelected;
            this.$emit('onTimeChange', timeSelected)
        },
        soloGameInitiated(){
            this.$emit('soloGameInitiated')
        },
        exitToHomePage(){
            this.$emit('exitToHomePage')
        }
    }
}
</script>