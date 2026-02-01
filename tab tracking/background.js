const BLACKLIST = ["instagram.com", "krunker.io"];

// Tracks open tabs and already flagged tabs
let openTabs = {};
let alertTabs = new Set();

// Checks if a tab is on blacklist, for all versions of tab
function isBlack(url) {
    if (!url) return false;
    try {
        const { hostname } = new URL(url);
        return BLACKLIST.some(domain => hostname.includes(domain));
    } catch {
        return false;
    }
}

// Updates the list of open tabs and sends alerts
function update() {
    chrome.tabs.query({}, (tabs) => {
        openTabs = {}; // resets list to empty
        tabs.forEach(tab => {
            if(!tab.url) return;
            openTabs[tab.id] = { 
                title: tab.title, // adds tabs to list
                url: tab.url 
            };

            const key = `${tab.id}:${tab.url}`;

            // Alerts once per tab if on the blacklist
            if (isBlack(tab.url) && !alertTabs.has(key)) {
                alertTabs.add(key);

                chrome.storage.local.set({ badTab: true }); // boolean for trigger
                chrome.storage.local.get("badTab", (data) => {
                if (data.badTab) {
                // do smth
                }
            });

                // Notification
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon-16.png",
                    title: "Bad Tab!",
                    message: `Tab open: ${tab.title}\n${tab.url}`
                });
            }
            chrome.storage.local.set({ badTabTriggered: false }); // resets trigger to false to turn off signal
        });

        // Saves the current tabs
        chrome.storage.local.set({ openTabs }); // ensure popup reads the latest
    });
}

// Monitors the tabs constantly
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url || changeInfo.status === "complete") {
        update();
    }
});

chrome.tabs.onCreated.addListener(update);
chrome.tabs.onRemoved.addListener(update);

// Initial Check
update();
