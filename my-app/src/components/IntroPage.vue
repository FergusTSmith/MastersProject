<template>
      <h2>TrackerHunt</h2>
      <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/>
      <h5>Who is watching you?</h5>
      <button class="loginButton" @click="googleLogin" ref="LoginButton">Login</button>
      <button class="DevLogin" @click="DevLogin">Dev</button>
      <p class="HelpText">To use TrackerHunt, sign in with Google and ensure you are signed in on your browser</p>
</template>

<script>
export default {
    name: "IntroPage",
    methods: {
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
                        //vm.UserGoogleID = googleID;

                        vm.$socket.emit('doesUserExist', googleID);
                        vm.$emit('userLogin', googleID)
                        }
                    })
                }
            })
        },
        DevLogin(){
            this.$socket.emit('doesUserExist', "108040570320593718088");
            this.$emit('userLogin', "108040570320593718088")
            console.log("TEST")
        },
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