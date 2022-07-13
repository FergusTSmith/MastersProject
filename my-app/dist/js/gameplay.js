
/* Largely adapted from Cormac Muir's background.js file */
var numberOfTrackers = 0;
var endpoint = 'http://ip-api.com/json/';
var detectedHosts = [];
var detectedCountries = [];

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        /* Directly copy and pasted: */  
        var match = details.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        
        requestURL = match[1];

        console.log(requestURL);

        if(requestURL in tracker_domains){
            if(!(detectedHosts.includes(requestURL))){
                detectedHosts.push(requestURL)
                //console.log(detectedHosts);
                numberOfTrackers += 1;
                //console.log("We have found a tracker: " + requestURL + ' ' + numberOfTrackers);
                var tracker_location_url = endpoint + "/" + requestURL;

                //console.log(tracker_location_url);

                getCountry(tracker_location_url);

  
            }
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
            chrome.storage.local.set
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