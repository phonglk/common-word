import Parser from 'yamljs/lib/Parser';
import preliminaryCheck from './preliminary-check';
import { getSync, getLocal, setLocal } from '../common/storage';
import request from '../common/request';
import { info } from '../common/log';
import {
  sendMessageToTab,
  addMessageListener,
  INIT_IN_PAGE_CONNECTION,
} from '../common/communication';
import {
  EVENT_BROWSER_ACTION_CLICK,
} from '../const/event';

const yamlParser = new Parser();

async function getSelectedWordList() {
  const selectedListId = await getSync('selectedWordList');
  const cachedWordList = await getLocal('currentWordList');
  if (cachedWordList && cachedWordList.id === selectedListId) {
    info(`wordList ${cachedWordList.id} is cached`);
    return cachedWordList;
  }
  const newCachedWordList = {
    list: [],
    id: selectedListId,
  };
  const wordListArray = await getSync('wordLists');
  const selectedList = wordListArray.find(list => list.id === selectedListId);
  info(`request wordList from ${selectedList.yaml}`);
  const response = await request(selectedList.yaml, { responseAs: 'text' });
  const list = yamlParser.parse(response);
  newCachedWordList.list = list;
  await setLocal('currentWordList', newCachedWordList);
  info(`wordList ${selectedListId} is newly cached`);
  return newCachedWordList;
}

function bindBrowserAction({ wordList }) {
  chrome.browserAction.onClicked.addListener((tab) => {
    sendMessageToTab(tab.id, {
      event: EVENT_BROWSER_ACTION_CLICK,
      wordList,
    });
  });
}

function accommodateInPageConnection() {
  const inPageConnection = {};

  const getSenderId = sender => `${sender.tab.id}${sender.tab.windowId}`;
  const getConnectionById = (id) => {
    if (inPageConnection[id]) return inPageConnection[id];
    const conn = {
      connected: false,
      waitingReponses: [],
    };
    inPageConnection[id] = conn;
    return conn;
  };

  addMessageListener((payload, sender, sendResponse) => {
    if (payload.type === INIT_IN_PAGE_CONNECTION) {
      const id = getSenderId(sender);
      const cnn = getConnectionById(id);
      if (payload.isTop) {
        cnn.connected = true;
        sendResponse(true);
      } else {
        if (cnn.connected) {
          sendResponse(true);
        } else {
          // HERE
        }
      }
      return true;
    }
  });
}

async function main() {
  await preliminaryCheck();
  const wordList = await getSelectedWordList();
  bindBrowserAction({ wordList });
  accommodateInPageConnection();
}


main();
