import ReactDOM from 'react-dom';
import React from 'react';
import Toolbar from './toolbar.component';
import {
  CLASS_TOOLBAR_MOUNT_DIV,
} from '../const/class-name';



export function bindToolbar({ word, targetNode, event }, actions) {
  const mountNode = document.createElement('div');
  mountNode.classList.add(CLASS_TOOLBAR_MOUNT_DIV);
  targetNode.appendChild(mountNode);
  ReactDOM.render(<Toolbar word={word} node={targetNode} actions={actions} />, mountNode);
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
