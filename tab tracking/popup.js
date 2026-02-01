console.log("This is a popup!")

chrome.storage.local.get("openTabs", (data) => {
    const tabs = data.openTabs || {};
    const list = document.getElementById("tabs");

    for (const id in tabs) {
        const li = document.createElement("li");
        li.textContent = `${tabs[id].title} (${tabs[id].url})`;
        list.appendChild(li);
    }
});