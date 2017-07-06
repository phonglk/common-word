import ReactDOM from 'react-dom';
import React from 'react';
import Toolbar from './toolbar.component';
import SideBar from './sidebar.component';
import {
  CLASS_TOOLBAR_MOUNT_DIV,
} from '../const/style';


export function bindToolbar({ word, targetNode, event, wordListMap }, actions) {
  const mountNode = document.createElement('div');
  mountNode.classList.add(CLASS_TOOLBAR_MOUNT_DIV);
  targetNode.appendChild(mountNode);
  ReactDOM.render(<Toolbar word={word} node={targetNode} actions={actions} meta={wordListMap[word]} />, mountNode);
  return mountNode;
}

export function mountSideBar() {
  window.top.__cw__words = [];
  window.top.__cw__words_count = 0;
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  ReactDOM.render(<SideBar window={window.top} />, mountNode);
  return mountNode;
}

export function removeToolbar({ targetNode }) {
  const mountNode = targetNode.querySelector(`.${CLASS_TOOLBAR_MOUNT_DIV}`);
  if (mountNode) {
    ReactDOM.unmountComponentAtNode(mountNode);
    mountNode.remove();
    return true;
  }
  return false;
}
