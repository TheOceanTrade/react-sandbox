import React from "react";

export default class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    let ticker = await this.props.ocean.marketData.ticker({
      baseTokenAddress: this.props.pair.baseToken.address,
      quoteTokenAddress: this.props.pair.quoteToken.address
    });
    this.setState({
      loading: false,
      ticker
    });
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
