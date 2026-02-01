console.log("This is a popup!")

const BLACKLIST = ["instagram.com"];
let timeLeft = 3;

const timerEl = document.getElementById("timer");
const list = document.getElementById("tabs");

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
        return;
    }
    startCountdown();
});

function startCountdown() {
    timerEl.textContent = `Slap in ${timeLeft}...`;
    const countdown = setInterval(() => {
        timeLeft--;

        if (timeLeft > 0) {
            timerEl.textContent = `Slap in ${timeLeft}...`;
        } else {
            clearInterval(countdown);
            timerEl.textContent = "Get Slapped";
            window.close();
        }
    }, 1000);
}