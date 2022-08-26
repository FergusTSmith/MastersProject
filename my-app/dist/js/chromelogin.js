/* The following file, chromelogin.js, handles the logic for a user logging in
* This exists as an extension script and is handled largely using the OAuth2.0 API, as well as the Chrome Developer APIs
* The creation of this file was largely adapted from a tutorial:
* An Object Is A, 2020, "How to Use Google Login with Chrome Extensions(MV2) | OAuth2/OpenID Connect", Uploaded August 7th 2020, Available At: https://www.youtube.com/watch?v=H-anyDrYHyg
*/

// These are the details required by the OAuth2.0 framework. 
let isUserSignedIn = false;
const CLIENT_ID = encodeURIComponent('24693648368-rkd67f5feebtm0hh9vft6g5q9a4cpbk2.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://bgjhibncalnohjalebjpmgboleachfbc.chromiumapp.org');
const STATE = encodeURIComponent('jfkls3n');
const SCOPE = encodeURIComponent('openid');
const PROMPT = encodeURIComponent('consent');
var user_info = '';
var user_id = '';
var uniqueIDforUser = '';

// This is an event listener that listens to messages sent from the front end. 

// This responds to messages providing logic for logging in, retrieving google IDs, and logging out. 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'login'){
        if(isSignedIn()){
            console.log("Error. User is currently logged in");
            sendResponse('success');
            console.log(user_id);
            chrome.identity.getProfileUserInfo({'accountStatus': 'ANY'}, function(info){
                console.log(info)
                uniqueIDforUser = info.id;
            })
        }else{
            chrome.identity.launchWebAuthFlow({
                url: create_uri_oauth2(),
                interactive: true,
            }, function(redirect_url){

                user_id = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
                user_id = user_id.substring(0, user_id.indexOf('&'));

                const user_information = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(user_id.split(".")[1]));
                user_info = user_information;
                console.log(user_id)
                
                if((user_information.iss === 'https://accounts.google.com' || user_information.iss === 'accounts.google.com') && user_information.aud === CLIENT_ID){
                    isUserSignedIn = true;
                    sendResponse({response: 'success', userID: user_id});
                    console.log("We have successfully completed the login test");
                    
                    //Get user identity - https://www.youtube.com/watch?v=_26ptq-6o_s&ab_channel=RustyZone
                    chrome.identity.getProfileUserInfo({'accountStatus': 'ANY'}, function(info){
                        console.log(info)
                        uniqueIDforUser = info.id;
                    })
                }else{
                    console.log("Error, could not authenticate")
                }
            });
            return true;
        }
    }else if (request.message === 'googleID'){
        if(uniqueIDforUser === ''){
            console.log("no user found")
        }else{
            sendResponse(uniqueIDforUser)
        }
        return true;
    }else if (request.message === 'reset'){
        detectedHosts = [];
        detectedCountries = [];

        chrome.storage.local.set({ countryList: detectedCountries });
        sendResponse('success');
    }else if (request.message === 'logout'){
        isUserSignedIn = false;
        user_info = '';
        user_id = '';
        uniqueIDforUser = '';
        sendResponse('success');
    }
})

// A helper function for the above algorithms to return whether or not the user is currently signed in. This is adapted from:
/* An Object Is A, 2020, "How to Use Google Login with Chrome Extensions(MV2) | OAuth2/OpenID Connect", Uploaded August 7th 2020, Available At: https://www.youtube.com/watch?v=H-anyDrYHyg
*/

function isSignedIn(){
    return isUserSignedIn;
}

// This is a helper method that creates the URL for the user to login to Google. This is adapted from:
/* An Object Is A, 2020, "How to Use Google Login with Chrome Extensions(MV2) | OAuth2/OpenID Connect", Uploaded August 7th 2020, Available At: https://www.youtube.com/watch?v=H-anyDrYHyg
*/

function create_uri_oauth2(){
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let url = 
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}&prompt=${PROMPT}&nonce=${nonce}`

    console.log(url);
    return url;
}