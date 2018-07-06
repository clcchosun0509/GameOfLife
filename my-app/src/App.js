import React, { Component } from "react";

import Cells from "./Cells";
import "./App.css";

class App extends Component {
  state = {
    rows: "",
    cols: ""
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    return (
      <div className="App">
        <h3>GAME OF LIFE!</h3>
        <div>
          <input
            type="number"
            placeholder="행"
            name="rows"
            value={this.state.rows}
            onChange={this.onChange}
          />
          <input
            type="number"
            placeholder="열"
            name="cols"
            value={this.state.cols}
            onChange={this.onChange}
          />
          <Cells
            rows={this.state.rows}
            cols={this.state.cols}
            start={this.state.start}
          />
        </div>
      </div>
    );
  }
}

export default App;
