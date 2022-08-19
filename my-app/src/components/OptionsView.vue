<template>
    <div v-if="Options">
    <h2>TrackerHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
    <button class="OptionsButton" @click="changeUsernamePage" type="button">Change Username</button>
    <button class="OptionsButton" @click="passiveMode" type="button">View Passive Mode Stats</button>
    <button class="OptionsButton" @click="pauseBlocking" type="button">Pause Tracker Blocking</button>
    <button class="OptionsButton" @click="logout" type="button">Logout</button>
    <br/><br/>
    </div>

    <div v-if="UsernamePage" id="UsernamePage">
        <UsernameChangeVue :UsersID="UsersID" @changeUsername="changeUsername($event)"></UsernameChangeVue>
    </div>
</template>

<script>
import UsernameChangeVue from './UsernameChange.vue';

export default {
    data(){
        return {
            UsernamePage: false,
            Options: true
        }
    },
    components: {
        UsernameChangeVue
    },
    props: {
        UsersID: {
            type: String,
            required: true,
        }
    },
    methods: {
        changeUsernamePage(){
            this.Options = false;
            this.UsernamePage = true;
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
        },
        changeUsername($event){
            this.$emit('changeUsername', $event)
        }
    }
}</script>

<style>
button.OptionsButton {
    width: 70%;

}
</style>