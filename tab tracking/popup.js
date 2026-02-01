console.log("This is a popup!");

const BLACKLIST = ["instagram.com"];

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("tabs");

    // Ensure the element exists
    if (!list) {
        console.error("Tabs element not found!");
        return;
    }

    chrome.storage.local.get("openTabs", (data) => {
        const tabs = data.openTabs || {};
        let hasBadTab = false;

        for (const id in tabs) {
            const { title, url } = tabs[id];
            if (url && BLACKLIST.some(domain => url.includes(domain))) {
                hasBadTab = true;

                const li = document.createElement("li");
                li.textContent = `${title} (${url})`;
                list.appendChild(li);
            }
        }

        if (!hasBadTab) {
            window.close();
        }
    });
});
