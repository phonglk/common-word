import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {
  CLASS_KNOWN_WORD,
  CLASS_WORD,
} from '../const/style';
import { updateKnownWord } from '../common/word-storage';

const initState = {
  selfClose: false,
  openDict: false,
};

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = initState;
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.word, this.props.word)) {
      this.setState(initState);
    }
  }

  knownClick = () => {
    const { element, mohandler, word } = this.props;
    element.parentNode.replaceChild(element.childNodes[0].cloneNode(true), element);
    element.removeEventListener('mouseenter', mohandler);
    updateKnownWord({ word });
    this.setState({ selfClose: true });
  }

  dictClick = () => {
    this.setState({ openDict: true });
  }

  render() {
    const { word, position: [left, top], visible } = this.props;
    const { selfClose, openDict } = this.state;
    const style = {
      left,
      top,
    };
    let className = 'cw-popup';
    if (visible === false || selfClose === true) className += ' hidden';
    return (
      <div className={className} style={style}>
        <div><a onClick={this.knownClick}>Mark as Known</a></div>
        { !openDict && <div><a onClick={this.dictClick}>Open dictionary</a></div> }
        { openDict &&
          <div>
            <iframe src={`http://dict.laban.vn/widget/search?type=1&query=${word}`} />
            <div className="lb-credit">
              <img src="http://stc.laban.vn/dictionary/images/plugin/powered.png"/>
            </div>
          </div>
        }
      </div>
    );
  }
}

Popup.propTypes = {
  word: PropTypes.string,
  position: PropTypes.array,
  visible: PropTypes.bool,
  element: PropTypes.node,
  mohandler: PropTypes.func,
};

Popup.defaultProps = {
  visible: true,
  word: '',
  position: [0, 0],
};

export function wordPopup(params) {
  let element = document.querySelector('#cw-popup-mount');
  if (element === null) {
    element = document.createElement('div');
    element.setAttribute('id', 'cw-popup-mount');
    document.body.appendChild(element);
  }
  ReactDOM.render(<Popup {...params} />, element);
}

export default Popup;
