
/* Largely adapted from Cormac Muir's background.js file */
var numberOfTrackers = 0;
var endpoint = 'http://ip-api.com/json/';
var detectedHosts = [];
var detectedCountries = [];

var passiveUniqueHosts = [];
var passiveCountries = [];

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        /* Directly copy and pasted: */  
        var match = details.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        
        requestURL = match[1];

        //console.log(requestURL);

        if(requestURL in tracker_domains){
            if(!(detectedHosts.includes(requestURL))){
                detectedHosts.push(requestURL)
                //console.log(detectedHosts);
                numberOfTrackers += 1;
                //console.log("We have found a tracker: " + requestURL + ' ' + numberOfTrackers);
                var tracker_location_url = endpoint + "/" + requestURL;

                //console.log(tracker_location_url);
                getCountry(tracker_location_url);  

                passiveUniqueHosts.push(new Host(requestURL))
            }else{
                for(var i = 0; i < passiveUniqueHosts.length; i++){
                    if(passiveUniqueHosts[i].URL === requestURL){
                        passiveUniqueHosts[i].addCount();
                        //getCountryPassive(endpoint + "/" + requestURL) - Removing for now, means too many requests made at once
                    }
                }
            }

            chrome.storage.local.set({ passiveHosts: passiveUniqueHosts});
            //console.log(passiveUniqueHosts);

        }

    }, {urls: ["<all_urls>"]});

   

function getCountry(request){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            console.log(response);


            var found = false;
            for(var i = 0; i < detectedCountries.length; i++){
                if(detectedCountries[i].name === response.country){
                    detectedCountries[i].addCount();
                    found = true;
                }
            }
            if(!found){
                detectedCountries.push(new Country(response.country));
            }
            for(var j = 0; j < detectedCountries.length; j++){
                console.log(detectedCountries[j].name + ' ' + detectedCountries[j].count);
            }
            chrome.storage.local.set({ countryList: detectedCountries });

            if(response.country in passiveCountries){
                for(var j = 0; j < passiveCountries.length; j++){
                    if(passiveCountries[j].name === response.country){
                        passiveCountries[j].addCount();
                    }
                }
            }
            chrome.storage.local.set({ passiveCountryList: passiveCountries });
            console.log(passiveCountries)
        }
    }

    xhr.open("GET", request, true);
    xhr.send();
}

function getCountryPassive(request){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            console.log(response);

            var found = false;

            for(var j = 0; j < passiveCountries.length; j++){
                if(passiveCountries[j].name === response.country){
                    passiveCountries[j].addCount();
                    found = true;
                }
            }
            if(!found){
                passiveCountries.push(new Country(response.country))
            }
            chrome.storage.local.set({ passiveCountryList: passiveCountries });
            console.log(passiveCountries)
        }
    }

    xhr.open("GET", request, true);
    xhr.send();
}

//Responding to messages from the front end

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message === 'reset'){
        detectedHosts = [];
        detectedCountries = [];

        chrome.storage.local.set({ countryList: detectedCountries });
        sendResponse('success');
    }
})


class Country {
    constructor(name){
        this.name = name;
        this.count = 1;
    }

    addCount(){
        this.count += 1;
    }
}

class Host {
    constructor(URL){
        this.URL = URL;
        this.count = 1;
    }

    addCount(){
        this.count +=1;
    }
}