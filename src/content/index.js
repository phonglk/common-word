import findAndReplaceDOMText from 'findandreplacedomtext';
import _ from 'lodash';
import { getKnownList, getWordList } from '../common/word-storage';
import { info } from '../common/log';
import { wordPopup } from './popup.component';
// import { addMessageListener, INIT_IN_PAGE_CONNECTION, sendMessage } from '../common/communication';
// import { isTopWindow, getTopWindow, isZeroIframe } from './window-helper';
import {
  mouseenterHandler,
  mouseleaveHandler,
} from './event-handlers';
// import {
//   mountSideBar,
// } from './mounting';
// import {
//   EVENT_BROWSER_ACTION_CLICK,
// } from '../const/event';
import {
  CLASS_UNKNOWN_WORD,
  CLASS_KNOWN_WORD,
  CLASS_SIDEBAR_WRAP,
  CLASS_WORD,
  PROP_WORD,
} from '../const/style';

import './style.less';

function mouseEnterHandler(word, element, evt) {
  // const { clientX: left, clientY: top } = evt;
  const { left, top, height } = evt.target.getBoundingClientRect();
  const pTop = top + height;
  wordPopup({ word, position: [left, pTop], element, mohandler: this });
}

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
      const handler = mouseEnterHandler.bind(null, word, replacementNode);
      replacementNode.addEventListener('mouseenter', handler);
      // replacementNode.addEventListener('mouseleave', mouseleaveHandler.bind(null, word, replacementNode));
      return replacementNode;
    },
    filterElements: (el =>
        NON_PROSE_ELEMENTS.indexOf(el.nodeName.toLowerCase()) === -1 &&
        el.className !== (CLASS_SIDEBAR_WRAP)),
  });
  info(`Matched ${count} words`);
}

async function active() {
  const { list } = await getKnownList();
  list.forEach((knownWord) => {
    knownListMap[knownWord.word.toLowerCase()] = knownWord;
  });
  if (_.isEmpty(wordListMap)) {
    const words = [];
    const wordList = await getWordList();
    wordList.list.forEach((word) => {
      wordListMap[word.word] = word;
      if (!knownListMap[word.word]) {
        words.push(word.word);
      }
    });
    wordListRegExp = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
  }

  highlight();
  window.addEventListener('scroll', () => {
    wordPopup({ visible: false });
  });
}

function isInjected() {
  const flag = document.querySelector('#cw_injected_flag');
  if (flag === null) {
    const e = document.createElement('div');
    e.setAttribute('id', 'cw_injected_flag');
    document.body.appendChild(e);
    return false;
  }
  return true;
}

info('CW_Content_Inject');

if (!isInjected()) {
  active();
}



