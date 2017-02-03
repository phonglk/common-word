function sendMessage(msg, callback) {
  chrome.extension.sendMessage(msg, callback);
}

function sendMessageToTab(tabId, msg) {
  chrome.tabs.sendMessage(tabId, msg);
}

function addMessageListener(listener/* fn(msg, sender, sendResponse) */) {
  chrome.runtime.onMessage.addListener(listener);
}

export {
  sendMessage,
  sendMessageToTab,
  addMessageListener,
};
