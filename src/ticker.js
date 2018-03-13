import React from "react";

/******************************************************************************
* Renders the ticker object for the the currently selected pair.
* Updates state when pair prop is changed.
******************************************************************************/
export default class Ticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillReceiveProps() {
    this.setTicker(this.props.pair)
  }

  async componentWillMount() {
    await this.setTicker(this.props.pair)
    this.setState({
      loading: false
    });
  }

  async setTicker(pair) {
    let ticker = await this.props.ocean.marketData.ticker({
      baseTokenAddress: this.props.pair.baseToken.address,
      quoteTokenAddress: this.props.pair.quoteToken.address
    });
    this.setState({ticker})
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Loading Ticker ....</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Ticker</h1>
          <pre>{JSON.stringify(this.state.ticker, null, 2)}</pre>
        </div>
      );
    }
  }
}
