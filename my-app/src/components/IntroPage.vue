<!----------
- The IntroPage.vue file is the component responsible for rendering the initial login page for the user. 
- Parents: App.vue
- Children: None
------------->

<template>
      <h2>TrackerHunt</h2>
      <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/>
      <h5>Who is watching you?</h5>
      <button class="loginButton" @click="googleLogin" ref="LoginButton">Login</button>
      <!-----<button class="DevLogin" @click="DevLogin">Dev</button>-This is here for testing purposes, as the Puppeteer software cannot navigate the OAuth2.0 window--->
      <p class="HelpText">To use TrackerHunt, sign in with Google and ensure you are signed in on your browser</p>
</template>

<script>
export default {
    name: "IntroPage",
    methods: {
        // GoogleLogin is the key method in the file. This is responsible for communicating with the background scripts in order to get the users details and sign them in. 
        googleLogin(){
            var vm = this;
            this.getHighScores();
            chrome.runtime.sendMessage({ message: 'login'}, function(response) {
                if (response === 'success') {
                    chrome.runtime.sendMessage({ message: 'googleID'}, function(response){
                        if((response === '') || (response === undefined)){
                            console.log("No google ID found");
                        }else{
                            var googleID = response;
                            googleID = googleID.substring(0, 255);
                            vm.$socket.emit('doesUserExist', googleID);
                            vm.$emit('userLogin', googleID)
                        }
                    })
                }
            })
        },
        // This is used for testing purposes, and simply logs the user in with the author's google ID without logging in. 
        DevLogin(){
            this.$socket.emit('doesUserExist', "108040570320593718088");
            this.$emit('userLogin', "108040570320593718088")
        },
        // Ensures that we retrieve the leaderboards early, so that there is minimal lag when rendering this. 
        getHighScores(){
            this.$socket.emit('retrieveLeaderBoards');
      },
    }
}</script>

<style>
h5 {
    margin-top: 2px;
    margin-bottom: 2px;
}
button.loginButton {
    width: 80%;
}
button.DevLogin {
    width: 80%;
}
</style>