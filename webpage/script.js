const extensionId = "dkbcmjemdbjhleojeggihhbcliligfeb";

const button = document.getElementById("my_btn");
button.addEventListener("click", async () => {
  const message = document.getElementById("messageInput").value;

  // Check if the extension exists using chrome.runtime.isInstalled().
  // send message if the runtime exists.
  chrome?.runtime?.sendMessage(extensionId, message);
})


window.addEventListener("message", (event) => {
  // accept message from our content script
  if (event.source === window && event.data && event.data.type === "FROM_CONTENT_SCRIPT") {
    console.log(event.data);
  }
});
