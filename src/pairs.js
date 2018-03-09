import React from "react";

export default class Pairs extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  handleChange(event) {
    this.props.setPair(event.target.value);
  }

  render() {
    let pairOptions = this.props.pairs.map((pair, index) => {
      const text = pair.baseToken.symbol + "/" + pair.quoteToken.symbol;
      return (
        <option value={index} key={index}>
          {" "}
          {text}{" "}
        </option>
      );
    });

    return (
      <div>
        <h2> Select Trading Pair </h2>
        <select value={this.state.value} onChange={this.handleChange}>
          {pairOptions}
        </select>
      </div>
    );
  }
}
