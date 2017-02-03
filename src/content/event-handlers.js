import {
  removeProgressBar,
  showProgressBar,
  showToolbar,
  hideToolbar,
} from './actions';

import {
  CLASS_UNKNOWN_WORD,
} from '../const/class-name';

import {
  THRESHOLD_TOOLBAR_SHOW,
} from '../const/configuration';

export function mouseenterHandler(word, replacementNode, event) {
  const targetNode = event.target;
  if (targetNode !== replacementNode) return;
  if (!targetNode.classList.contains(CLASS_UNKNOWN_WORD)) return;
  clearTimeout(targetNode.attributes.leaveTO);
  clearTimeout(targetNode.attributes.enterTO);
  if (targetNode.attributes.isToolbarShow !== true) {
    showProgressBar({ targetNode });
  }
  targetNode.attributes.enterTO = setTimeout(showToolbar.bind(null, { word, targetNode, event })
                                                                      , THRESHOLD_TOOLBAR_SHOW);
}

export function mouseleaveHandler(word, targetNode, event) {
  if (!targetNode.classList.contains(CLASS_UNKNOWN_WORD)) return;
  clearTimeout(targetNode.attributes.leaveTO);
  clearTimeout(targetNode.attributes.enterTO);
  removeProgressBar({ targetNode });
  targetNode.attributes.leaveTO = setTimeout(hideToolbar.bind(null, { word, targetNode, event })
                                                                                        , 1000);
}
