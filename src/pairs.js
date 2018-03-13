import React from "react";


/******************************************************************************
* Simple html option element to choose trading pair.
******************************************************************************/

export default class Pairs extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  handleChange(event) {
    // Inform the main container that the pair was chained
    this.props.setPair(event.target.value);
  }

  render() {
    let pairOptions = this.props.pairs.map((pair, index) => {
      // Construct a standard base/quote string from the symbols
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
