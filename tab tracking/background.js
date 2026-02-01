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

                // Add badge countdown for blacklisted tab
                let timeLeft = 3;
                chrome.action.setBadgeBackgroundColor({ color: '#0000FF' }); // blue badge
                chrome.action.setBadgeText({ text: String(timeLeft) });

                const countdown = setInterval(() => {
                    timeLeft--;
                    if (timeLeft > 0) {
                        chrome.action.setBadgeText({ text: String(timeLeft) });
                    } else {
                        chrome.action.setBadgeText({ text: '💥' }); // final "Get Slapped!"
                        clearInterval(countdown);
                        setTimeout(() => chrome.action.setBadgeText({ text: '' }), 1000); // clear badge
                    }
                }, 1000);

                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon-16.png",
                    title: "Bad Tab!",
                    message: `Tab open: ${tab.title}\n${tab.url}`
                });
            }
        });

        // Saves the current tabs
        chrome.storage.local.set({ openTabs });
    });
}
