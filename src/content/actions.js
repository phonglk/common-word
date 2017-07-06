import { info } from '../common/log';
import { bindToolbar, removeToolbar } from './mounting';
import { getSync, setSync } from '../common/storage';
import {
  CLASS_PROGRESS_TO_SHOW_TOOLBAR,
  CLASS_UNKNOWN_WORD,
  CLASS_KNOWN_WORD,
  CLASS_WORD,
  PROP_WORD,
} from '../const/style';

async function updateKnownWordStorage({ word }) {
  const knownList = await getSync('knownList');
  const selectedWordList = await getSync('selectedWordList');
  const list = knownList[selectedWordList];
  if (list) {
    if (!list.find(entry => entry.word === word)) {
      const newEntry = { word, date: new Date().getTime(), sentence: '' };
      list.push(newEntry);
      await setSync('knownList', Object.assign({}, knownList, {
        [selectedWordList]: list,
      }));
      info(`add ${word} into knowlist`);
    }
  }
}

export function hideToolbar({ targetNode }) {
  console.log('clear');
  delete targetNode.attributes.isToolbarShow; // eslint-disable-line no-param-reassign
  removeToolbar({ targetNode });
}

export async function hideWord({ word, targetNode }) {
  await updateKnownWordStorage({ word });
  [...document.querySelectorAll(`.${CLASS_WORD}[${PROP_WORD}="${word}"]`)].forEach((node) => {
    node.classList.remove(CLASS_UNKNOWN_WORD);
    node.classList.add(CLASS_KNOWN_WORD);
  });
  hideToolbar({ targetNode });
}

export function actionUpdateKnownWord({ word, targetNode }) {
  hideWord({ word, targetNode });
  info(`known ${word}`);
}

export function showToolbar({ word, targetNode, event, wordListMap }) {
  console.log('show');
  targetNode.attributes.isToolbarShow = true; // eslint-disable-line no-param-reassign
  bindToolbar({ word, targetNode, event, wordListMap }, {
    actionUpdateKnownWord: actionUpdateKnownWord.bind(null, { word, targetNode }),
  });
}

export function showProgressBar({ targetNode }) {
  let progressNode = targetNode.querySelector(`.${CLASS_PROGRESS_TO_SHOW_TOOLBAR}`);
  if (!progressNode) {
    progressNode = document.createElement('div');
    progressNode.classList.add(CLASS_PROGRESS_TO_SHOW_TOOLBAR);
    targetNode.append(progressNode);
  }
}

export function removeProgressBar({ targetNode }) {
  const progressNode = targetNode.querySelector(`.${CLASS_PROGRESS_TO_SHOW_TOOLBAR}`);
  if (progressNode) progressNode.remove();
}
