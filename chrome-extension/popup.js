const button = document.getElementById("my_btn");

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  chrome.tabs.sendMessage(tab.id, "Hello from the popup!");

});

// receive message from webpage 
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  let allowedOrigins = ["http://127.0.0.1:5500"];
  if (allowedOrigins.includes(sender.origin)) {
    console.log("Received message from web app:", message, sender);
    document.getElementById('response').innerText = message;
  }
});
