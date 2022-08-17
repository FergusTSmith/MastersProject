<template>
    <h2>TrackerHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
    <button @click="changeUsernamePage" type="button">Change Username</button>
    <button @click="passiveMode" type="button">View Passive Mode Stats</button>
    <button @click="pauseBlocking" type="button">Pause Tracker Blocking</button>
    <button @click="logout" type="button">Logout</button>
    <br/><br/>

    <div v-if="UsernamePage" id="UsernamePage">
        <SetUsername @setUsername="setUsername($event)" @usernameToIntro="usernameToIntro"></SetUsername>
    </div>
</template>

<script>
export default {
    methods: {
        changeUsernamePage(){
            this.$emit('changeUsernamePage');
            console.log("emitted");
        },
        passiveMode(){
            this.$emit('passiveMode');
        },
        logout(){
            var vm = this;
            chrome.runtime.sendMessage({ message: 'logout'}, function(response) {
                if (response === 'success') {
                    alert("You have now successfully logged out")
                    vm.$emit('logout')
                }
            })
        },
        pauseBlocking(){
            console.log("Test")
            chrome.runtime.sendMessage({ message: 'pauseBlocking'}, function(response){
                if(response === 'unblocked'){
                    alert("TrackerHunt will begin blocking connections to web-trackers");
                    console.log("unblocked")
                    return true;
                }else if(response === 'paused'){
                    alert("TrackerHunt web-request blocking has been paused");
                    console.log("paused")
                    return true;
                }
                return true;
                
            })
        }
    }
}</script>