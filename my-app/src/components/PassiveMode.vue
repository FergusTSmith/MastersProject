<template>
    <h2>TrackHunt</h2>
    <p class="HelpText">"Passive Mode" engages whenever you install TrackerHunt. This will show a collection of all of the trackers encountered since the application was installed.</p>
    <p class="PassiveText">Since you installed TackerHunt, you have been tracked: {{ passiveModeTotalTrackers }} times.</p>
    <p class="PassiveText">This was done by a total of {{ passiveModeUniqueHosts }} different entities.</p>
    <p class="PassiveText">These entities hailed from {{ passiveModeTotalCounties }} countries.</p>
    <p class="PassiveText">To see a complete list of hosts and counts: </p>
    <button @click="PassiveToHost">PassiveMode Hosts</button>
    <p class="PassiveText">To see a complete list of countries and counts: </p>
    <button @click="PassiveToCountry">PassiveMode Countries</button>
    <p class="PassiveText">To view your achievements: </p>
    <button @click="achievementPage">Achievements</button>
    <br/>
    <button @click="exitToHomePage">HomePage</button>
</template>

<script>

export default {
    props: {
        passiveModeTotalTrackers: {
            type: Number,
            required: true
        },
        passiveModeUniqueHosts: {
            type: Number,
            required: true
        },
        passiveModeTotalCounties: {
            type: Number,
            required: true
        }
    },
    methods: {
        PassiveToHost(){
            this.$emit('PassiveToHost');
        },
        PassiveToCountry(){
            this.$emit('PassiveToCountry');
        },
        achievementPage(){
            this.$emit('achievementPage');
        },
        exitToHomePage(){
            this.$emit('exitToHomePage');
        }
    }
}
</script>