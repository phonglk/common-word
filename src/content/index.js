import findAndReplaceDOMText from 'findandreplacedomtext';
// import isUndefined from 'lodash/isUndefined';
import { getSync } from '../common/storage';
import { info } from '../common/log';
import { addMessageListener } from '../common/communication';
import {
  mouseenterHandler,
  mouseleaveHandler,
} from './event-handlers';
import {
  EVENT_BROWSER_ACTION_CLICK,
} from '../const/events';
import {
  CLASS_UNKNOWN_WORD,
  CLASS_KNOWN_WORD,
  CLASS_WORD,
  PROP_WORD,
} from '../const/class-name';


document.addEventListener('DOMContentLoaded', () => {

});


const knownListMap = {};
let wordListMap = null;
let wordListRegExp = null;

async function highlight() {
  let count = 0;
  findAndReplaceDOMText(document.body, {
    find: wordListRegExp,
    replace: (s) => {
      count += 1;
      const replacementNode = document.createElement('span');
      const textNode = document.createTextNode(s.text);
      const word = s.text.toLowerCase();
      replacementNode.appendChild(textNode);
      replacementNode.classList.add(CLASS_WORD);
      if (knownListMap[word]) {
        replacementNode.classList.add(CLASS_KNOWN_WORD);
      } else {
        replacementNode.classList.add(CLASS_UNKNOWN_WORD);
      }
      replacementNode.setAttribute(PROP_WORD, word);

      replacementNode.addEventListener('mouseenter', mouseenterHandler.bind(null, word, replacementNode));
      replacementNode.addEventListener('mouseleave', mouseleaveHandler.bind(null, word, replacementNode));
      return replacementNode;
    },
  });
  info(`Matched ${count} words`);
}

async function active({ wordList }) {
  require('./style.less');
  const allKnownList = await getSync('knownList');
  const knownList = allKnownList[wordList.id];
  if (knownList) {
    knownList.forEach((knownWord) => {
      knownListMap[knownWord.word.toLowerCase()] = knownWord;
    });
  }
  if (wordListMap === null) {
    wordListMap = {};
    const words = [];
    wordList.list.forEach((word) => {
      wordListMap[word.word] = word;
      words.push(word.word);
    });
    wordListRegExp = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
  }
  info('active');

  highlight();
}

function addListener() {
  addMessageListener((msg, sender, sendResponse) => {
    if (msg.event && msg.event === EVENT_BROWSER_ACTION_CLICK) {
      const wordList = msg.wordList;
      active({ wordList });
    }
    sendResponse({});
  });
}

addListener();

info('CW_Content');
