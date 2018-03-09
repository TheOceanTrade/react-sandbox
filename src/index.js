import React from "react";
import { render } from "react-dom";
import Trade from "./trade";
import Pairs from "./pairs";
import Ticker from "./ticker";
import createOcean from "the-ocean-x/web"; // notice we are using '/web' here in react

const styles = {
  fontFamily: "sans-serif"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setPair = this.setPair.bind(this);
    this.api = {
      // key: "",
      // secret: "",
      baseURL: `https://kovan.theoceanx.com/api/v0`
    };
    this.state = {};
  }

  async componentWillMount() {
    if (window.web3) {
      this.web3Provider = window.web3.currentProvider;
      this.ocean = await createOcean({
        api: this.api,
        web3Provider: this.web3Provider
      });
      window.web3.version.getNetwork((err, netId) => {
        this.setState({
          networkId: netId,
          networkLoaded: true
        });
      });
    } else {
      this.setState({ missingWeb3: true });
    }
    let pairs = await this.ocean.marketData.tokenPairs();
    this.setState({ loading: false, pairs });
    this.setPair(0);
  }

  setPair(index) {
    this.setState({
      pair: this.state.pairs[index],
      pairLoaded: true
    });
  }

  render() {
    console.log(this.state);
    if (!this.state.networkLoaded || !this.state.pairLoaded) {
      return (
        <div>
          <h1> Loading The Ocean X Sandbox ...</h1>
          <p> If this takes more than a few seconds, try restarting chrome</p>
        </div>
      );
    } else if (this.state.missingWeb3) {
      return (
        <div>
          <h1> No web3 provider detected. </h1>
          <p>
            {" "}
            You probably need to install or activate{" "}
            <a href="https://metamask.io/">metamask</a>
          </p>
        </div>
      );
    } else if (this.state.networkId !== "42") {
      return (
        <div>
          <h1> Wrong ehtereum network ID detected </h1>
          <p>
            The Ocean X currently only provides support for Kovan. Please set
            your metamask to Kovan.{" "}
          </p>
        </div>
      );
    } else {
      return (
        <div style={styles}>
          <Pairs
            ocean={this.ocean}
            pairs={this.state.pairs}
            setPair={this.setPair}
          />
          <Ticker ocean={this.ocean} pair={this.state.pair} />
          <Trade ocean={this.ocean} api={this.api} pair={this.state.pair} />
        </div>
      );
    }
  }
}

render(<App />, document.getElementById("root"));
