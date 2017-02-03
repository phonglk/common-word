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
        <span onClick={this.clickKnown}>Known</span>
        <span disabled title="The feature is not available yet">Definition</span>
        <span disabled title="The feature is not available yet">Collocation</span>
      </div>
    );
  }
}
