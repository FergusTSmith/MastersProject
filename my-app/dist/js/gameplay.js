/* Largely adapted from Cormac Muir's background.js file */
var numberOfTrackers = 0;
var endpoint = 'http://ip-api.com/json/';
var detectedHosts = [];
var detectedCountries = [];

const CategoryEndpoint = "https://website-categorization.whoisxmlapi.com/api/v2?apiKey=at_sst90T8EnkuxyjY7XxRtpwgkieia0&domainName="

var passiveUniqueHosts = [];
var passiveTotalHosts = 0
var passiveCountries = [];

var totalTrackerCookies = 0
var achievements = []

var CountriesInAsia = ["Japan", "Indonesia", "India", "China", "Thailand", "South Korea", "Philippines", "Singapore", "Vietnam", "Malaysia", "Hong Kong", "Saudi Arabia", "Pakistan", "Myanmar", "Cambodia", "Taiwan", "Laos", "Iran", "Sri Lanka", "Israel", "Maldives", "Afghanistan", "Bangladesh", "Nepal", "Qatar", "Mongolia", "Brunei", "Lebanon", "North Korea", "Iraq", "Uzbekistan", "Syria", "Macao", "Christmas Islands", "United Arab Emirates", "Jordan", "Armenia", "Timor-Leste", "Kyrgzstan", "Yemen", "Paliestine", "Bhutan", "Kuwait", "Turkmenistan", "Bahrain", "Tajikistan", "Oman"]
var AfricanCountries = ["Nigeria", "Ethiopia", "Eygpt", "Democratic Republic of the Congo", "Tanzania", "South Africa", "Kenya", "Sudan", "Algeria", "Uganda", "Morocco", "Angola", "Mozambique", "Ghana", "Cameroon", "Madagascar", "Ivory Coast", "Niger", "Burkina Faso", "Mali", "Malawi", "Zambia", "Senegal", "Chad", "Somalia", "Zimbabwe", "South Sudan", "Rwanda", "Guinea", "Burundi", "Benin", "Tunisia", "Sierra Leone", "Togo", "Libya", "Repbulic of the Congo", "Central African Republic", "Liberia", "Mauritania", "Eritrea", "Namibia", "Gambia", "Botswana", "Gabon", "Lesotho", "Guimea-Bissau", "Equatorial Guinea", "Mauritius", "Eswatini", "Djibouti", "Cape Verde"]
var EuropeanCountries = ["Hungary", "Belarus", "Austria", "Serbia", "Switzerland", "Germany", "Holy See", "Andorra", "Bulgaria", "United Kingdom", "France", "Montenegro", "Luxembourg", "Italy", "Denmark", "Finland", "Slovakia", "Norway", "Ireland", "Spain", "Malta", "Ukraine", "Croatia", "Moldova", "Monaco", "Liechtenstein", "Poland", "Iceland", "San Marino", "Bosnia and Herzegovina", "Albania", "Lithuania", "North Macedonia", "Slovenia", "Romania", "Latvia", "Netherlands", "Russia", "Estonia", "Belgium", "Czechia", "Portugal", "Greece", "Sweden"]
var NorthAmerica = ["United States", "USA", "United States of America", "Canada", "Mexico"]
var Oceania = ["Australia", "New Zealand"]
var SouthAmerica = [];

var categoriesTrackedBy = []
var sitesCategorised = []


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
class Category {
    constructor(name){
        this.name = name;
        this.count = 1;
    }
    addCount(){
        this.count++;
    }
}

// Inspired by https://gamedev.stackexchange.com/questions/139136/implementing-achievement-system-in-javascript

// This part of the program defines an Achievement class, and creates some achievements to be complete in passive mode.
 
class Achievement {
    constructor(name, text){
        this.name = name;
        this.achieved = false;
        this.text = text;
    }
    achieve(){
        this.achieved=true;
        chrome.notifications.create('Achievement Completed', {
            type: 'basic',
            iconUrl: './staticimages/SmallLogo.png',
            title: 'TrackerHunt - AchievementCompleted',
            message: 'New Achievement Completed: ' + this.name + " - " + this.text,
            priority: 2,
            buttons: [
                {
                    title: 'Ok'
                }
            ]
        });
        //console.log('achieve() fired' - this.name);

    }
}

achievements.push(new Achievement("From Russia with Love", "Get tracked by a Russian Tracker")); // 0
achievements.push(new Achievement("The Silk Road", "Get tracked by a Asian Tracker")); // 1
achievements.push(new Achievement("From Casablanca to Cape Town", "Get tracked by an African Tracker")); // 2
achievements.push(new Achievement("From Paris to Berlin", "Get tracked by a European Tracker")); // 3
achievements.push(new Achievement("North American Scum", "Get tracked by a North American Tracker")); // 4
achievements.push(new Achievement("South America", "Get tracked by a South American Tracker")); // 5
achievements.push(new Achievement("Down Under", "Get tracked by a Tracker from Oceania")); // 6
achievements.push(new Achievement("10 Countries", "Get tracked by 10 different counties")); // 7
achievements.push(new Achievement("20 Countries", "Get tracked by 20 different counties")); // 8
achievements.push(new Achievement("Night of 1000 cookies", "Get tracked by 1000 tracker cookies")); // 9
achievements.push(new Achievement("Stalker", "Get tracked by the same country 10 times")); // 10

//getCategory(CategoryEndpoint + "bbc.com");

chrome.storage.local.set({ achievements: achievements});


chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        /* Directly copy and pasted: */  
        var match = details.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        
        requestURL = match[1];

        //console.log(requestURL);

        if(FilterDomains.includes(requestURL)){
            if(!(detectedHosts.includes(requestURL))){
                detectedHosts.push(requestURL)
                //console.log(detectedHosts);
                //console.log(requestURL + 'Tracker')
                numberOfTrackers += 1;
                //console.log("We have found a tracker: " + requestURL + ' ' + numberOfTrackers);
                var tracker_location_url = endpoint + "/" + requestURL;
                
                // https://bobbyhadz.com/blog/javascript-remove-http-https-from-url#:~:text=To%20remove%20http%3A%2F%2F%20or,http%3A%2F%2F%20part%20is%20removed.
                var cleanedUpInitiator = details.initiator.replace(/^https?:\/\/www./, '');


                //console.log(cleanedUpInitiator);

                //console.log(tracker_location_url);
                getCountry(tracker_location_url, cleanedUpInitiator, requestURL);  
                //getCategory(CategoryEndpoint + cleanedUpInitiator)

                passiveUniqueHosts.push(new Host(requestURL))
                
                //https://stackoverflow.com/questions/18158297/blocking-request-in-chrome
                console.log("Blocking request: " + requestURL)
                return {cancel: true}

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

            // Achievement Code:


        }

    }, {urls: ["<all_urls>"]}, ["blocking"]);





chrome.cookies.onChanged.addListener(function(result) {
    //console.log(result);
    if(result.cause === 'explicit' && result.removed === false){
        //console.log(result);
        //console.log(result.cookie.domain)
        var cleanedDomain = result.cookie.domain.substring(1, result.cookie.domain.length)
        //console.log(cleanedDomain);

        if(FilterDomains.includes(cleanedDomain)){
            //console.log('New Tracker Cookies discovered')
           // console.log(result.cookie.domain)
            totalTrackerCookies++
            //console.log(numberOfTrackers);
            chrome.storage.local.set({ numberOfCookies: totalTrackerCookies});
        }
    }

})

chrome.cookies.getAll({}, function(result) {
    //console.log(result);

    for(var i = 0; i < result.length; i++){
        //if(result[i].)
    }
})


// HelperMethod to determine a website's category

function getCategory(request){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText)
            console.log(response);
            var mostLikelyCategory = '';
            var found = false;
            
            if(response.websiteResponsed != false){
                mostLikelyCategory = response.categories[0].tier1.name
                console.log(mostLikelyCategory)
                if(mostLikelyCategory === "Not enough content"){
                    mostLikelyCategory = "Unknown Category"
                }
                console.log(mostLikelyCategory)
            }

            for(var i = 0; i < categoriesTrackedBy.length; i++){
                if(categoriesTrackedBy[i].name === mostLikelyCategory){
                    categoriesTrackedBy[i].addCount();
                    found = true;
                }
            }
            if(!(found)){
                categoriesTrackedBy.push(new Category(mostLikelyCategory))
            }
            console.log(categoriesTrackedBy)

            chrome.storage.local.set({ categoryList: categoriesTrackedBy });

        }
    }
    console.log(request);
    xhr.open("GET", request, true);
    xhr.send();

}

// Helper Methods for retrieiving the Countries using the IPAPI API

function getCountry(request, originalSite, originalURL){
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
                            //console.log(detectedCountries);
                            //console.log('ffs')
                        }
                    }
                    //console.log(alreadyTracked)
                   // console.log(originalURL)
                    if(!(alreadyTracked)){
                        detectedCountries[i].site.push(originalSite)

                        if(!(sitesCategorised.includes(originalSite))){
                            getCategory(CategoryEndpoint + originalSite) // Disabling to Save API bandwidth
                            console.log(originalSite);
                            sitesCategorised.push(originalSite)
                        }
                    }
                    
                    //console.log(detectedCountries)
                    found = true;
                }
            }
            if(!found){
                detectedCountries.push(new Country(response.country, originalSite));

                if(!(sitesCategorised.includes(originalSite))){
                    getCategory(CategoryEndpoint + originalSite); // Disabing to save API bandwidth
                    console.log(originalSite);
                    sitesCategorised.push(originalSite)
                }

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

            //console.log(response.country)
            //console.log(EuropeanCountries.includes(response.country))

            if(passiveCountries.length >= 10 && achivements[7].achieved === false){
                achievements[7].achieve();
                achievements[7].achieved = true;
            }
            if(passiveCountries.length >= 20 && achievments[8].achieved === false){
                achievements[8].achieve();
                achievements[8].achieved = true;
            }
            if(response.country === "Russia" && achievements[0].achieved === false){
                achievements[0].achieve();
                achievements[0].achieved = true;
                //console.log("Test Passed - From Russia With Love")
            } 
            if(CountriesInAsia.includes(response.country) && achievements[1].achieved === false){
                achievements[1].achieve();
                achievements[1].achieved = true;
            }else if(AfricanCountries.includes(response.country) && achievements[2].achieved === false){
                achievements[2].achieve()
                achievements[2].achieved = true;
            }else if(EuropeanCountries.includes(response.country) && achievements[3].achieved === false){
                achievements[3].achieve()
                achievements[3].achieved = true;
                //console.log("Test Passed - Europe")
                //console.log(achievements)
                sendNotification(achievements[3])
            }else if(NorthAmerica.includes(response.country) && achievements[4].achieved === false){
                achievements[4].achieve()
                achievements[4].achieved = true;
                sendNotification(achievements[4])
            }else if(SouthAmerica.includes(response.country) && achievements[5].achieved === false){
                achievements[5].achieve()
                achievements[5].achieved = true;
            }else if(Oceania.includes(response.country) && achievements[6].achieved === false){
                achievements[6].achieve()
                achievements[6].achieved = true;
            }

            if(totalTrackerCookies >= 1000 && achivements[9].achieved === false){
                achievements[9].achieve()
                achievements[9].achieved = true;
            }

            if(achievements[10].achieved === false){
                for(var k = 0; k < passiveCountries.length; k++){
                    if(passiveCountries[k].count >= 10){
                        achievements[10].achieve()
                        achievements[10].achieved = true;
                    }
                }
            }
            chrome.storage.local.set({ achievements: achievements});

        }
    }

    xhr.open("GET", request, true);
    xhr.send();
    //console.log("Request sent")
}

function sendNotification(achievement){
    //console.log("test Notification fired")
    chrome.notifications.create('Achievement Completed', {
        type: 'basic',
        iconUrl: './staticimages/SmallLogo.png',
        title: 'TrackerHunt - AchievementCompleted',
        message: 'New Achievement Completed: ' + achievement.name + " - " + achievement.text,
        priority: 2,
        buttons: [
            {
                title: 'Ok'
            }
        ]
    });
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
            
            // Achievements Code:

           
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
        totalTrackerCookies = 0;

        chrome.storage.local.set({ countryList: detectedCountries });
        sendResponse('success');
    }
})

// Notifications for Passive Mode

// https://blog.shahednasser.com/how-to-send-notifications-in-chrome-extensions/

chrome.alarms.create('PASSIVEMODE-ALARM', {
    periodInMinutes: 1
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









