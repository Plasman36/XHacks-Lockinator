console.log("This is a popup!")

let timeLeft = 3;
const timerEl = document.getElementById("timer");

const countdown = setInterval(() => {
    timeLeft--;

    if (timeLeft > 0) {
        timerEl.textContent = `Slap in ${timeLeft}...`;
    }else {
        timerEl.textContent = "Get Slapped";
        clearInterval(countdown);

        window.close();
    }
}, 1000);

chrome.storage.local.get("openTabs", (data) => {
    const tabs = data.openTabs || {};
    const list = document.getElementById("tabs");

    for (const id in tabs) {
        const li = document.createElement("li");
        li.textContent = `${tabs[id].title} (${tabs[id].url})`;
        list.appendChild(li);
    }
});