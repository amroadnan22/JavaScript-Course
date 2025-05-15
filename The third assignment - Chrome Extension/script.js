const input = document.getElementById("input-link");
const saveInputBtn = document.getElementById("save-input");
const saveTabBtn = document.getElementById("save-tab");
const deleteAllBtn = document.getElementById("delete-all");
const linksList = document.getElementById("links-list");

function renderLinks(links) {
  linksList.innerHTML = "";
  links.forEach(link => {
    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.textContent = link;
    linksList.appendChild(a);
  });
}

function loadLinks() {
  chrome.storage.local.get(["savedLinks"], (result) => {
    renderLinks(result.savedLinks || []);
  });
}

saveInputBtn.addEventListener("click", () => {
  const link = input.value.trim();
  if (link) {
    chrome.storage.local.get(["savedLinks"], (result) => {
      const updated = (result.savedLinks || []);
      updated.push(link);
      chrome.storage.local.set({ savedLinks: updated }, loadLinks);
    });
    input.value = "";
  }
});

saveTabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.storage.local.get(["savedLinks"], (result) => {
      const updated = (result.savedLinks || []);
      updated.push(tab.url);
      chrome.storage.local.set({ savedLinks: updated }, loadLinks);
    });
  });
});

deleteAllBtn.addEventListener("click", () => {
  chrome.storage.local.set({ savedLinks: [] }, loadLinks);
});

document.addEventListener("DOMContentLoaded", loadLinks);
