// wtf
export async function sendMessage(msg) {
  return new Promise((resolve) => {
    chrome.extension.sendMessage(msg, params => resolve(params));
  });
}

export function sendMessageToTab(tabId, msg) {
  chrome.tabs.sendMessage(tabId, msg);
}

export function addMessageListener(listener/* fn(msg, sender, sendResponse) */) {
  chrome.runtime.onMessage.addListener(listener);
}

export const INIT_IN_PAGE_CONNECTION = 'INIT_IN_PAGE_CONNECTION';