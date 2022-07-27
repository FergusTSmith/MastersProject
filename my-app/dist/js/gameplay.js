
/* Largely adapted from Cormac Muir's background.js file */
var numberOfTrackers = 0;
var endpoint = 'http://ip-api.com/json/';
var detectedHosts = [];
var detectedCountries = [];

var passiveUniqueHosts = [];
var passiveTotalHosts = 0
var passiveCountries = [];

// Helper Classes

class Country {
    constructor(name, originalSite){
        this.name = name;
        this.count = 1;
        this.site = [originalSite];
    }

    addCount(){
        this.count += 1;
    }
    addSite(newSite){
        this.site = this.site += ", " + newSite;
        //console.log("TESTTESTTEST");
        //console.log(newSite);
        //console.log(this.site);
        return this.site;

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
                console.log(requestURL + 'Tracker')
                numberOfTrackers += 1;
                //console.log("We have found a tracker: " + requestURL + ' ' + numberOfTrackers);
                var tracker_location_url = endpoint + "/" + requestURL;
                
                // https://bobbyhadz.com/blog/javascript-remove-http-https-from-url#:~:text=To%20remove%20http%3A%2F%2F%20or,http%3A%2F%2F%20part%20is%20removed.
                var cleanedUpInitiator = details.initiator.replace(/^https?:\/\/www./, '');


                //console.log(cleanedUpInitiator);

                //console.log(tracker_location_url);
                getCountry(tracker_location_url, cleanedUpInitiator);  

                passiveUniqueHosts.push(new Host(requestURL))

            }else{
                var counted = false;
                for(var i = 0; i < passiveUniqueHosts.length; i++){
                    if(passiveUniqueHosts[i].URL === requestURL){
                        passiveUniqueHosts[i].addCount();
                        counted = true;
                        //getCountryPassive(endpoint + "/" + requestURL) - Removing for now, means too many requests made at once
                    }
                }
            }

            chrome.storage.local.set({ passiveHosts: passiveUniqueHosts});
            //console.log(passiveUniqueHosts);

        }

    }, {urls: ["<all_urls>"]});

/*
chrome.webRequest.onSendHeaders.addListener(
    function(details){
        console.log(details.initiator);
    }, {urls: ["<all_urls>"]});

/*
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details){
        console.log(details);
    }, {urls: ["<all_urls>"]});


chrome.webRequest.onBeforeRedirect.addListener(
    function(details){
        console.log(details);
    }, {urls: ["<all_urls>"]});


chrome.webRequest.onHeadersReceived.addListener(
    function(details){
        console.log(details);
    }, {urls: ["<all_urls>"]});

  */ 

chrome.cookies.onChanged.addListener(function(result) {
    //console.log(result);
    if(result.cause === 'explicit' && result.removed === false){
        //console.log(result);
        //console.log(result.cookie.domain)

        if(result.cookie.domain in tracker_domains){
            console.log('New Tracker Cookies discovered')
            console.log(result.cookie.domain)
            console.log()
        }
    }

})

chrome.cookies.getAll({}, function(result) {
    console.log(result);

    for(var i = 0; i < result.length; i++){
        //if(result[i].)
    }
})


// Helper Methods for retrieiving the Countries using the IPAPI API

function getCountry(request, originalSite){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            //console.log(response);


            var found = false;
            for(var i = 0; i < detectedCountries.length; i++){
                if(detectedCountries[i].name === response.country){
                    detectedCountries[i].addCount();
                    //detectedCountries[i].addSite(originalSite)
                    var alreadyTracked = false;
                    for(var k = 0; k < detectedCountries[i].site.length; k++){
                        if(detectedCountries[i].site[k] == originalSite){
                            alreadyTracked = true;
                            //console.log('ffs')
                        }
                    }
                    if(!(alreadyTracked)){
                        detectedCountries[i].site.push(originalSite)
                    }
                    
                    //console.log(detectedCountries)
                    found = true;
                }
            }
            if(!found){
                detectedCountries.push(new Country(response.country, originalSite));
            }
            for(var j = 0; j < detectedCountries.length; j++){
                //console.log(detectedCountries[j].name + ' ' + detectedCountries[j].count);
            }
            chrome.storage.local.set({ countryList: detectedCountries });

            var passiveFound = false;

            for(var j = 0; j < passiveCountries.length; j++){
                if(passiveCountries[j].name === response.country){
                    passiveCountries[j].addCount();
                    passiveFound = true;
                }
            }
            if(!passiveFound){
                passiveCountries.push(new Country(response.country, originalSite));
            }

            chrome.storage.local.set({ passiveCountryList: passiveCountries });
            //console.log(passiveCountries)
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
            //console.log(response);

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
            //console.log(passiveCountries)
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

// Notifications for Passive Mode

// https://blog.shahednasser.com/how-to-send-notifications-in-chrome-extensions/

chrome.alarms.create('PASSIVEMODE-ALARM', {
    periodInMinutes: 1440
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name === "PASSIVEMODE-ALARM"){
        console.log('ALARM HEARD')
        chrome.notifications.create('test', {
            type: 'basic',
            iconUrl: './staticimages/SmallLogo.png',
            title: 'TrackerHunt - Passive Mode Statistics',
            message: 'While passively browsing, you were tracked by ' + passiveUniqueHosts.length + ' unique entities. These entities were spread across ' + passiveCountries.length + ' different nations. Open TrackerHunt to find out more!',
            priority: 2,
            buttons: [
                {
                    title: 'Ok'
                }
            ]
        });
        console.log('Passed by all the notification code');
    }
})









