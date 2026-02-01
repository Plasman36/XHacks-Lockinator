

const BLACKLIST = ["https://www.instagram.com/"];

// Tracks open tabs and already flagged tabs
let openTabs = {};
let alertTabs = new Set();

// Checks if a tab is on blacklist
function isBlack(url) {
    return BLACKLIST.some(domain => url.includes(domain));
}

// Updates the list of open tabs and sends alerts
function update() {
    chrome.tabs.query({}, (tabs) => {
        openTabs = {}; // resets list
        tabs.forEach(tab => {
            openTabs[tab.id] = { title: tab.title, url: tab.url };

            // Alerts once per tab 
            if (isBlack(tab.url) && !alertTabs.has(tab.id)) {
                alertTabs.add(tab.id);
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Bad Tab!",
                    message: `Tab open: ${tab.title}\n${tab.url}`
                });
            }
        });

        // Saves the current tabs
        chrome.storage.local.set({openTabs});
    });
}

// Monitors the tabs constantly
chrome.tabs.onCreated.addListener(update);
chrome.tabs.onUpdated.addListener(update);
chrome.tabs.onRemoved.addListener(update);

// Initial Check
update();