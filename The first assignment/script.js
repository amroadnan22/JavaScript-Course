let count = 0;
const countEl = document.getElementById("count");
const entriesEl = document.getElementById("entries");

let entries = [];

document.getElementById("increment-btn").addEventListener("click", () => {
    
  count ++;
  countEl.textContent = count;
});

document.getElementById("save-btn").addEventListener("click", () => {

    entries.push(count);

    entriesEl.textContent = entries.join(" - ");

    count = 0;
    countEl.textContent = count;
});
