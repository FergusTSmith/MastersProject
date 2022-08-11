<template>
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
    <p class="HelpText">Welcome back, {{ UsersID }}!</p>
    <button id="Solo" class="homepageButton" @click="solomode" type="button">Play Solo</button>
    <button id="NewLobby" class="homepageButton" @click="createLobby" type="button">Create Lobby</button>
    <button id="Passive" class="homepageButton" @click="passiveMode" type="button">Passive Mode</button>
    <button id="Lobby" class="homepageButton" @click="joinlobby" type="button">Join Lobby</button>
    <button id="Options" class="homepageButton" @click="options" type="button">Options</button>
    <button id="Leaderboards" class="homepageButton" @click="leaderboards" type="button">LeaderBoards</button>
</template>

<script>
export default {
    props: {
        UsersID: {
            type: String,
            required: true
        }
    },
    
    methods: {
        solomode(){
            this.$emit('solomode')
        },
        createLobby(){
            var newLobbyID = this.createNewLobbyID();
            this.$emit('createLobby', newLobbyID)
        },
        passiveMode(){
            var pmH = [];
            var totalTrackers = 0;
            var passiveModeUniqueHosts = 0;
            var passiveModeCountries = []
            var passiveModeTotalCounties = 0;
            var passiveCountryCounts = [];
            var passiveCountryLabels = [];
            var achievements = [];
            var totalRequests = 0;
            var vm = this;


            chrome.storage.local.get(["passiveHosts"], function(result){
                pmH = result.passiveHosts;
                console.log(pmH)

                var totalHosts = 0;

                for(var i = 0; i < result.passiveHosts.length; i++){
                    totalHosts += result.passiveHosts[i].count;
                }

                totalTrackers = totalHosts;
                passiveModeUniqueHosts = result.passiveHosts.length;
                
                chrome.storage.local.get(["passiveCountryList"], function(result){
                passiveModeCountries = result.passiveCountryList;

                passiveModeTotalCounties = result.passiveCountryList.length;

                for(var i = 0; i < passiveModeCountries.length; i++){
                     passiveCountryCounts[i] = passiveModeCountries[i].count;
                    passiveCountryLabels[i] = passiveModeCountries[i].name;
                }

                    chrome.storage.local.get(["achievements"], function(result){
                        achievements = result.achievements;
                        console.log(result);

                        chrome.storage.local.get(["totalRequests"], function(result){
                            totalRequests = result.totalRequests;
                            console.log(totalRequests);
                            console.log(pmH);
                            console.log(totalTrackers);
                            console.log(passiveModeUniqueHosts);
                            console.log(passiveModeCountries)

                            const passiveDetails = {
                                pmH: pmH,
                                total: totalTrackers,
                                unique: passiveModeUniqueHosts,
                                countries: passiveModeCountries,
                                totalCountries: passiveModeTotalCounties,
                                countryCounts: passiveCountryCounts,
                                countryLabels: passiveCountryLabels,
                                achieve: achievements,
                                totalReq: totalRequests
                            }


                            vm.$emit('passiveMode', {passiveDetails})
                        })
                    })
                })
                

                })

            


            

            
        },
        joinlobby(){
            this.$emit('joinlobby')
        },
        options(){
            this.$emit('options')
        },
        leaderboards(){
            this.$emit('leaderboards')
        },
        createNewLobbyID(){
            /* adapted from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
            var id = ''
            var allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for(var i = 0; i < 7; i++){
                 id += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
            }
            return id;
         }
    }
}
</script>