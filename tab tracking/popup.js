console.log("This is a popup!");

const BLACKLIST = ["instagram.com"];

document.addEventListener("DOMContentLoaded", () => {
    const timerEl = document.getElementById("timer");
    const list = document.getElementById("tabs");

    // Ensure the element exists
    if (!timerEl || !list) {
        console.error("Timer or tabs element not found!");
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
            // tiny delay to avoid closing before render
            setTimeout(() => window.close(), 100);
            return;
        }

        // Start countdown
        let timeLeft = 3;
        timerEl.textContent = `Slap in ${timeLeft}...`;
        timerEl.style.display = "block";
        timerEl.style.fontSize = "24px";
        timerEl.style.fontWeight = "bold";

        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerEl.textContent = `Slap in ${timeLeft}...`;
            } else {
                clearInterval(countdown);
                timerEl.textContent = "Get Slapped!";
                timerEl.style.color = "red";
                setTimeout(() => window.close(), 500);
            }
        }, 1000);
    });
});