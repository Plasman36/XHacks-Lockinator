// Listen for messages from background
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "startTimer") {
        let timeLeft = 3;

        // Create floating div if it doesn't exist
        let timerDiv = document.getElementById("lockinator-timer");
        if (!timerDiv) {
            timerDiv = document.createElement("div");
            timerDiv.id = "lockinator-timer";
            timerDiv.style.position = "fixed";
            timerDiv.style.top = "10px";
            timerDiv.style.right = "10px";
            timerDiv.style.padding = "10px 15px";
            timerDiv.style.background = "rgba(0,0,0,0.8)";
            timerDiv.style.color = "white";
            timerDiv.style.fontSize = "24px";
            timerDiv.style.fontWeight = "bold";
            timerDiv.style.zIndex = "999999";
            timerDiv.style.borderRadius = "8px";
            document.body.appendChild(timerDiv);
        }

        timerDiv.textContent = `Slap in ${timeLeft}...`;
        timerDiv.style.display = "block";

        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                timerDiv.textContent = `Slap in ${timeLeft}...`;
            } else {
                clearInterval(countdown);
                timerDiv.textContent = "Get Slapped!";
                setTimeout(() => timerDiv.remove(), 1000);
            }
        }, 1000);
    }
});
