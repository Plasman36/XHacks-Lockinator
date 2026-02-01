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

    // Initialize timer immediately so it’s visible
    let timeLeft = 3;  
    timerEl.textContent = `Slap in ${timeLeft}...`;
    timerEl.style.display = "block";   
    timerEl.style.fontSize = "24px";   
    timerEl.style.fontWeight = "bold";

    // Directly query current tabs
    chrome.tabs.query({}, (tabs) => {
        let hasBadTab = false;

        tabs.forEach(tab => {
            if (tab.url && BLACKLIST.some(domain => tab.url.includes(domain))) {
                hasBadTab = true;

                const li = document.createElement("li");
                li.textContent = `${tab.title} (${tab.url})`;
                list.appendChild(li);
            }
        });

        if (!hasBadTab) {
            window.close();
            return;
        }

        startCountdown(timerEl, timeLeft);
    });
});

function startCountdown(timerEl, timeLeft) {
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
}
