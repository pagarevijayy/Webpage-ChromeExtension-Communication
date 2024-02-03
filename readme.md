# Webpage and Chrome Extension Messaging (communication)

_Code for chrome extension and webpage are in their respective folder._

**Sending messgage from webpage to chrome extension:**
```
  // webpage
  chrome?.runtime?.sendMessage(extensionId, message);

  // extension
  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    console.log(message);
  });

  // extension manifest file - important!!!
  "externally_connectable": {
    "matches": ["http://127.0.0.1:5500/*"] 
  }

```

**Sending messgage from chrome extension to webpage:**

Two step process:
1. Send message from extension to content script
2. Send message from content script to its own window and catch inside webpage
```
  // extension
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const message = "Hello from the popup!";
  chrome.tabs.sendMessage(tab.id, message);

  // content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log('message', message, sender)  
      // send message from content script to webpage
      if (sender.id == extensionId) {
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", message }, window);
      }
  });

  // webpage
  window.addEventListener("message", (event) => {
    // accept message from our content script
    if (event.source === window && event.data && event.data.type === "FROM_CONTENT_SCRIPT") {
      console.log(event.data);
    }
  });



```


Special consideration: 

_Take care of security. Limit origins, restrict messages based on sender, receiver, content type, events. Use encryption if needed._