import React from 'react';
import { info } from '../common/log';
import { getKnownList } from '../common/word-storage';
import {
  CLASS_SIDEBAR_WRAP,
  CLASS_SIDEBAR_TOOLBAR,
  CLASS_SIDEBAR_WORDLIST,
  CLASS_SIDEBAR_KNOWN_WORD,
} from '../const/class-name';

function sortWordList(list, sortBy, dir = 'desc') {
  if (['rank', 'count'].indexOf(sortBy) === -1) throw new Error(`sortBy ${sortBy} is not supported`);
  const sortFunc = dir === 'desc' ?
              (b, a) => a[sortBy] - b[sortBy] :
              (a, b) => a[sortBy] - b[sortBy];
  return list.slice().sort(sortFunc);
}

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    info('Mount sidebar');
    this.props.window.__cw__addWord = this.addWord.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
    this.state = {
      words: [],
      sort: 'rank',
      sortDir: 'asc',
      hideKnown: true,
    };
    this.tempState = {
      words: [],
      lastUpdate: new Date(),
      updateTO: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState.words, this.state.words) ||
            !_.isEqual(nextState.sort, this.state.sort) ||
            !_.isEqual(nextState.sortBy, this.state.sortBy) ||
            !_.isEqual(nextState.hideKnown, this.state.hideKnown);
  }

  addWord(wordObj) {
    const words = this.tempState.words;
    const entry = words.find(e => e.word === wordObj.word);
    if (!entry) {
      const newObj = { ...wordObj, count: 1 };
      words.push(newObj);
    } else {
      entry.count += 1;
    }
    // throttling
    if (new Date().getTime() - this.tempState.lastUpdate > 800) {
      this.setState({ words });
      this.tempState.lastUpdate = new Date().getTime();
      clearTimeout(this.tempState.updateTO);
    } else {
      this.tempState.updateTO = setTimeout(() => {
        this.setState({ words });
      }, 1000);
    }
  }

  checkboxChange() {
    this.setState({ hideKnown: !this.state.hideKnown });
  }

  render() {
    // const clickKnown = this.clickKnown.bind(this);
    const words = this.state.words;
    const sortedList = sortWordList(words, this.state.sort, this.state.sortDir);
    const filteredList = this.state.hideKnown ? 
                        sortedList.filter(word => !word.isKnown) : sortedList;
    const sortByRank = () => this.setState({ sort: 'rank', sortDir: 'asc' });
    const sortByCount = () => this.setState({ sort: 'count', sortDir: 'desc' });
    info('render');
    return (
      <div className={CLASS_SIDEBAR_WRAP}>
        <div className={CLASS_SIDEBAR_TOOLBAR}>
          Sort &nbsp;
          <a href="#rank" onClick={sortByRank} className={this.state.sort === 'rank' ? 'selected' : true}>Rank</a>
          <a href="#count" onClick={sortByCount} className={this.state.sort === 'count' ? 'selected' : true}>Frequency</a>
          &nbsp;
          <label>
            <input type="checkbox" checked={this.state.hideKnown} onChange={this.checkboxChange} />
            &nbsp;Hide Known 
          </label>
        </div>
        <div className={CLASS_SIDEBAR_WORDLIST}>
          {filteredList.map(w => (<div key={w.rank} className={w.isKnown ? CLASS_SIDEBAR_KNOWN_WORD : ''}>
            {w.word} [{w.rank}] ({w.count})
          </div>))}
        </div>
      </div>
    );
  }
}
