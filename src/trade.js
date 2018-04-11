import React from "react";



/******************************************************************************
* Renders necessary form fields to make trades with on the trading pair
* passed in through props
******************************************************************************/

export default class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderType: "market" };

    this.selectOrderType = this.selectOrderType.bind(this);
    this.selectOrderSide = this.selectOrderSide.bind(this);
    this.selectFeeOption = this.selectFeeOption.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  selectOrderType(event) {
    this.setState({ orderType: event.target.value });
  }

  selectOrderSide(event) {
    this.setState({ side: event.target.value });
  }

  selectFeeOption(event) {
    this.setState({ feeOption: event.target.value });
  }

  handleChange(event) {
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  async submitOrder() {
    let data = {
      baseTokenAddress: this.props.pair.baseToken.address,
      quoteTokenAddress: this.props.pair.quoteToken.address,
      side: this.state.side,
      orderAmount: this.state.orderAmount,
      feeOption: this.state.feeOption
    };
    try {
      let result;
      if (this.state.orderType === "market") {
        result = this.props.ocean.trade.newMarketOrder(data);
      } else if (this.state.orderType === "limit") {
        data.price = this.state.price;
        result = this.props.ocean.trade.newLimitOrder(data);
      }
      result = await result;
      this.setState({ result });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!window.web3.eth.defaultAccount) {
      return (
        <div>
          <h1>No default address detected</h1>
          <p>Try unlocking metamask</p>
        </div>
      );
    } else if (this.props.api.key && this.props.api.secret) {
      return (
        <div>
          <h1> Trade </h1>
          <h3> Order Type </h3>
          <label> Market </label>
          <input
            onClick={this.selectOrderType}
            type="radio"
            name="orderType"
            value="market"
          />
          <label> Limit </label>
          <input
            onClick={this.selectOrderType}
            type="radio"
            name="orderType"
            value="limit"
          />

          <h3> Order Details </h3>
          <h4>Side</h4>
          <label> Buy </label>
          <input
            onClick={this.selectOrderSide}
            type="radio"
            name="orderSide"
            value="buy"
          />
          <label> Sell </label>
          <input
            onClick={this.selectOrderSide}
            type="radio"
            name="orderSide"
            value="sell"
          />
          <br />
          <h4>Fee Denomination</h4>
          <label> ZRX (10% discount)</label>
          <input
            onClick={this.selectFeeOption}
            type="radio"
            name="feeOption"
            value="feeInZrx"
          />
          <label> Native token </label>
          <input
            onClick={this.selectFeeOption}
            type="radio"
            name="feeOption"
            value="feeInNative"
          />
          <br />
          <div>
            <h4>Amount</h4>
            <input
              type="text"
              name="orderAmount"
              onChange={this.handleChange}
            />
            <label>in <a href="https://0xproject.com/docs/0xjs#zeroEx-toBaseUnitAmount" target="_blank">base units</a> </label>
          </div>
          {this.state.orderType === "limit" ? (
            <div>
              <h4>Price</h4>
              <input type="text" name="price" onChange={this.handleChange} />
            </div>
          ) : null}
          <br />
          <button onClick={this.submitOrder}>Submit Order</button>
          {this.state.result ? (
            <div>
              <h2>Last order result </h2>
              <div>
                <pre>{JSON.stringify(this.state.result, null, 2)}</pre>
              </div>;
            </div>
          ) : null}
        </div>
      );
    } else {
      return (
        <div>
          <h1>You need to get api keys to access trading functionality</h1>
          <a href="https://beta.theoceanx.com/">
            Get Your API Keys here
          </a>
          <p>
            {" "}
            Enter your api key and secret in index.js in the constructor of the
            'App' class
          </p>
        </div>
      );
    }
  }
}
