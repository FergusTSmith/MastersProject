<!----------
- The OptionsView.vue file is the component responsible for rendering the options page. 
- Parents: HomePageView.vue
- Children: UsernameChange.vue
------------->
<template>
    <div v-if="Options">
        <h2>TrackerHunt</h2>
        <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
        <button id="ChangeUser" class="OptionsButton" @click="changeUsernamePage" type="button">Change Username</button>
        <button id="Pause" class="OptionsButton" @click="pauseBlocking" type="button">Pause Tracker Blocking</button>
        <button id="Logout" class="OptionsButton" @click="logout" type="button">Logout</button>
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
        // View controller to render the UsernameChange.vue component.
        changeUsernamePage(){
            this.Options = false;
            this.UsernamePage = true;
        },
        // Logic for logging out, delegates the majority of this to the extension scripts and HomePage.vue
        logout(){
            var vm = this;
            chrome.runtime.sendMessage({ message: 'logout'}, function(response) {
                if (response === 'success') {
                    alert("You have now successfully logged out")
                    vm.$emit('logout')
                }
            })
        },
        // This logic communicates to the extension scripts in order to turn request blocking on and off. 
        pauseBlocking(){
            console.log("Test")
            chrome.runtime.sendMessage({ message: 'pauseBlocking'}, function(response){
                if(response === 'unblocked'){
                    alert("TrackerHunt will begin blocking connections to web-trackers. Tracking cookies tracked during gameplay will now be first-party cookies.");
                    console.log("unblocked")
                    return true;
                }else if(response === 'paused'){
                    alert("TrackerHunt web-request blocking has been paused. Tracking cookies identified in gameplay will now be third-party cookies");
                    console.log("paused")
                    return true;
                }
                return true;
            })
        },
        // Changes username by delegating to the HomepageView.vue component. 
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