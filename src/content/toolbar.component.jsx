import React from 'react';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.clickKnown = this.clickKnown.bind(this);
  }
  clickKnown() {
    console.log(this.props);
    this.props.actions.actionUpdateKnownWord(this.props.word);
  }
  render() {
    // const clickKnown = this.clickKnown.bind(this);
    return (
      <div>
        {this.props.meta ? `[${this.props.meta.rank}]` : ''}
        <span btn onClick={this.clickKnown}>Known</span>
        <span btn disabled title="The feature is not available yet">Definition</span>
        <span btn disabled title="The feature is not available yet">Collocation</span>
      </div>
    );
  }
}
