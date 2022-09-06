// The code for achievements in this instance was inspired and adapted from: D. Bandel, ‘Implementing Achievement System in Javascript - Game Development Stack Exchange’. https://gamedev.stackexchange.com/questions/139136/implementing-achievement-system-in-javascript (accessed Jul 20, 2022).
// This part of the program defines an Achievement class, and creates some achievements to be complete in passive mode.

var achievements = [];
 
class Achievement {
    constructor(name, text){
        this.name = name;
        this.achieved = "Not Unlocked";
        this.text = text;
    }
    achieve(){
        this.achieved="Unlocked";
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
    }
}
// Adding the achievements to the array
achievements.push(new Achievement("From Russia with Love", "Get tracked by a Russian Tracker")); // 0
achievements.push(new Achievement("The Silk Road", "Get tracked by a Asian Tracker")); // 1
achievements.push(new Achievement("From Casablanca to Cape Town", "Get tracked by an African Tracker")); // 2
achievements.push(new Achievement("From Paris to Berlin", "Get tracked by a European Tracker")); // 3
achievements.push(new Achievement("Route 66", "Get tracked by a North American Tracker")); // 4
achievements.push(new Achievement("South America", "Get tracked by a South American Tracker")); // 5
achievements.push(new Achievement("Down Under", "Get tracked by a Tracker from Oceania")); // 6
achievements.push(new Achievement("10 Countries", "Get tracked by 10 different counties")); // 7
achievements.push(new Achievement("20 Countries", "Get tracked by 20 different counties")); // 8
achievements.push(new Achievement("Night of 1000 cookies", "Get tracked by 1000 tracker cookies")); // 9
achievements.push(new Achievement("Stalker", "Get tracked by the same country 10 times")); // 10

// Finally, saving these in local chrome storage to be retrieved by the front end. 
chrome.storage.local.set({ achievements: achievements});