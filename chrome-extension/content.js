//  this script can interact and manipulate the content of the web page mentioned in manifest.json

const extensionId = "dkbcmjemdbjhleojeggihhbcliligfeb";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message', message, sender)

    // send message from content script to webpage
    if (sender.id == extensionId) {
        window.postMessage({ type: "FROM_CONTENT_SCRIPT", message }, window);
    }
});
