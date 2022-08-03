<template>
      <h2>TrackHunt</h2>
      <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/>
      <p>🇺🇸 🇬🇧</p>
      <h5>Who is watching you?</h5>
      <button @click="googleLogin" ref="LoginButton">Login</button>
      <!------<Transition><button v-if="IntroPage" @click="NoAccount">No-Login Mode</button></Transition> --->
      <p class="HelpText">To use TrackHunt, sign in with Google and ensure you are signed in on your browser.</p>
</template>

<script>
export default {
    methods: {
        googleLogin(){
            var vm = this;
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
        }
    }
      
    
}</script>