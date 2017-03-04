import findAndReplaceDOMText from 'findandreplacedomtext';
import _ from 'lodash';
// import isUndefined from 'lodash/isUndefined';
import { getKnownList } from '../common/word-storage';
import { info } from '../common/log';
import { addMessageListener } from '../common/communication';
import { isTopWindow, getTopWindow, isZeroIframe } from './window-helper';
import {
  mouseenterHandler,
  mouseleaveHandler,
} from './event-handlers';
import {
  mountSideBar,
} from './mounting';
import {
  EVENT_BROWSER_ACTION_CLICK,
} from '../const/events';
import {
  CLASS_UNKNOWN_WORD,
  CLASS_KNOWN_WORD,
  CLASS_SIDEBAR_WRAP,
  CLASS_WORD,
  PROP_WORD,
} from '../const/class-name';

function nerverHappen() {
  require('./style.less');
}

document.addEventListener('DOMContentLoaded', () => {

});


const knownListMap = {};
const wordListMap = {};
let wordListRegExp = null;
const NON_PROSE_ELEMENTS = ['br', 'hr', 'script', 'noscript', 'style', 'img', 'video', 'audio', 'canvas', 'svg', 'map', 'object', 'input', 'textarea', 'select', 'option', 'optgroup', 'button'];
async function highlight() {
  let count = 0;
  findAndReplaceDOMText(document.body, {
    find: wordListRegExp,
    preset: 'prose',
    replace: (s) => {
      const word = s.text.toLowerCase();
      if (_.isUndefined(wordListMap[word])) return s.text;
      count += 1;
      const replacementNode = document.createElement('span');
      const textNode = document.createTextNode(s.text);
      replacementNode.appendChild(textNode);
      replacementNode.classList.add(CLASS_WORD);
      if (knownListMap[word]) {
        replacementNode.classList.add(CLASS_KNOWN_WORD);
      } else {
        replacementNode.classList.add(CLASS_UNKNOWN_WORD);
      }
      replacementNode.setAttribute(PROP_WORD, word);

      replacementNode.addEventListener('mouseenter', mouseenterHandler.bind(
        { wordListMap }, word, replacementNode));
      replacementNode.addEventListener('mouseleave', mouseleaveHandler.bind(null, word, replacementNode));
      window.top.__cw__addWord({
        ...wordListMap[word],
        isKnown: !_.isUndefined(knownListMap[word]),
      });
      return replacementNode;
    },
    filterElements: (el =>
        NON_PROSE_ELEMENTS.indexOf(el.nodeName.toLowerCase()) === -1 &&
        el.className !== (CLASS_SIDEBAR_WRAP)),
  });
  info(`Matched ${count} words`);
}

async function active({ wordList }) {
  if (isTopWindow()) {
    mountSideBar();
  } else if (isZeroIframe()) {
    info('ignore content due to zero size iframe');
    return;
  } else if (!window.top.__cw__addWord) {
    setTimeout(active.bind(null, { wordList }), 50);
    return;
  }
  info('active', window);
  const { list } = await getKnownList();
  list.forEach((knownWord) => {
    knownListMap[knownWord.word.toLowerCase()] = knownWord;
  });
  if (_.isEmpty(wordListMap)) {
    const words = [];
    wordList.list.forEach((word) => {
      wordListMap[word.word] = word;
      words.push(word.word);
    });
    wordListRegExp = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
  }

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
