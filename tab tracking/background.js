const BLACKLIST = ["instagram.com", "krunker.io"];

let isTortureOn = false;   // tracks current state (on Arduino)
let alertTabs = new Set();

// Utility: check if URL is blacklisted
function isBlack(url) {
    if (!url) return false;
    try {
        const { hostname } = new URL(url);
        return BLACKLIST.some(domain => hostname.includes(domain));
    } catch {
        return false;
    }
}

function sendToPython(value) {
    fetch("http://127.0.0.1:5000/set", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ value })
    }).catch(err => console.error("Fetch error:", err));
}

function update() {
    chrome.tabs.query({}, (tabs) => {

        // Determine if ANY blacklisted tab exists
        const isAnyBlacklisted = tabs.some(tab => isBlack(tab.url));

        // CASE 1: A blacklisted tab appears and torture is OFF → turn ON ONCE
        if (isAnyBlacklisted && !isTortureOn) {
            console.log("Detected blacklisted tab → SENDING torture_on");
            isTortureOn = true;
            sendToPython("torture_on");
        }

        // CASE 2: No blacklisted tabs exist and torture is ON → turn OFF ONCE
        if (!isAnyBlacklisted && isTortureOn) {
            console.log("No blacklisted tabs → SENDING torture_off");
            isTortureOn = false;
            sendToPython("torture_off");
        }
    });
}

// Monitor changes
chrome.tabs.onUpdated.addListener(update);
chrome.tabs.onCreated.addListener(update);
chrome.tabs.onRemoved.addListener(update);

// Initial check
update();