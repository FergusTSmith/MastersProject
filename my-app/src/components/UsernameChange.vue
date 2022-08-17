<template>
    <h2>TrackerHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
    <br/><br/>
    <p>Your current username is: {{ UsersID }}</p>
    <label>Enter a new username:</label><br/>
    <input ref="NewUsername" type="text">
    <br/>
    <button @click="changeUsername" type="button">Save</button>
    <button @click="exitToHomePage" type="button">Back</button>
</template>

<script>

export default {
    methods: {
        changeUsername(){
            if(this.$refs.NewUsername.value != null){
                this.$emit('changeUsername', this.$refs.NewUsername.value);
            }
        },
        exitToHomePage(){
            this.$emit('exitToHomePage');
        },
    },
    props: {
        UsersID: {
            type: String,
            required: true
        }
    }
}</script>