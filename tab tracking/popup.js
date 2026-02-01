console.log("This is a popup!");

const BLACKLIST = ["instagram.com"];
let timeLeft = 3;

document.addEventListener("DOMContentLoaded", () => {
    const timerEl = document.getElementById("timer");
    const list = document.getElementById("tabs");

    // --- Changed this part: use chrome.tabs.query directly instead of storage ---
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

        // Only show popup if there are blacklisted tabs
        if (!hasBadTab) {
            window.close();
            return;
        }

        // Start countdown now that popup is visible
        startCountdown(timerEl);
    });
});

function startCountdown(timerEl) {
    timerEl.textContent = `Slap in ${timeLeft}...`;

    const countdown = setInterval(() => {
        timeLeft--;

        if (timeLeft > 0) {
            timerEl.textContent = `Slap in ${timeLeft}...`;
        } else {
            clearInterval(countdown);
            timerEl.textContent = "Get Slapped!";
            timerEl.style.color = "red";
            // small delay so user sees the message
            setTimeout(() => window.close(), 500);
        }
    }, 1000);
}
